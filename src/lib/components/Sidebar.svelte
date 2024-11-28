<script>
  import Fa from 'svelte-fa';
  import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
  import { browser } from '$app/environment';
  import CreateChapterModal2 from '$lib/components/CreateChapterModal2.svelte';
  import { books } from '$lib/stores/bookStore';


  export let currentBook;
  export let currentChapter;

  let showChapterModal = false;

  function goToHome() {
      if (browser) {
          window.location.href = '/';
      }
  }

  // function deleteChapter(chapterId) {
  //     const confirmed = confirm('Are you sure you want to delete this chapter?');
  //     if (confirmed) {
  //         currentBook.chapters = currentBook.chapters.filter((chapter) => chapter.id !== chapterId);
  //         if (currentChapter?.id === chapterId) {
  //             currentChapter = null;
  //         }
  //     }
  // }
  function deleteChapter(chapterId) {
    const confirmed = confirm('Are you sure you want to delete this chapter?');
    if (confirmed) {
        // Directly update the book's chapters
        currentBook.chapters = currentBook.chapters.filter((chapter) => chapter.id !== chapterId);
        
        // Update the books store to persist the change
        books.updateBook(currentBook.id, (book) => ({
            ...book,
            chapters: currentBook.chapters
        }));

        // Reset current chapter if the deleted chapter was active
        if (currentChapter?.id === chapterId) {
            currentChapter = null;
        }
    }
}
</script>

<aside class="sidebar">
  <div class="header">
      <button class="btn btn-accent" on:click={goToHome}>
          Back To Home
      </button>
      <button 
          class="btn btn-primary" 
          id="createChapterBtn"
          on:click={() => showChapterModal = true}
      >
          <Fa icon={faPlus} /> New Chapter
      </button>
  </div>
  
  <div class="content">
      <h2>{currentBook.title}</h2>
      
      <div class="chapters custom-scrollbar">
          {#if currentBook.chapters.length > 0}
              {#each currentBook.chapters as chapter (chapter.id)}
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <div 
                      class="chapter-item"
                      class:active={currentChapter?.id === chapter.id}
                  >
                      <!-- svelte-ignore a11y_click_events_have_key_events -->
                      <span 
                          class="chapter-title" 
                          on:click={() => currentChapter = chapter}
                      >
                          {chapter.title}
                      </span>
                      <button 
                          class="delete-chapter-btn" 
                          on:click={() => deleteChapter(chapter.id)}
                          aria-label="Delete Chapter"
                      >
                          <Fa icon={faTrash} />
                      </button>
                  </div>
              {/each}
          {:else}
              <p class="no-chapters">No chapters yet</p>
          {/if}
      </div>
  </div>
</aside>

<CreateChapterModal2 
  bind:show={showChapterModal} 
  bind:currentBook 
/>

<style>
  .sidebar {
    width: 18rem;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    background-color: var(--color-bg-secondary);
    border-right: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
  }

  .header {
    padding: 1rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .content {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  h2 {
    font-size: 1.125rem;
    margin-bottom: 1rem;
    flex-shrink: 0;
  }

  .chapters {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    padding-right: 0.5rem;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: var(--color-bg);
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-secondary);
  }

  .chapter-item {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background-color: var(--color-bg);
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    user-select: none;
  }

  .chapter-item:hover {
    background-color: var(--color-border);
    transform: translateX(2px);
  }

  .chapter-item.active {
    background-color: var(--color-border);
  }

  .chapter-title {
    flex-grow: 1;
    cursor: pointer;
  }

  .delete-chapter-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text-secondary);
    padding: 0.25rem;
    margin-left: 0.5rem;
    transition: color 0.2s ease-in-out;
  }

  .delete-chapter-btn:hover {
    color: var(--color-text);
  }

  .no-chapters {
    color: var(--color-text-secondary);
    text-align: center;
    padding: 1rem;
  }
</style>
