<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { books } from '$lib/stores/bookStore';
    import JSZip from 'jszip';
    import FileSaver from 'file-saver';

    export let show = false; // Controls modal visibility
    let theme = 'dark'; // Default theme is dark
    let userInfoVisible = false; // Toggles user information visibility
    let username = '';

    // Load data on mount
    onMount(() => {
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        theme = savedTheme;
        applyTheme(theme);

        // Get user data
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            username = storedUser.username;
        }
    });

    function applyTheme(selectedTheme) {
        document.documentElement.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    }

    function handleThemeChange() {
        applyTheme(theme);
    }

    async function exportAllData() {
        const zip = new JSZip();
        const allBooks = $books;

        allBooks.forEach(book => {
            const bookFolder = zip.folder(book.title);
            book.chapters.forEach((chapter, index) => {
                bookFolder.file(`Chapter-${index + 1}.txt`, chapter.content || '');
            });
        });

        const content = await zip.generateAsync({ type: 'blob' });
        FileSaver.saveAs(content, 'books.zip');
    }

    function deleteAllData() {
        if (confirm('Are you sure you want to delete all data? This action cannot be undone.')) {
            books.set([]); // Clear all books from store
            localStorage.removeItem('books'); // Remove from storage
        }
    }

    function logOut() {
        if (confirm('Are you sure you want to log out? This will permanently delete the Account and Books')) {
            books.set([]);
            localStorage.removeItem('books');
            localStorage.removeItem('user'); // Clear user data
            goto('/'); // Redirect to login
        }
    }

    // function deleteAccount() {
    //     if (confirm('Are you sure you want to delete your account? This will remove all data permanently.')) {
    //         books.set([]); // Clear books
    //         localStorage.removeItem('books'); // Remove books from storage
    //         localStorage.removeItem('user'); // Remove user data
    //         goto('/login'); // Redirect to login
    //     }
    // }

    function handleClose() {
        show = false;
    }



    let currentTime;
    // Function to get the current time
    const updateTime = () => {
    currentTime = new Date().toLocaleTimeString();
    };

    onMount(() => {
    updateTime(); // Set the initial time
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component destroy
    });


    


</script>

{#if show}
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    class="modal-overlay {show ? 'visible' : ''}"
    on:click={handleClose}>
    <div class="modal" 
    on:click|stopPropagation>
        <h2>Settings</h2>
        <p>Privately Logged in as, {username}</p>
        <p class="op">Time: {currentTime}</p>        
        <!-- Theme Selection -->
        <!-- <div class="form-group">
            <label for="theme">Theme</label>
            <select id="theme" bind:value={theme} on:change={handleThemeChange}>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
            </select>
        </div> -->
        
        <!-- User Information Toggle -->
        <!-- <div>
            <button class="btn btn-secondary" on:click={() => userInfoVisible = !userInfoVisible}>
                {userInfoVisible ? 'Hide User Info' : 'Show User Info'}
            </button>
            {#if userInfoVisible}
                <div class="user-info">
                    <p><strong>Username:</strong> {username}</p>
                    <p><strong>Books:</strong> {bookCount}</p>
                    <button class="btn btn-danger" on:click={deleteAccount}>
                        Delete Account
                    </button>
                </div>
            {/if}
        </div> -->

        <!-- Export and Delete Data Buttons -->
        <div class="button-group">
            <button class="btn btn-secondary" on:click={exportAllData}>
                Export All Books
            </button>
            <button class="btn btn-danger" on:click={deleteAllData}>
                Delete All Books
            </button>
        </div>

        <!-- Log Out -->
        <button class="btn btn-secondary opal" on:click={logOut}>
            Log Out & Remove Account
        </button>

        <!-- Close Modal -->
        <button class="close-button" on:click={handleClose}>&times;</button>
    </div>
</div>
{/if}

<style>
    :global(:root) {
        --color-bg-dark: #1a1a1a;
        --color-bg-light: #ffffff;
        --color-text-dark: #ffffff;
        --color-text-light: #1a1a1a;
        --color-bg-secondary-dark: #2c2c2c;
        --color-bg-secondary-light: #f0f0f0;
        --color-text-secondary-dark: #b0b0b0;
        --color-text-secondary-light: #505050;
        --color-border-dark: #444444;
        --color-border-light: #e0e0e0;
    }

    :global([data-theme="dark"]) {
        --color-bg: var(--color-bg-dark);
        --color-text: var(--color-text-dark);
        --color-bg-secondary: var(--color-bg-secondary-dark);
        --color-text-secondary: var(--color-text-secondary-dark);
        --color-border: var(--color-border-dark);
    }

    :global([data-theme="light"]) {
        --color-bg: var(--color-bg-light);
        --color-text: var(--color-text-light);
        --color-bg-secondary: var(--color-bg-secondary-light);
        --color-text-secondary: var(--color-text-secondary-light);
        --color-border: var(--color-border-light);
    }

    .op {
        margin-bottom: 1.5rem;
    }
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
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .modal-overlay.visible {
        visibility: visible;
        opacity: 1;
    }

    .modal {
        background-color: var(--color-bg-secondary);
        color: var(--color-text);
        border-radius: 0.5rem;
        padding: 2rem;
        width: 90%;
        max-width: 32rem;
        position: relative;
    }

    h2 {
        font-size: 1.5rem;
        margin-bottom: 0.9rem;
    }
    p {
        margin-bottom: 0.4rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--color-text-secondary);
    }

    select {
        width: 100%;
        padding: 0.75rem;
        background-color: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 0.375rem;
        color: var(--color-text);
        font-size: 1rem;
    }

    .button-group {
        display: flex;
        gap: 1rem;
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
        border-radius: 0.25rem;
        font-size: 1rem;
        cursor: pointer;
    }

    .btn-secondary {
        background-color: var(--color-bg);
        color: var(--color-text);
        border: 1px solid var(--color-border);
    }
    .opal {
        margin-top: 15px;
    }

    .btn-danger {
        background-color: #dc3545;
        color: white;
        border: none;
    }
    /* .user-info {
        margin-top: 1rem;
        background-color: var(--color-bg);
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--color-border);
        color: var(--color-text);
    }

    .user-info p {
        margin: 0.5rem 0;
    } */
</style>
