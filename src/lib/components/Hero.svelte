<script>
  import writerr from '$lib/assets/Writerr2.png'
</script>
<section class="bg-black-900 text-white">
    <div class="container mx-auto px-6 py-20 sm:px-8 lg:px-12">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <!-- Left Text Section -->
        <div class="max-w-2xl space-y-6">
          <h1 class="text-4xl font-extrabold leading-tight sm:text-5xl">
            The Free Writing Platform
          </h1>
          <p class="text-lg text-gray-400 leading-relaxed">
            Writerr (Beta) is the ultimate platform for writers to craft, edit, and perfect their books. 
            Designed with simplicity and power in mind, it’s your go-to tool for storytelling.
          </p>
          <div class="flex flex-wrap gap-4">
            <a 
              href="/login" 
              class="px-8 py-3 text-lg font-medium text-black bg-white rounded-lg shadow-md hover:bg-gray-200 transition">
              Get Started
            </a>
            <a 
              href="/about" 
              class="px-8 py-3 text-lg font-medium text-white border border-white rounded-lg hover:bg-gray-800 transition">
              Learn More
            </a>
          </div>
        </div>
  
        <!-- Right Image Section -->
        <div class="flex justify-center">
          <div class="relative group">
            <!-- Image with Border Animation -->
            <img 
              src="{writerr}" 
              alt="Book Writing Illustration" 
              class="w-full max-w-md lg:max-w-lg rounded-lg group-hover"
            />
            <!-- <div 
              class="absolute inset-0 rounded-lg border-4 border-transparent group-hover:animate-gradient-border
                group-hover:border-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>

  
<style>




.group-hover {
            border: 5px solid transparent;
            animation: borderAnimation2 1.5s infinite linear;
 }
        
@keyframes borderAnimation2 {
    0% {
        border-color: #5E17EB;
    }
    25% {
        border-color: #A51B3A;
    }
    50% {
        border-color: #FF6F00;
    }
    75% {
        border-color: #00C853;
    }
    100% {
        border-color: #5E17EB;
    }
}

</style>