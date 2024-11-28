<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { books } from '$lib/stores/bookStore';
  import { browser } from '$app/environment';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Editor from '$lib/components/Editor.svelte';

  let currentBook;
  let currentChapter;

  // Fetch books from localStorage if browser environment
  function loadBooks() {
    if (browser) {
      const storedBooks = localStorage.getItem('books');
      if (storedBooks) {
        $books = JSON.parse(storedBooks);
      }
    }
  }

  onMount(() => {
    if (browser) {
      loadBooks();

      // Find the current book based on the URL param
      currentBook = $books.find(b => b.id === $page.params.id);
      
      // Ensure the current chapter is set if available
      if (currentBook?.chapters.length > 0) {
        currentChapter = currentBook.chapters[0];
      }
    }
  });

  $: if (browser && currentBook && !currentBook.chapters.includes(currentChapter)) {
    currentChapter = currentBook.chapters[0];
  }
</script>

{#if currentBook}
  <div class="write-page">
    <Sidebar {currentBook} bind:currentChapter />

    <main class="main-content">
      {#if currentChapter}
        <Editor bind:chapter={currentChapter} />
      {:else}
        <div class="no-chapter">
          <p>No chapters available. Create a new chapter to start writing.</p>
          <button class="btn btn-primary" on:click={() => document.getElementById('createChapterBtn').click()}>
            Create New Chapter
          </button>
        </div>
      {/if}
    </main>
  </div>
{:else}
  <div class="loading">
    <p>Loading book data...</p>
  </div>
{/if}

<style>
  .write-page {
    display: flex;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
    margin-left: 18rem;
  }

  .no-chapter {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: var(--color-text-secondary);
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5rem;
    color: var(--color-text-secondary);
  }
</style>
