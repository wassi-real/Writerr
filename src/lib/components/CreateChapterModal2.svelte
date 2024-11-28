<script>
    import Fa from 'svelte-fa';
    import { faPlus } from '@fortawesome/free-solid-svg-icons';
    import { v4 as uuidv4 } from 'uuid';

    export let show = false;
    export let currentBook;

    let chapterTitle = '';

    function createChapter() {
        if (chapterTitle.trim() && currentBook) {
            const newChapter = {
                id: uuidv4(),
                title: chapterTitle.trim(),
                content: ''
            };

            currentBook.chapters = [...currentBook.chapters, newChapter];
            chapterTitle = '';
            show = false;
        }
    }

    function handleKeydown(event) {
        if (event.key === 'Enter') {
            createChapter();
        } else if (event.key === 'Escape') {
            show = false;
        }
    }
</script>

{#if show}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
        class="modal-overlay" 
        on:click={() => show = false}
        on:keydown={handleKeydown}
    >
        <div 
            class="modal" 
            on:click|stopPropagation 
            on:keydown|stopPropagation={handleKeydown}
        >
            <h2>Create New Chapter</h2>
            <!-- svelte-ignore a11y_autofocus -->
            <input 
                type="text" 
                bind:value={chapterTitle}
                placeholder="Enter chapter title"
                on:keydown={handleKeydown}
                autofocus
            />
            <div class="modal-actions">
                <button on:click={() => show = false}>Cancel</button>
                <button on:click={createChapter} disabled={!chapterTitle.trim()}>
                    <Fa icon={faPlus} /> Create Chapter
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
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
        padding: 1.5rem;
        border-radius: 0.5rem;
        width: 90%;
        max-width: 400px;
    }

    input {
        width: 100%;
        padding: 0.75rem;
        background-color: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 0.375rem;
        color: var(--color-text);
        font-size: 1rem;
    }

    h2 {
        margin-bottom: 1.5rem;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
    }

    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 2rem;
    }

    button:first-child {
        background-color: var(--color-border);
        color: var(--color-text);
    }

    button:last-child {
        background-color: var(--color-accent);
        color: white;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>