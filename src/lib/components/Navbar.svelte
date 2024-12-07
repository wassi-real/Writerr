<script>
  import favicon from "$lib/assets/favicon.png";
  let isMobileMenuOpen = false;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
</script>

<svelte:head>
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<header class="bg-black-900 border-b border-gray-700">
  <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <!-- lg+ -->
    <nav class="flex items-center justify-between h-16 lg:h-20">
      <div class="flex items-center space-x-3">
        <!-- Logo -->
        <a href="/" title="Home" class="flex items-center">
          <img class="w-auto h-8 lg:h-10" src="{favicon}" alt="Writerr Logo" />
        </a>
        <!-- Logo Text -->
        <span class="text-xl font-medium text-white lg:text-base">Writerr (Beta Version)</span>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        type="button" 
        class="inline-flex p-2 text-white transition-all duration-200 rounded-md md:hidden focus:bg-gray-800 hover:bg-gray-800"
        on:click={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} 
          />
        </svg>
      </button>

      <!-- Desktop Menu -->
      <div class="hidden md:flex md:items-center md:space-x-10">
        <a href="/about" class="text-sm font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70"> About </a>
        <!-- <a href="/" class="text-sm font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70"> Solutions </a> -->
        <a href="/feedback" class="text-sm font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70"> Feedback </a>
        <a href="/pricing" class="text-sm font-medium text-white transition-all duration-200 lg:text-base hover:text-opacity-70 focus:text-opacity-70"> Pricing </a>
        <a href="/dashboard" class="px-4 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-gray-200 lg:text-base">Dashboard</a>
      </div>
    </nav>
  </div>

  <!-- Mobile Menu -->
  {#if isMobileMenuOpen}
    <nav class="md:hidden min-h-screen px-4 py-10 text-center bg-black-900">
      <!-- <button 
        type="button" 
        class="inline-flex p-2 text-white transition-all duration-200 rounded-md focus:bg-gray-800 hover:bg-gray-800"
        on:click={toggleMobileMenu}
        aria-label="Close menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button> -->

      <div class="flex flex-col items-center mt-10 space-y-4">
        <a href="/about" class="py-2 font-medium text-white transition-all duration-200 hover:text-opacity-70"> About </a>
        <!-- <a href="/" class="py-2 font-medium text-white transition-all duration-200 hover:text-opacity-70"> Solutions </a> -->
        <a href="/feedback" class="py-2 font-medium text-white transition-all duration-200 hover:text-opacity-70"> Feedback </a>
        <a href="/pricing" class="py-2 font-medium text-white transition-all duration-200 hover:text-opacity-70"> Pricing </a>
        <a href="/dashboard" class="px-4 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-gray-200">Dashboard</a>
      </div>
    </nav>
  {/if}
</header>
