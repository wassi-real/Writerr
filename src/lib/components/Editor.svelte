<script>
    import { onMount } from 'svelte';
    import { books } from '$lib/stores/bookStore';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import Fa from 'svelte-fa';
    import { faSave, faUndo, faRedo, faFileExport, faEye, faBold, faItalic, faHeading, faLink, faTrash } from '@fortawesome/free-solid-svg-icons';
    import showdown from 'showdown';
    import JSZip from 'jszip';
    
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
                markdownText = `[${selectedText || 'link text'}](https://softodesign.com)`;
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
            
            goto('/', { 
                replaceState: true,
                noScroll: true
            });
        }
    }
    
    onMount(() => {
        const interval = setInterval(saveContent, 10000);
        return () => clearInterval(interval);
    });
    </script>
    
    <div class="editor-container flex flex-col h-full  text-gray-900 dark:text-gray-100">
        {#if chapter}
            <div class="toolbar flex flex-wrap justify-between p-2 bg-neutral-800 rounded-lg mb-2">
                <div class="toolbar-left flex flex-wrap gap-2">
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
                <div class="toolbar-right flex flex-wrap gap-2">
                    <button class="tool-btn delete-book text-red-500 hover:bg-red-500 hover:text-white" on:click={() => showDeleteConfirmation = true}>
                        <Fa icon={faTrash} />
                        <span class="hidden sm:inline">Delete Book</span>
                    </button>
                    <button class="tool-btn" on:click={saveContent}>
                        <Fa icon={faSave} />
                        <span class="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
                    </button>
                    <button class="tool-btn" on:click={exportToTxt}>
                        <Fa icon={faFileExport} />
                        <span class="hidden sm:inline">Export Chapter</span>
                    </button>
                    <button class="tool-btn" on:click={exportAllChapters}>
                        <Fa icon={faFileExport} />
                        <span class="hidden sm:inline">Export Book</span>
                    </button>
                    <button class="tool-btn" on:click={() => (isPreviewMode = !isPreviewMode)}>
                        <Fa icon={faEye} />
                        <span class="hidden sm:inline">{isPreviewMode ? 'Edit' : 'Preview'}</span>
                    </button>
                </div>
            </div>
    
            {#if showDeleteConfirmation}
                <div class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="modal bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-11/12">
                        <h2 class="text-xl font-bold mb-4">Delete Book</h2>
                        <p class="mb-6">Are you sure you want to delete "{currentBook?.title || 'this book'}"? This action cannot be undone.</p>
                        <div class="flex justify-end gap-4">
                            <button class="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded" on:click={() => showDeleteConfirmation = false}>Cancel</button>
                            <button class="px-4 py-2 bg-red-500 text-white rounded" on:click={deleteBook}>Delete Book</button>
                        </div>
                    </div>
                </div>
            {/if}
    
            {#if isPreviewMode}
                <div class="preview bg-neutral-800 p-4 rounded-lg overflow-y-auto flex-grow">
                    {@html converter.makeHtml(chapter.content)}
                </div>
            {:else}
                <input
                    type="text"
                    bind:value={chapter.title}
                    class="chapter-title text-2xl font-bold bg-transparent border-none outline-none mb-4 w-full mt-2"
                    placeholder="Chapter title..."
                    on:input={handleInput}
                />
    
                <textarea
                    bind:this={editor}
                    bind:value={chapter.content}
                    on:input={handleInput}
                    class="content-editor bg-transparent resize-none outline-none w-full flex-grow text-lg leading-relaxed"
                    placeholder="Start writing in Markdown..."
                ></textarea>
            {/if}
    
            <div class="word-count fixed bottom-4 right-4 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-sm">
                {wordCount} words
            </div>
        {/if}
    </div>
    
    <style>
        .toolbar {
            @apply flex flex-wrap justify-between p-2 bg-neutral-800 rounded-lg mb-2;
        }
    
        .tool-btn {
            @apply flex items-center gap-2 p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200;
        }
    
        .tool-btn span {
            @apply hidden; /* Text hidden by default */
        }
    
        /* Show text on larger toolbars where space is sufficient */
        @media (min-width: 900px) {
            .toolbar-right .tool-btn span {
                @apply inline; /* Show text when toolbar width exceeds 900px */
            }
        }
    
        .tool-btn:disabled {
            @apply opacity-50 cursor-not-allowed;
        }
    
        .toolbar-right {
            @apply flex gap-2; /* Keep items aligned in one row */
        }
    
        /* For mobile devices, make the icons centered and vertically aligned */
        @media (max-width: 640px) {
            .toolbar {
                @apply justify-center; /* Center the items in the toolbar */
            }
    
            .toolbar-right {
                @apply justify-center gap-4; /* Center and add spacing between items */
            }
    
            .tool-btn span {
                @apply hidden; /* Hide text on mobile devices */
            }
    
            /* Optional: You can adjust the button sizes to make them more mobile-friendly */
            .tool-btn {
                @apply p-3; /* Add padding for better touch targets */
            }
        }
    
        .delete-book {
            @apply text-red-500 hover:bg-red-500 hover:text-white;
        }
    
        .content-editor {
            height: calc(100vh - 200px);
        }
    
        @media (max-width: 640px) {
            .content-editor {
                height: calc(100vh - 150px);
            }
        }



    .content-editor::-webkit-scrollbar {
        display: none;
    }
    

        
    </style>
    
    
    