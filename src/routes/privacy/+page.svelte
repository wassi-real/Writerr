<script>
  import Footer from "$lib/components/Footer.svelte";
import Navbar from "$lib/components/Navbar.svelte";

</script>
<svelte:head>
    <title>Privacy Policy</title>
</svelte:head>
<Navbar/>
<section class="bg-black-900 text-white py-16 sm:py-20">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p class="text-lg text-gray-300">
          Your privacy is important to us. Learn how we collect, use, and protect your data.
        </p>
      </div>
  
      <!-- Policy Sections -->
      <div class="space-y-12">
        <!-- Data Collection -->
        <div>
          <h2 class="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p class="text-gray-300 leading-relaxed">
            We only collect personal information, such as your name, email address through for Feedback purposes.
            Which is also shared at your will. Other than that we do not collect any sort of information from you.
          </p>
        </div>
  
        <!-- Data Usage -->
        <div>
          <h2 class="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p class="text-gray-300 leading-relaxed">
            The information we collect from our feedback is only used to make Writerr better and fix issue.
            We may also use your email address to send important updates or promotional content, but you can opt out at any time.
          </p>
        </div>
  
        <!-- Data Sharing -->
        <div>
          <h2 class="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
          <p class="text-gray-300 leading-relaxed">
            We do not sell or share your personal information with third parties, except as necessary to comply with legal obligations or to protect the rights and safety of Writerr and its users.
          </p>
        </div>
  
        <!-- Security Measures -->
        <div>
          <h2 class="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p class="text-gray-300 leading-relaxed">
            We implement advanced security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. All your data is fully local and saved in browser memory
            without the need of any server.
          </p>
        </div>
  
        <!-- Cookies -->
        <div>
          <h2 class="text-2xl font-semibold mb-4">5. Cookies</h2>
          <p class="text-gray-300 leading-relaxed">
            Writerr uses cookies to enhance your experience. Cookies allow us to remember your preferences and provide personalized services. You can adjust your browser settings to refuse cookies, but some features of the app may not function as intended.
          </p>
        </div>
  
        <!-- Your Rights -->
        <div>
          <h2 class="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p class="text-gray-300 leading-relaxed">
            You have the right to access, correct, or delete your personal information. If you wish to exercise any of these rights, please contact us at <a href="mailto:wassi@trysoftodesign.com" class="text-green-500 hover:underline">wassi@trysoftodesign.com</a>.
          </p>
        </div>
  
        <!-- Updates to Policy -->
        <div>
          <h2 class="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
          <p class="text-gray-300 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.
          </p>
        </div>
      </div>
  
      <!-- Contact Section -->
      <div class="mt-12 text-center">
        <p class="text-gray-300">
          If you have any questions about this policy, contact us at <a href="mailto:wassi@trysoftodesign.com" class="text-green-500 hover:underline">wassi@trysoftodesign.com</a>.
        </p>
      </div>
    </div>
  </section>

<Footer/>