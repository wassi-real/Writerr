<script>
  import Fa from 'svelte-fa';
  import { faPlus, faTrash, faPencilAlt, faGripVertical } from '@fortawesome/free-solid-svg-icons';
  import { browser } from '$app/environment';
  import CreateChapterModal2 from './CreateChapterModal2.svelte';
  import { books } from '$lib/stores/bookStore';
  import { dndzone } from 'svelte-dnd-action';

  export let currentBook;
  export let currentChapter;
  export let cls = '';

  let showChapterModal = false;
  let isReorderMode = false;

  function goToHome() {
    if (browser) {
      window.location.href = '/dashboard';
    }
  }

  function deleteChapter(chapterId) {
    const confirmed = confirm('Are you sure you want to delete this chapter?');
    if (confirmed) {
      currentBook.chapters = currentBook.chapters.filter((chapter) => chapter.id !== chapterId);
      books.updateBook(currentBook.id, (book) => ({
        ...book,
        chapters: currentBook.chapters
      }));
      if (currentChapter?.id === chapterId) {
        currentChapter = null;
      }
    }
  }

  function handleDndConsider(e) {
    currentBook.chapters = e.detail.items;
  }

  function handleDndFinalize(e) {
    currentBook.chapters = e.detail.items;
    books.updateBook(currentBook.id, (book) => ({
      ...book,
      chapters: currentBook.chapters
    }));
  }

  function toggleReorderMode() {
    isReorderMode = !isReorderMode;
  }
</script>

<aside class="w-full sm:w-64 md:w-72 lg:w-80 h-screen fixed left-0 top-0 bg-neutral-900 border-r border-gray-800 flex flex-col overflow-hidden z-50 {cls}">
  <div class="p-4 border-b border-gray-800 flex flex-col gap-2">
    <button 
      class="btn bg-teal-800 hover:bg-teal-700 text-white py-2 px-4 rounded transition"
      on:click={goToHome}
    >
      Back To Home
    </button>
    <button 
      class="btn bg-purple-800 hover:bg-purple-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2 transition"
      id="createChapterBtn"
      on:click={() => showChapterModal = true}
    >
      <Fa icon={faPlus} class="w-4 h-4" /> <span>New Chapter</span>
    </button>
  </div>
  
  <div class="p-4 flex flex-col overflow-hidden flex-grow">
    <h2 class="text-lg font-semibold text-white mb-4">{currentBook.title}</h2>
    <div class="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
      {#if currentBook.chapters.length > 0}
        <div use:dndzone={{items: currentBook.chapters, dragDisabled: !isReorderMode}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
          {#each currentBook.chapters as chapter (chapter.id)}
            <div 
              class="flex items-center p-3 mb-2 bg-gray-800 rounded-lg cursor-pointer transition transform hover:translate-x-1"
              class:active={currentChapter?.id === chapter.id}
            >
              {#if isReorderMode}
                <Fa icon={faGripVertical} class="mr-2 text-gray-400 cursor-move" />
              {/if}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <span 
                class="flex-grow text-white"
                on:click={() => currentChapter = chapter}
              >
                {chapter.title}
              </span>
              <button 
                class="ml-2 text-gray-400 hover:text-blue-500 transition"
                on:click={toggleReorderMode}
                aria-label="Toggle Reorder Mode"
              >
                <Fa icon={isReorderMode ? faPencilAlt : faPencilAlt} />
              </button>
              <button 
                class="ml-2 text-gray-400 hover:text-red-500 transition"
                on:click={() => deleteChapter(chapter.id)}
                aria-label="Delete Chapter"
              >
                <Fa icon={faTrash} />
              </button>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-gray-400 text-center">No chapters yet</p>
      {/if}
    </div>
  </div>
</aside>

<CreateChapterModal2 
  bind:show={showChapterModal} 
  bind:currentBook 
/>

<style>
  /* Custom scrollbar styles */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #2d2d2d;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4a4a4a;
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #6a6a6a;
  }

  /* Responsive styles */
  @media (max-width: 640px) {
    aside {
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out;
    }

    aside.open {
      transform: translateX(0);
    }
  }
</style>

