<script>
    import Auth from '$lib/components/Auth.svelte';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    onMount(() => {
        // Always check for user and session
        const savedUser = JSON.parse(localStorage.getItem('user'));
        const sessionToken = localStorage.getItem('sessionToken');
        
        // If user and session token exist, redirect to dashboard
        if (savedUser && sessionToken) {
            goto('/dashboard');
            return;
        }
    });
</script>

<svelte:head>
    <title>Login/Signup</title>
</svelte:head>

<Auth />
