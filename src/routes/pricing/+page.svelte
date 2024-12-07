<script>
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>
<Navbar/>
<svelte:head>
    <title>Pricing</title>
</svelte:head>
<section class="bg-black-900 text-white py-16 sm:py-20">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12">
      <!-- Title -->
      <h2 class="text-3xl font-semibold text-center mb-16">Pricing Plans</h2>
  
      <!-- Pricing Blocks -->
      <div class="space-y-12">
        <!-- Free Block -->
        <div class="relative p-10 border-4 border-gray-700 rounded-lg shadow-lg transition-all duration-300 hover:border-gradient-to-r hover:from-green-600 hover:to-green-400">
          <h3 class="text-4xl font-bold mb-4 text-center">Beta Version (Free)</h3>
          <p class="text-gray-300 text-lg text-center mb-6">
            All features are completely free during the beta period. Enjoy full access to the app with no restrictions!
          </p>
          <div class="flex justify-center">
            <div class="py-3 px-6 text-lg font-medium bg-white text-gray-900 rounded-lg transition-all duration-300 hover:bg-gray-200 inline-block">
              All Features Unlocked
            </div>
          </div>
        </div>
  
        <!-- Coming Soon Block -->
        <div class="relative p-10 border-4 border-gray-700 rounded-lg shadow-lg transition-all duration-300 hover:border-gradient-to-r hover:from-purple-600 hover:to-purple-400">
          <h3 class="text-4xl font-bold mb-4 text-center">Coming Soon - Premium Version</h3>
          <p class="text-gray-300 text-lg text-center mb-6">
            Get ready for more powerful features coming in the new version. The premium plan will unlock advanced capabilities to enhance your writing experience.
          </p>
          <div class="flex justify-center">
            <div class="py-3 px-6 text-lg font-medium bg-white text-gray-900 rounded-lg transition-all duration-300 hover:bg-gray-200 inline-block">
              More Features Coming Soon
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Call to Action Section -->
  <section class="bg-neutral-900 text-white py-16 sm:py-20 mt-16">
    <div class="container mx-auto text-center">
      <h3 class="text-3xl font-semibold mb-6">Join the Beta Today</h3>
      <p class="text-lg text-gray-400 mb-8">Sign up now to get started with all the features available in our Beta Version, completely free!</p>
      <a href="/login" class="bg-purple-800 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-purple-700 transition-all duration-200">
        Start Writing Today
      </a>
    </div>
  </section>
  
<Footer/>