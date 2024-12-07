<script>
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import banner from '$lib/assets/banner.png'
</script>
<svelte:head>
    <title>About Writerr</title>
</svelte:head>

<Navbar/>
<section class="bg-black-900 text-white py-16 sm:py-20">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12">
      <!-- Title -->
      <h1 class="text-5xl font-bold text-center mb-12">About Writerr</h1>
      
      <!-- Content Section -->
      <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
        <!-- Text Section -->
        <div>
          <h2 class="text-4xl font-semibold mb-6 leading-tight">
            Your Ultimate Writing Companion
          </h2>
          <p class="text-gray-300 text-lg leading-relaxed mb-6">
            Writerr is a cutting-edge platform designed for writers of all skill levels. Whether you're a professional author or just getting started, our tools empower you to bring your ideas to life with ease. Enjoy a distraction-free, intuitive writing environment tailored to your needs.
          </p>
          <p class="text-gray-300 text-lg leading-relaxed mb-6">
            During our Beta phase, we're offering all features completely free to help you explore and improve your craft. We're committed to building a community of passionate writers who thrive on creativity and innovation.
          </p>
          <p class="text-gray-300 text-lg leading-relaxed">
            Thank you for using Writerr.
          </p>
        </div>
  
        <!-- Image Section -->
        <div class="relative">
          <div class="overflow-hidden rounded-lg shadow-lg transition-all duration-300 border-4 border-gray-700 hover:border-gradient-to-r hover:from-green-600 hover:to-green-400">
            <img 
              src="{banner}" 
              alt="Writerr Illustration" 
              class="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Mission Section -->
  <section class="bg-black-800 text-white py-16 sm:py-20">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
      <h2 class="text-4xl font-semibold mb-6">Our Mission</h2>
      <p class="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
        At Writerr, our mission is to simplify the writing process while providing powerful tools that enhance your creativity. 
        We aim to inspire writers to achieve their full potential and produce their best work effortlessly. Together, we’ll make writing an enjoyable and fulfilling experience for everyone.
      </p>
    </div>
  </section>
  
  <!-- Call to Action Section -->
  <section class="bg-neutral-900 text-white py-16 sm:py-20">
    <div class="container mx-auto text-center">
      <h3 class="text-3xl font-semibold mb-6">Join Our Growing Community</h3>
      <p class="text-lg text-gray-400 mb-8">
        Become part of the Writerr family and gain access to an ever-growing suite of features designed with you in mind.
      </p>
      <a href="/login" class="bg-purple-800 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-purple-700 transition-all duration-200">
        Get Started for Free
      </a>
    </div>
  </section>
  

<Footer/>