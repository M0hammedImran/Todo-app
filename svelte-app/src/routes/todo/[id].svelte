<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import Loading from '$lib/loading.svelte';
    import type { Todo } from '$lib/query';
    import { store } from '$lib/store';
    import { onMount } from 'svelte';

    const onSubmit = (e: Event & { currentTarget: EventTarget & HTMLFormElement }) => {
        e.preventDefault();
    };

    onMount(() => store.fetch());

    let todo: Todo | undefined;
    $: todo = $store.todos.find((todo) => todo.id === $page.params.id);
</script>

<svelte:head>
    <title>Edit | TodoApp</title>
</svelte:head>

<div>
    <h3 class="text-xl font-medium">Edit Todo</h3>
    {#if todo}
        <form on:submit={onSubmit} method="POST" class="space-y-4 flex flex-col items-end">
            <fieldset class="flex flex-col w-full">
                <textarea
                    name="body"
                    id="body"
                    class="resize-y ring-1 ring-gray-800 rounded focus:outline-none focus:ring-indigo-600 focus:ring-2 ring-inset p-2"
                    cols="30"
                    rows="10"
                    bind:value={todo.text}
                />
            </fieldset>

            <div>
                <button
                    class="px-4 bg-red-500 text-white py-2 rounded"
                    on:click={() => goto('/')}
                    type="button">Cancel</button
                >

                <button
                    class="px-4 bg-gray-800 text-indigo-200 py-2 rounded"
                    type="submit"
                    on:click={() => store.updatedTodo(todo)}
                >
                    Update
                </button>
            </div>
        </form>
    {:else}
        <div class="min-h-[15rem] w-full grid place-items-center">
            <Loading isLoading className="w-10 h-10 text-indigo-400" />
        </div>
    {/if}
</div>
