<script>
    import { goto } from '$app/navigation';

    let text;

    const addTodo = async () => {
        const res = await fetch('http://localhost:5555/todo', {
            method: 'POST',
            body: JSON.stringify({ text }),
            headers: {
                'content-type': 'application/json',
            },
        });
        if (res.ok) {
            goto('/');
        }
    };
</script>

<svelte:head>
    <title>Add Todo | TodoApp</title>
</svelte:head>

<div class="w-full mx-auto max-w-2xl bg-gray-100 rounded-md p-8 flex flex-col">
    <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Add Todo</h2>
    <div class="relative mb-4">
        <label for="full-name" class="leading-7 text-sm text-gray-600">Enter Text</label>
        <textarea
            bind:value={text}
            type="text"
            id="full-name"
            name="full-name"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
    </div>

    <button
        class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg font-medium"
        on:click={addTodo}>Add</button
    >
</div>
