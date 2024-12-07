<script>
  import Feat from '$lib/components/Feat.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Cta from '$lib/components/Cta.svelte';
</script>
<svelte:head>
<title>Writerr</title>
</svelte:head>
<Navbar/>
<Hero/>
<Feat/>
<Cta/>
<Footer/>


<!-- <style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }

  :global(:root) {
    --color-bg-primary: #ffffff;
    --color-bg-secondary: #f3f4f6;
    --color-text: #1f2937;
    --color-primary: #3b82f6;
    --color-border: #e5e7eb;
  }
</style> -->
