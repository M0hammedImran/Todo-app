<script lang="ts">
    import type {
        QueryObserverResult,
        RefetchOptions,
        RefetchQueryFilters,
    } from 'react-query/types/core';
    import Loading from './loading.svelte';
    import TickIcon from './tick_icon.svelte';
    import XIcon from './x_icon.svelte';

    import type { Todo } from './query';

    export let Todos: Todo[];
    export let isLoading: boolean;
    let isMutating: boolean;
    let mutationId = '';
    export let error: Error | null;
    type refetch = () => Promise<void>;
    export let refetch: refetch;

    async function onSetComplete(id: string, completed: boolean) {
        try {
            isMutating = true;
            mutationId = id;
            const res = await fetch(`http://localhost:5555/todo/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ completed }),
                headers: {
                    'content-type': 'application/json',
                },
            });

            if (res.ok) {
                await refetch();
            }
        } catch (error) {
            console.log(error);
        } finally {
            isMutating = false;
            mutationId = '';
        }
    }
</script>

{#if isLoading}
    <p>Loading...</p>
{:else if error}
    <p>Error fetching data</p>
{:else}
    <ul class="sm:mx-auto sm:mb-2 space-y-2">
        {#each Todos as todo}
            <li class="w-full">
                <div class="w-full bg-gray-800 rounded flex p-4 h-14 items-center relative">
                    <label for={todo.id} class="relative inline-block mr-6">
                        <input
                            checked={todo.completed}
                            class="invisible"
                            type="checkbox"
                            id={todo.id}
                            on:click={() => onSetComplete(todo.id, !todo.completed)}
                        />
                        <span class="flex-shrink-0 mr-4 absolute top-0 left-0">
                            {#if todo.completed}
                                <TickIcon className="text-indigo-400 " />
                            {:else}
                                <XIcon className={'text-red-400'} />
                            {/if}
                        </span>
                    </label>

                    <a href="/todo/{todo.id}" class="title-font text-white">{todo.text}</a>

                    {#if isMutating && mutationId === todo.id}
                        <div class="ml-4 absolute top-1/2 -translate-y-1/2 right-4">
                            <Loading isLoading={isMutating} />
                        </div>
                    {/if}
                </div>
            </li>
        {/each}
    </ul>
{/if}
