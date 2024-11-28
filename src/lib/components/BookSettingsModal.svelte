<script>
    import { createEventDispatcher } from 'svelte';
  
    export let book;
    
    const dispatch = createEventDispatcher();
    
    let title = book.title;
    let description = book.description;
    let author = book.author;
    
    function handleUpdate() {
      dispatch('update', { ...book, title, description, author });
    }
  
    function handleDelete() {
      dispatch('delete');
    }
  
    function handleExport() {
      dispatch('export');
    }
  
    function handleClose() {
      dispatch('close');
    }
  </script>
  
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-overlay" on:click={handleClose}>
    <div class="modal" on:click|stopPropagation>
      <h2>Book Settings</h2>
      <form on:submit|preventDefault={handleUpdate}>
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
          <button type="submit" class="btn btn-primary">
            Update Book
          </button>
          <button type="button" class="btn btn-danger" on:click={handleDelete}>
            Delete Book
          </button>
          <button type="button" class="btn btn-secondary" on:click={handleExport}>
            Export as ZIP
          </button>
        </div>
      </form>
      <button class="close-button" on:click={handleClose}>&times;</button>
    </div>
  </div>
  
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
  
    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 1rem;
    }
  
    .btn-primary {
      background-color: var(--color-primary);
      color: white;
    }
  
    .btn-danger {
      background-color: var(--color-error);
      color: white;
    }
  
    .btn-secondary {
      background-color: var(--color-bg);
      color: var(--color-text);
      border: 1px solid var(--color-border);
    }
  </style>
  
  