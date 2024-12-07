<script>
    import { createEventDispatcher } from 'svelte';
    import Fa from 'svelte-fa';
    import { faBars } from '@fortawesome/free-solid-svg-icons';
  
    const dispatch = createEventDispatcher();
  
    function toggleSidebar() {
      dispatch('toggle');
    }
  </script>
  
  <button
    class="fixed top-4 left-4 z-[60] bg-purple-800 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg transition sm:hidden"
    on:click={toggleSidebar}
    aria-label="Toggle Sidebar"
  >
    <Fa icon={faBars} />
  </button>
  
  