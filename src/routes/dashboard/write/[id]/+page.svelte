<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { books } from '$lib/stores/bookStore';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import MobileSidebarToggle from '$lib/components/MobileSidebarToggle.svelte';
  import Editor from '$lib/components/Editor.svelte';

  let currentBook;
  let currentChapter;
  let username;
  let isSidebarOpen = false;

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

      currentBook = $books.find(b => b.id === $page.params.id);
      
      if (currentBook?.chapters.length > 0) {
        currentChapter = currentBook.chapters[0];
      }

      const savedUser = JSON.parse(localStorage.getItem('user'));
      if (!savedUser) {
        goto('/login');
      } else {
        username = savedUser.username;
      }
    }
  });

  $: if (browser && currentBook && !currentBook.chapters.includes(currentChapter)) {
    currentChapter = currentBook.chapters[0];
  }

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }
</script>

<svelte:head>
  <title>{currentBook ? currentBook.title : 'Loading...'} - Edit</title>
  <meta name="description" content="The official Editor of Writerr" />
</svelte:head>

<div class="write-page flex h-screen">
  {#if currentBook}
    <Sidebar
      bind:currentBook
      bind:currentChapter
      cls={isSidebarOpen ? 'open' : ''}
    />
    <MobileSidebarToggle on:toggle={toggleSidebar} />

    <main class="main-content flex-1 p-4 sm:ml-64 md:ml-72 lg:ml-80 overflow-y-auto">
      {#if currentChapter}
        <Editor bind:chapter={currentChapter} />
      {:else}
        <div class="no-chapter flex flex-col items-center justify-center h-full">
          <p class="text-gray-400 mb-4">No chapters available. Create a new chapter to start writing.</p>
          <button 
            class="btn bg-purple-800 hover:bg-purple-700 text-white py-2 px-4 rounded transition"
            on:click={() => document.getElementById('createChapterBtn').click()}
          >
            Create New Chapter
          </button>
        </div>
      {/if}
    </main>
  {:else}
    <div class="loading flex items-center justify-center h-screen w-full">
      <p class="text-2xl text-gray-600">Loading book data...</p>
    </div>
  {/if}
</div>

<style>
  /* :global(body) {
    @apply bg-gray-100;
  } */

  .write-page {
    @apply min-h-screen;
  }

  .main-content {
    height: calc(100vh - 1rem);
  }

  @media (max-width: 640px) {
    .main-content {
      @apply ml-0;
    }
  }
</style>

