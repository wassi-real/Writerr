<script>
  import { books } from '$lib/stores/bookStore';
  
  export let show = false;
  
  let title = '';
  let description = '';
  let author = '';
  
  function handleSubmit() {
      const newBook = {
          id: crypto.randomUUID(),
          title,
          description,
          author,
          chapters: []
      };
      
      // Update the store
      books.update(b => {
          const updatedBooks = [...b, newBook];
          
          // Save to local storage
          localStorage.setItem('books', JSON.stringify(updatedBooks));
          
          return updatedBooks;
      });
      
      // Reset form and close modal
      title = '';
      description = '';
      author = '';
      show = false;
  }
  
  function handleClose() {
      show = false;
      title = '';
      description = '';
      author = '';
  }
</script>

<!-- Modal Code -->
{#if show}
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="modal-overlay" on:click={handleClose}>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal" on:click|stopPropagation>
      <h2>Create New Book</h2>
      <form on:submit|preventDefault={handleSubmit}>
          <div class="form-group">
              <label for="title">Title</label>
              <input
                  type="text"
                  id="title"
                  bind:value={title}
                  required
                  placeholder="Enter book title..."
              />
          </div>
          <div class="form-group">
              <label for="author">Author</label>
              <input
                  type="text"
                  id="author"
                  bind:value={author}
                  required
                  placeholder="Enter author name..."
              />
          </div>
          <div class="form-group">
              <label for="description">Description</label>
              <textarea
                  id="description"
                  bind:value={description}
                  required
                  placeholder="Enter book description..."
              ></textarea>
          </div>
          <div class="button-group">
              <button type="button" class="btn btn-secondary" on:click={handleClose}>
                  Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                  Create Book
              </button>
          </div>
      </form>
      <button class="close-button" on:click={handleClose}>&times;</button>
  </div>
</div>
{/if}

  
  <style>
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
  
    .modal {
      background-color: var(--color-bg-secondary);
      border-radius: 0.5rem;
      padding: 2rem;
      width: 90%;
      max-width: 32rem;
      position: relative;
    }
  
    h2 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
  
    .form-group {
      margin-bottom: 1rem;
    }
  
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--color-text-secondary);
    }
  
    input,
    textarea {
      width: 100%;
      padding: 0.75rem;
      background-color: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: 0.375rem;
      color: var(--color-text);
      font-size: 1rem;
    }
  
    textarea {
      min-height: 8rem;
      resize: vertical;
    }
  
    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }
  
    .button-group button {
      flex: 1;
    }
  
    .close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      color: var(--color-text-secondary);
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.25rem;
      line-height: 1;
    }
  
    .close-button:hover {
      color: var(--color-text);
    }
  </style>