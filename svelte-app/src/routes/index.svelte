<script lang="ts">
    import PlusIcon from '$lib/plus_icon.svelte';
    import ReloadIcon from '$lib/reload_icon.svelte';
    import DisplayTodo from '$lib/display_todo.svelte';
    import { Todo, useQuery } from '$lib/query';

    export const reload = () => {
        refetch();
    };
    const todosUrl = 'http://localhost:5555/todo';
    const result = useQuery<{ data: Todo[] }>('repoData', () => {
        return fetch(todosUrl).then((res) => res.json());
    });

    $: ({ isLoading, error, refetch, data, isRefetching } = $result);
</script>

<svelte:head>
    <title>Welcome | TodoApp</title>
</svelte:head>

<div class="flex mb-6 space-x-4">
    <a href="todo/add" class="w-full inline-block">
        <div class="bg-gray-800 rounded h-14 flex p-4 items-center text-lg relative justify-center">
            <PlusIcon
                className="text-indigo-400 flex-shrink-0 absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 mr-16"
            />
            <span class="text-white font-medium">Add Todo</span>
        </div>
    </a>

    <button
        class="p-4 bg-gray-800 rounded h-14 flex items-center text-lg relative justify-center space-x-4"
        on:click={() => refetch()}
    >
        <ReloadIcon className={` text-indigo-400 ${isRefetching ? 'animate-spin' : ''}`} />
        <span class="text-white font-medium">Reload</span>
    </button>
</div>

<DisplayTodo Todos={data?.data} {error} {isLoading} {refetch} />
