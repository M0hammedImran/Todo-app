<script>
    import '../tailwind.css';
    import Navbar from '$lib/navbar.svelte';
    import QueryClientProvider from '$lib/QueryClientProvider.svelte';
</script>

<QueryClientProvider>
    <Navbar />
    <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 p-4 min-h-screen">
        <slot />
    </main>
</QueryClientProvider>
