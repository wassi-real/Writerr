<script>
  import { page } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>
<svelte:head>
  <title>Page Not Found</title>
</svelte:head>

<Navbar/>
<div class="error-container">
    <div class="error-code">404</div>
    <div class="error-message">Oops! The page you're looking for doesn't exist.</div>
    <div class="non-existent-page">
      Page not found: <strong>{$page.url.pathname}</strong>
    </div>
    <a href="/">Go Back to Home</a>
</div>
<br>
<br>
<Footer/>

<style>
    .error-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      /* align-self: center; */
      margin-top: 50px;
      margin-bottom: 50px;
      /* height: 100vh; */
      background-color: #1a1a1a;
      font-family: 'Arial', sans-serif;
      color: #ffffff;
    }
    .error-code {
      font-size: 5rem;
      font-weight: bold;
      color: #7325fb;
    }
    .error-message {
      font-size: 1.5rem;
      margin: 1rem 0;
    }
    .non-existent-page {
      font-size: 1.2rem;
      font-style: italic;
      color: #c3c3c3;
    }
    a {
      margin-top: 2rem;
      padding: 0.5rem 1.5rem;
      background-color: #3a00cb;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }
    a:hover {
      background-color: #3a00cb;
    }
  </style>