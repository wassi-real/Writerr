<script>
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>
<svelte:head>
    <title>Thank you</title>
</svelte:head>
<Navbar/>
<section class="bg-black-900 text-white py-16 sm:py-20">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
      <!-- Checkmark Icon -->
      <div class="flex justify-center mb-8">
        <div class="bg-green-600 rounded-full p-4 sm:p-6 lg:p-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 sm:h-16 sm:w-16 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
  
      <!-- Thank You Message -->
      <h1 class="text-5xl font-bold mb-6">Thank You!</h1>
      <p class="text-lg text-gray-300 mb-8">
        Your feedback means a lot to us and helps make <span class="text-green-500">Writerr</span> even better.
      </p>
  
      <!-- Call-to-Action -->
      <div class="space-y-4">
        <a
          href="/"
          class="block sm:inline-block bg-green-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-green-700 transition-all duration-200"
        >
          Return to Homepage
        </a>
        <!-- <a
          href="/features"
          class="block sm:inline-block bg-gray-800 text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-gray-700 transition-all duration-200"
        >
          Explore Features
        </a> -->
      </div>
    </div>
  </section>
  

<Footer/>