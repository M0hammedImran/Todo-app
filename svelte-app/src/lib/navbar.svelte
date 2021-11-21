<script>
    import GithubIcon from './github_icon.svelte';
</script>

<header class="text-gray-600 body-font">
    <div class="container max-w-6xl mx-auto flex flex-wrap p-5 px-6 flex-row items-center">
        <a href="/" class="flex title-font font-medium items-center text-gray-900 ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
            >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span class="ml-3 hidden sm:inline text-xl">Todo Apps</span>
        </a>

        <nav class="ml-auto flex flex-wrap items-center text-base justify-center">
            <a href="/about" class="mr-5 hover:text-gray-900">About</a>
            <a
                href="https://github.com/m0hammedimran/todo-app"
                target="_blank"
                class="inline-flex items-center rounded-full bg-gray-100 border-0 focus:outline-none hover:bg-white "
                ><GithubIcon /></a
            >
        </nav>
    </div>
</header>
