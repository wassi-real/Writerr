<script>
    import { onMount } from 'svelte';
    import { books } from '$lib/stores/bookStore';
    import Fa from 'svelte-fa';
    import { faSave, faUndo, faRedo, faFileExport, faEye, faBold, faItalic, faHeading, faLink, faTrash } from '@fortawesome/free-solid-svg-icons';
    import showdown from 'showdown';
    import JSZip from 'jszip';
    import { goto } from '$app/navigation';


    export let chapter;

    let editor;
    let wordCount = 0;
    let saved = true;
    let history = [];
    let historyIndex = -1;
    let isPreviewMode = false;
    let showDeleteConfirmation = false;
    let currentBook = null;

    const converter = new showdown.Converter();

    $: {
        if (chapter) {
            currentBook = $books.find(book => book.chapters.some(ch => ch.id === chapter.id));
            if (chapter.content) {
                updateWordCount(chapter.content);
            }
        }
    }

    function updateWordCount(text) {
        // Count characters excluding spaces and line breaks
        wordCount = text.replace(/\s/g, '').length;
    }

    function addToHistory(content) {
        if (historyIndex < history.length - 1) {
            history = history.slice(0, historyIndex + 1);
        }
        history = [...history, content];
        historyIndex = history.length - 1;
    }

    function undo() {
        if (historyIndex > 0) {
            historyIndex--;
            chapter.content = history[historyIndex];
            saved = false;
        }
    }

    function redo() {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            chapter.content = history[historyIndex];
            saved = false;
        }
    }

    function handleInput() {
        saved = false;
        addToHistory(chapter.content);
    }

    function saveContent() {
        if (chapter) {
            const updatedBooks = $books.map(book => ({
                ...book,
                chapters: book.chapters.map(ch =>
                    ch.id === chapter.id ? chapter : ch
                )
            }));
            books.set(updatedBooks);
            localStorage.setItem('books', JSON.stringify(updatedBooks));
            saved = true;
        }
    }

    function exportToTxt() {
        const blob = new Blob([chapter.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${chapter.title || 'untitled'}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    async function exportAllChapters() {
        const zip = new JSZip();

        $books.forEach(book => {
            const folder = zip.folder(book.title || 'Untitled Book');
            book.chapters.forEach(ch => {
                const content = ch.content || '';
                folder.file(`${ch.title || 'untitled'}.txt`, content);
            });
        });

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'All_Chapters.zip';
        a.click();
        URL.revokeObjectURL(url);
    }

    function insertMarkdown(type) {
        if (!editor) return;

        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const selectedText = chapter.content.substring(start, end);

        let markdownText = selectedText;
        switch(type) {
            case 'bold':
                markdownText = `**${selectedText || 'bold text'}**`;
                break;
            case 'italic':
                markdownText = `*${selectedText || 'italic text'}*`;
                break;
            case 'heading':
                markdownText = `# ${selectedText || 'Heading'}`;
                break;
            case 'link':
                markdownText = `[${selectedText || 'link text'}](https://example.com)`;
                break;
        }

        chapter.content = chapter.content.substring(0, start) + markdownText + chapter.content.substring(end);
        
        setTimeout(() => {
            editor.selectionStart = start;
            editor.selectionEnd = start + markdownText.length;
            editor.focus();
        }, 0);

        saved = false;
        addToHistory(chapter.content);
    }

    function deleteBook() {
        if (currentBook) {
            const updatedBooks = $books.filter(book => book !== currentBook);
            books.set(updatedBooks);
            localStorage.setItem('books', JSON.stringify(updatedBooks));
            
            // Smooth navigation to homepage after deletion
            goto('/', { 
                replaceState: true,  // Replace current history state
                noScroll: true       // Prevent scrolling to top
            });
        }
    }


    // Auto-save every 10 seconds
    onMount(() => {
        const interval = setInterval(saveContent, 10000);
        return () => clearInterval(interval);
    });
</script>

<div class="editor-container">
    {#if chapter}
        <div class="toolbar">
            <div class="toolbar-left">
                <button class="tool-btn" on:click={undo} disabled={historyIndex <= 0}>
                    <Fa icon={faUndo} />
                </button>
                <button class="tool-btn" on:click={redo} disabled={historyIndex >= history.length - 1}>
                    <Fa icon={faRedo} />
                </button>
                <button class="tool-btn" on:click={() => insertMarkdown('bold')}>
                    <Fa icon={faBold} />
                </button>
                <button class="tool-btn" on:click={() => insertMarkdown('italic')}>
                    <Fa icon={faItalic} />
                </button>
                <button class="tool-btn" on:click={() => insertMarkdown('heading')}>
                    <Fa icon={faHeading} />
                </button>
                <button class="tool-btn" on:click={() => insertMarkdown('link')}>
                    <Fa icon={faLink} />
                </button>
            </div>
            <div class="toolbar-right">
                <button class="tool-btn delete-book" on:click={() => showDeleteConfirmation = true}>
                    <Fa icon={faTrash} />
                    Delete Book
                </button>
                <button class="tool-btn" on:click={saveContent}>
                    <Fa icon={faSave} />
                    {saved ? 'Saved' : 'Save'}
                </button>
                <button class="tool-btn" on:click={exportToTxt}>
                    <Fa icon={faFileExport} />
                    Export Chapter
                </button>
                <button class="tool-btn" on:click={exportAllChapters}>
                    <Fa icon={faFileExport} />
                    Export Book
                </button>
                <button class="tool-btn" on:click={() => (isPreviewMode = !isPreviewMode)}>
                    <Fa icon={faEye} />
                    {isPreviewMode ? 'Edit' : 'Preview'}
                </button>
            </div>
        </div>

        {#if showDeleteConfirmation}
            <div class="modal-overlay">
                <div class="modal">
                    <h2>Delete Book</h2>
                    <p>Are you sure you want to delete "{currentBook?.title || 'this book'}"? This action cannot be undone.</p>
                    <div class="modal-actions">
                        <button on:click={() => showDeleteConfirmation = false}>Cancel</button>
                        <button on:click={deleteBook} class="delete-confirm">Delete Book</button>
                    </div>
                </div>
            </div>
        {/if}

        {#if isPreviewMode}
            <div class="preview">
                {@html converter.makeHtml(chapter.content)}
            </div>
        {:else}
            <input
                type="text"
                bind:value={chapter.title}
                class="chapter-title"
                placeholder="Chapter title..."
                on:input={handleInput}
            />

            <textarea
                bind:this={editor}
                bind:value={chapter.content}
                on:input={handleInput}
                class="content-editor"
                placeholder="Start writing in Markdown..."
            ></textarea>

            <div class="word-count">
                {wordCount} words
            </div>
        {/if}
    {/if}
</div>

<style>
    .editor-container {
        max-width: 50rem;
        margin: 0 auto;
        padding: 1.25rem;
        height: 100vh;
        overflow-y: auto;
        position: relative;
    }

    .toolbar {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        background-color: var(--color-bg-secondary);
        border-radius: 0.375rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }

    .toolbar-left,
    .toolbar-right {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .tool-btn {
        padding: 0.5rem;
        background: none;
        border: none;
        color: #999999;
        cursor: pointer;
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .tool-btn:hover {
        background-color: #333333;
        color: white;
    }

    .tool-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .delete-book {
        color: #ff4136 !important;
    }

    .delete-book:hover {
        background-color: #ff4136 !important;
        color: white !important;
    }

    .chapter-title {
        width: 100%;
        font-size: 2rem;
        font-weight: bold;
        background: transparent;
        color: var(--color-text);
        border: none;
        outline: none;
        margin-bottom: 1.25rem;
    }

    .content-editor {
        width: 100%;
        height: calc(100vh - 250px);
        background: transparent;
        color: var(--color-text);
        font-size: 1.125rem;
        line-height: 1.6;
        resize: none;
        outline: none;
        border: none;
        overflow-y: auto;
        margin-bottom: 20px;
        padding-bottom: 20px;
    }

    .content-editor::-webkit-scrollbar,
    .editor-container::-webkit-scrollbar {
        display: none;
    }

    .word-count {
        position: fixed;
        bottom: 1.25rem;
        right: 1.25rem;
        background-color: var(--color-bg-secondary);
        color: var(--color-text-secondary);
        padding: 0.5rem 0.75rem;
        border-radius: 0.375rem;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal {
        background: var(--color-bg-secondary);
        padding: 2rem;
        border-radius: 0.5rem;
        max-width: 500px;
        width: 90%;
        text-align: center;
    }

    .modal h2 {
        margin-bottom: 1rem;
    }

    .modal-actions {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
    }

    .modal-actions button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
    }

    .modal-actions button:first-child {
        background-color: #666;
        color: white;
    }

    .delete-confirm {
        background-color: #ff4136;
        color: white;
    }

    .preview {
        margin-top: 1rem;
        background-color: var(--color-bg-secondary);
        padding: 1rem;
        border-radius: 0.375rem;
        color: var(--color-text);
        line-height: 1.6;
        max-height: 80vh;
        overflow-y: auto;
    }
</style>

