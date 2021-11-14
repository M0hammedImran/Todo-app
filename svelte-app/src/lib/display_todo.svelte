<script lang="ts">
    import type { Todo } from './query';

    import TickIcon from './tick_icon.svelte';
    export let Todos: Todo[];
    export let isLoading;
    export let error;
    export let refetch;

    async function onSetComplete(id: string, completed: boolean) {
        const res = await fetch(`http://localhost:5555/todo/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ completed }),
            headers: {
                'content-type': 'application/json',
            },
        });

        if (res.ok) {
            refetch();
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
                <div class="w-full bg-gray-800 rounded flex p-4 h-14 items-center">
                    <label for={todo.id} class="relative inline-block mr-6">
                        <input
                            checked={todo.completed}
                            class="invisible"
                            type="checkbox"
                            id={todo.id}
                            on:click={() => onSetComplete(todo.id, !todo.completed)}
                        />
                        <TickIcon
                            className={`${
                                todo.completed ? 'text-indigo-400' : 'text-red-400'
                            } flex-shrink-0 mr-4 absolute top-0 left-0`}
                        />
                    </label>

                    <a href="/todo/{todo.id}" class="title-font text-white">{todo.text}</a>
                </div>
            </li>
        {/each}
    </ul>
{/if}
