<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Fa from 'svelte-fa';
  import { faPlus, faCog, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
  import BookCard from '$lib/components/BookCard.svelte';
  import CreateBookModal from '$lib/components/CreateBookModal.svelte';
  import CreateChapterModal from '$lib/components/CreateChapterModal.svelte';
  import SettingsModal from '$lib/components/SettingsModal.svelte';
  import { books } from '$lib/stores/bookStore';
  import favicon from '$lib/assets/favicon.png';

  let username = '';
  let passcode = '';
  let showBookModal = false;
  let showChapterModal = false;
  let showSettingsModal = false;
  let showPasscodeVerification = false;
  let verificationAttempts = 0;
  const MAX_VERIFICATION_ATTEMPTS = 10;

  let isMobileMenuOpen = false;

  onMount(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const sessionToken = localStorage.getItem('sessionToken');

    if (!savedUser || !sessionToken) {
      goto('/login');
      return;
    }

    showPasscodeVerification = true;
    username = savedUser.username;
  });

  const verifyPasscode = () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    verificationAttempts++;

    if (verificationAttempts > MAX_VERIFICATION_ATTEMPTS) {
      alert('Too many incorrect attempts. Redirecting to signup.');
      handleReset();
      return;
    }

    if (savedUser.passcode === passcode) {
      showPasscodeVerification = false;
      verificationAttempts = 0;

      const storedBooks = localStorage.getItem('books');
      if (!storedBooks) {
        localStorage.setItem('books', JSON.stringify([]));
      } else {
        $books = JSON.parse(storedBooks);
      }
    } else {
      alert(`Incorrect passcode. Attempt ${verificationAttempts} of ${MAX_VERIFICATION_ATTEMPTS}`);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('books');
    localStorage.removeItem('sessionToken');
    goto('/login');
  };

  const goHome = () => {
    goto('/')
  };
</script>

<svelte:head>
  <title>Writerr - Dashboard</title>
  <meta name="description" content="The official dashboard of Writerr" />
</svelte:head>

{#if showPasscodeVerification}
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
  <button 
    class="absolute top-4 left-4 px-4 py-2 text-black bg-white rounded-lg text-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
    on:click={goHome}>
    Go Back Home
  </button>
  <div class="bg-neutral-900 p-8 rounded-lg w-full max-w-md animate-fade-in">
    <h2 class="text-2xl font-bold text-center text-white mb-6">
      Verify Your Passcode
    </h2>
    <p class="text-gray-300 text-center mb-4">
      Welcome, {username}. Please enter your passcode to access the dashboard.
    </p>
    <form on:submit|preventDefault={verifyPasscode} class="space-y-6">
      <div>
        <label for="passcode" class="block text-lg font-medium text-gray-300 mb-2">
          Passcode
        </label>
        <input
          type="password"
          id="passcode"
          placeholder="Enter your Passcode"
          bind:value={passcode}
          class="w-full px-4 py-3 text-gray-200 bg-gray-700 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>
      <div class="flex space-x-4">
        <button
          type="submit"
          class="flex-1 px-6 py-3 text-white bg-purple-800 rounded-lg text-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
        >
          Verify
        </button>
        <button
          type="button"
          on:click={handleReset}
          class="flex-1 px-6 py-3 text-white bg-red-800 rounded-lg text-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
        >
          Reset
        </button>
      </div>
    </form>
  </div>
</div>
{/if}

{#if !showPasscodeVerification}
<div class="dashboard">
  <header class="flex items-center justify-between p-5 border-b border-gray-700">
    <div class="flex items-center gap-4">
      <a href="/" class="flex items-center gap-2">
        <img alt="The Writerr logo" class="h-10 w-10" src={favicon} />
        <h1 class="text-xl font-semibold text-var(--color-text)">Writerr (Beta Version)</h1>
      </a>
    </div>
    <button class="text-var(--color-text) lg:hidden hover:text-gray-500 transition duration-300" on:click={() => isMobileMenuOpen = !isMobileMenuOpen}>
      <Fa icon={isMobileMenuOpen ? faTimes : faBars} />
    </button>
    <div class="hidden lg:flex gap-4">
      <button
        class="px-4 py-2 bg-teal-800 rounded-lg text-white hover:bg-teal-700 transition duration-300 lg:text-base"
        on:click={() => showChapterModal = true}
      >
        Create New Chapter
      </button>
      <button
        class="px-4 py-2 bg-purple-800 rounded-lg text-white hover:bg-purple-700 transition duration-300 lg:text-base"
        on:click={() => showBookModal = true}
      >
        Create New Book
      </button>
      <button
        class="p-3 rounded-full bg-black-800 text-var(--color-text) hover:bg-gray-500 transition duration-300"
        on:click={() => showSettingsModal = true}
      >
        <Fa icon={faCog} />
      </button>
    </div>
  </header>

  {#if isMobileMenuOpen}
  <div class="lg:hidden fixed inset-0 bg-black bg-opacity-80 z-50">
    <div class="p-5 bg-neutral-800 h-full">
      <button class="text-white mb-5 hover:text-gray-500 transition duration-300" on:click={() => isMobileMenuOpen = false}>
        <Fa icon={faTimes} />
      </button>
      <nav class="space-y-4">
        <button
          class="block w-full px-4 py-2 bg-teal-800 rounded-lg text-white hover:bg-teal-700 transition duration-300"
          on:click={() => {
            isMobileMenuOpen = false;
            showChapterModal = true;
          }}
        >
          Create New Chapter
        </button>
        <button
          class="block w-full px-4 py-2 bg-purple-800 rounded-lg text-white hover:bg-purple-700 transition duration-300"
          on:click={() => {
            isMobileMenuOpen = false;
            showBookModal = true;
          }}
        >
          Create New Book
        </button>
        <button
          class="block w-full px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition duration-300"
          on:click={() => {
            isMobileMenuOpen = false;
            showSettingsModal = true;
          }}
        >
          Settings
        </button>
      </nav>
    </div>
  </div>
  {/if}

  <main class="container mx-auto px-4 py-6 space-y-6">
    {#if $books.length === 0}
      <p class="text-center text-gray-400 text-lg">No books created yet. Start by creating a new book!</p>
    {/if}
    {#each $books as book}
      <BookCard {book} class="w-full p-4 bg-gray-800 rounded-lg hover:shadow-lg hover:bg-gray-700 transition-all duration-300" />
    {/each}
  </main>
</div>

<CreateBookModal bind:show={showBookModal} class="animate-fade-in" />
<CreateChapterModal bind:show={showChapterModal} class="animate-fade-in" />
<SettingsModal bind:show={showSettingsModal} class="animate-fade-in" />
{/if}

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-in-out;
  }


</style>
