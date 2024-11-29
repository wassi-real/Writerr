<script>
  import { onMount } from 'svelte';
  import Fa from 'svelte-fa';
  import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons'; // Add faCog for settings
  import BookCard from '$lib/components/BookCard.svelte';
  import CreateBookModal from '$lib/components/CreateBookModal.svelte';
  import CreateChapterModal from '$lib/components/CreateChapterModal.svelte';
  import SettingsModal from '$lib/components/SettingsModal.svelte'; // Import new SettingsModal
  import { books } from '$lib/stores/bookStore';

  let showBookModal = false;
  let showChapterModal = false;
  let showSettingsModal = false; // State for settings modal

  onMount(() => {
    const storedBooks = localStorage.getItem('books');
    if (!storedBooks) {
      localStorage.setItem('books', JSON.stringify([]));
    } else {
      $books = JSON.parse(storedBooks);
    }
  });
</script>

<div class="dashboard">
  <header>
    <div class="header-left">
      <div class="avatar">
        <span>SW</span>
      </div>
      <h1>Writerr (Beta Version)</h1>
    </div>
    <div class="button-group">
      <button class="btn btn-secondary" on:click={() => showChapterModal = true}>
        Create New Chapter
      </button>
      <button class="btn btn-primary" on:click={() => showBookModal = true}>
        Create New Book
      </button>
      <button class="btn btn-icon" on:click={() => showSettingsModal = true}>
        <Fa icon={faCog} />
      </button>
    </div>
  </header>

  <main>
    {#if $books.length === 0}
      <p class="no-books-message">No books created yet. Start by creating a new book!</p>
    {/if}

    {#each $books as book}
      <BookCard {book} />
    {/each}
  </main>
</div>

<CreateBookModal bind:show={showBookModal} />
<CreateChapterModal bind:show={showChapterModal} />
<SettingsModal bind:show={showSettingsModal} />


<style>
  .no-books-message {
    text-align: center;
    font-size: 1.125rem;
    color: var(--color-text-secondary);
    margin-top: 2rem;
  }
  
  .dashboard {
    min-height: 100vh;
  }

  header {
    padding: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-border);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .avatar {
    width: 2.5rem;
    height: 2.5rem;
    background-color: var(--color-bg-secondary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar span {
    font-size: 0.875rem;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  .button-group {
    display: flex;
    gap: 0.75rem;
  }

  .btn-icon {
    background: none;
    border: none;
    color: var(--color-text);
    cursor: pointer;
    font-size: 1.25rem;
    padding: 0.5rem;
  }

  .btn-icon:hover {
    color: var(--color-primary);
  }

  main {
    max-width: 64rem;
    margin: 0 auto;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
</style>
