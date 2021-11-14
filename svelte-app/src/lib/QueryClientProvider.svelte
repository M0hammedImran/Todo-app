<script>
    import { setContext } from 'svelte';
    import { QueryClient } from 'react-query/core';

    const client = new QueryClient();

    setContext('queryClient', client);
</script>

<slot />
