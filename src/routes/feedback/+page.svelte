<script>
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>
<svelte:head>
    <title>Provide Feedback</title>
</svelte:head>
<Navbar/>
<section class="bg-black-900 text-white py-16 sm:py-20">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12">
      <!-- Title -->
      <h1 class="text-5xl font-bold text-center mb-12">We Value Your Feedback</h1>
  
      <!-- Intro Text -->
      <p class="text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-12">
        Help us improve Writerr by sharing your thoughts, reporting bugs, or suggesting new features. Your feedback plays a vital role in shaping the future of our app!
      </p>
  
      <!-- Feedback Form -->
      <div class="bg-neutral-800 rounded-lg shadow-lg p-8 sm:p-12 max-w-4xl mx-auto">
        <form class="space-y-6" action="https://formsubmit.co/b7193db00a902acc4a9f843b27b8ed48" method="POST" id="contactForm">
        <input type="hidden" name="_next" value="http://writerr.softodesign.com/thanks">
        <input type="hidden" name="_captcha" value="false">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
            <input 
              type="text" 
              id="name"
              name="name" 
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your name"
              required
            />
          </div>
  
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Your Email (optional)</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your email"
              required
            />
          </div>
  
          <!-- Feedback Type -->
          <div>
            <label for="type" class="block text-sm font-medium text-gray-300 mb-2">Type of Feedback</label>
            <select 
              id="type" 
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
              name="type"
              required
            >
              <option value="general">General Feedback</option>
              <option value="bug">Report a Bug</option>
              <option value="feature">Suggest a Feature</option>
            </select>
          </div>
  
          <!-- Message -->
          <div>
            <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
            <textarea 
              id="message" 
              name="message"
              rows="5"
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Describe your feedback in detail..."
              required
            ></textarea>
          </div>
  
          <!-- Submit Button -->
          <div class="text-center">
            <button 
              type="submit" 
              class="bg-purple-800 text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-purple-700 transition-all duration-200"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>  

<Footer/>
