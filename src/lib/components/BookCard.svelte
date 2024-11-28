<script>
  import { goto } from '$app/navigation';
  
  export let book;
</script>

<!-- svelte-ignore a11y_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="book-card" on:click={() => goto(`/write/${book.id}`)}>
  <h2>{book.title}</h2>
  <p class="author">by {book.author}</p>
  <p class="description">{book.description}</p>
</div>

<style>
  .book-card {
    padding: 1.25rem;
    background-color: var(--color-bg-secondary);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .book-card:hover {
    transform: translateY(-0.25rem);
  }

  h2 {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  .author {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .description {
    color: var(--color-text-secondary);
  }
</style>