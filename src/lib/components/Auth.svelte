<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let username = '';
  let passcode = '';
  let confirmPasscode = '';
  let isSignup = true;
  let signupAttempts = 0;
  const MAX_SIGNUP_ATTEMPTS = 3;

  onMount(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      username = storedUser.username;
    }
  });

  const handleSignup = () => {
    // Validate input
    if (!username || !passcode) {
      alert('Please provide both username and passcode.');
      return;
    }

    // Check passcode confirmation
    if (passcode !== confirmPasscode) {
      alert('Passcodes do not match. Please try again.');
      return;
    }

    // Limit signup attempts
    signupAttempts++;
    if (signupAttempts > MAX_SIGNUP_ATTEMPTS) {
      alert('Too many signup attempts. Please refresh the page.');
      return;
    }

    // Clear existing data
    localStorage.removeItem('user');
    localStorage.removeItem('books');
    localStorage.removeItem('sessionToken');

    // Save new user
    localStorage.setItem('user', JSON.stringify({ 
      username, 
      passcode 
    }));

    // Create session token
    const sessionToken = crypto.randomUUID();
    localStorage.setItem('sessionToken', sessionToken);

    // Redirect to dashboard
    alert('Signup successful!');
    goto('/dashboard');
  };
</script>

<Navbar />
<div class="flex flex-col items-center justify-center min-h-screen bg-black-900">
  <div class="max-w-xl px-6 py-8 text-center">
    <h1 class="text-3xl font-extrabold text-white mb-4">Privacy-Focused Signup</h1>
    <p class="text-gray-300 text-lg">
      Create your account. Your data will be securely stored in your browser's local storage. 
      No data is sent to servers, ensuring complete privacy.
    </p>
  </div>

  <div class="w-full max-w-md p-8 bg-neutral-900 rounded-lg shadow-md border border-gray-700 gradient-hover">
    <h2 class="text-2xl font-bold text-center text-white mb-6">
      Sign Up
    </h2>
    <form class="space-y-6" on:submit|preventDefault={handleSignup}>
      <div>
        <label
          for="username"
          class="block text-lg font-medium text-gray-300 mb-2"
        >
          Author Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Enter your Author Username"
          bind:value={username}
          class="w-full px-4 py-3 text-gray-200 bg-gray-700 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div>
        <label
          for="passcode"
          class="block text-lg font-medium text-gray-300 mb-2"
        >
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

      <div>
        <label
          for="confirm-passcode"
          class="block text-lg font-medium text-gray-300 mb-2"
        >
          Confirm Passcode
        </label>
        <input
          type="password"
          id="confirm-passcode"
          placeholder="Confirm your Passcode"
          bind:value={confirmPasscode}
          class="w-full px-4 py-3 text-gray-200 bg-gray-700 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full px-6 py-3 text-white bg-purple-800 rounded-lg text-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        Sign Up
      </button>
    </form>
  </div>
</div>
<br>
<br>
<Footer />