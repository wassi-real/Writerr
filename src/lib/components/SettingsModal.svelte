<script>
    import { onMount } from 'svelte';
    import { books } from '$lib/stores/bookStore';
    import JSZip from 'jszip';
    import FileSaver from 'file-saver';

    export let show = false; // Controls modal visibility
    let theme = 'dark'; // Default theme is dark

    onMount(() => {
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        theme = savedTheme;
        applyTheme(theme);
    });

    function applyTheme(selectedTheme) {
        document.documentElement.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    }

    function handleThemeChange() {
        applyTheme(theme);
    }

    async function exportAllData() {
        const zip = new JSZip();
        const allBooks = $books;

        allBooks.forEach(book => {
            const bookFolder = zip.folder(book.title);
            book.chapters.forEach((chapter, index) => {
                bookFolder.file(`Chapter-${index + 1}.txt`, chapter.content || '');
            });
        });

        const content = await zip.generateAsync({ type: 'blob' });
        FileSaver.saveAs(content, 'books.zip');
    }

    function deleteAllData() {
        if (confirm('Are you sure you want to delete all data? This action cannot be undone.')) {
            books.set([]); // Clear all books from store
            localStorage.removeItem('books'); // Remove from storage
        }
    }

    function handleClose() {
        show = false;
    }
</script>

{#if show}
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    class="modal-overlay {show ? 'visible' : ''}"
    on:click={handleClose}>
    <div class="modal" 
    on:click|stopPropagation>
        <h2>Settings</h2>
        <div class="form-group">
            <label for="theme">Theme</label>
            <select id="theme" bind:value={theme} on:change={handleThemeChange}>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
            </select>
        </div>
        <div class="button-group">
            <button class="btn btn-secondary" on:click={exportAllData}>
                Export All Data
            </button>
            <button class="btn btn-danger" on:click={deleteAllData}>
                Delete All Data
            </button>
        </div>
        <button class="close-button" on:click={handleClose}>&times;</button>
    </div>
</div>
{/if}

<style>
    :global(:root) {
        --color-bg-dark: #1a1a1a;
        --color-bg-light: #ffffff;
        --color-text-dark: #ffffff;
        --color-text-light: #1a1a1a;
        --color-bg-secondary-dark: #2c2c2c;
        --color-bg-secondary-light: #f0f0f0;
        --color-text-secondary-dark: #b0b0b0;
        --color-text-secondary-light: #505050;
        --color-border-dark: #444444;
        --color-border-light: #e0e0e0;
    }

    :global([data-theme="dark"]) {
        --color-bg: var(--color-bg-dark);
        --color-text: var(--color-text-dark);
        --color-bg-secondary: var(--color-bg-secondary-dark);
        --color-text-secondary: var(--color-text-secondary-dark);
        --color-border: var(--color-border-dark);
    }

    :global([data-theme="light"]) {
        --color-bg: var(--color-bg-light);
        --color-text: var(--color-text-light);
        --color-bg-secondary: var(--color-bg-secondary-light);
        --color-text-secondary: var(--color-text-secondary-light);
        --color-border: var(--color-border-light);
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .modal-overlay.visible {
        visibility: visible;
        opacity: 1;
    }

    .modal {
        background-color: var(--color-bg-secondary);
        color: var(--color-text);
        border-radius: 0.5rem;
        padding: 2rem;
        width: 90%;
        max-width: 32rem;
        position: relative;
    }

    h2 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--color-text-secondary);
    }

    select {
        width: 100%;
        padding: 0.75rem;
        background-color: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 0.375rem;
        color: var(--color-text);
        font-size: 1rem;
    }

    .button-group {
        display: flex;
        gap: 1rem;
    }

    .close-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: var(--color-text-secondary);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.25rem;
        line-height: 1;
    }

    .close-button:hover {
        color: var(--color-text);
    }

    .btn {
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        font-size: 1rem;
        cursor: pointer;
    }

    .btn-secondary {
        background-color: var(--color-bg);
        color: var(--color-text);
        border: 1px solid var(--color-border);
    }

    .btn-danger {
        background-color: #dc3545;
        color: white;
        border: none;
    }
</style>
