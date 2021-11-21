<script lang="ts">
    export let className = 'text-indigo-400';
    export let isLoading: boolean = false;
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 {isLoading ? 'animate-spin' : ''} {className ? className : ''}"
    viewBox="0 0 32 32"
    stroke="currentColor"
    fill="currentColor"
>
    <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M29.89 15.81a2.51 2.51 0 1 0-5 .45 9.65 9.65 0 0 1-1.68 6.34 10.24 10.24 0 0 1-5.74 4 10.71 10.71 0 0 1-7.38-.7 11.44 11.44 0 0 1-5.48-5.62A12.07 12.07 0 0 0 9.46 27a12.58 12.58 0 0 0 8.44 2 13.31 13.31 0 0 0 8.18-4 14 14 0 0 0 3.81-8.75v-.08a2.29 2.29 0 0 0 0-.36zm-22.78-.07A9.65 9.65 0 0 1 8.79 9.4a10.24 10.24 0 0 1 5.74-4 10.71 10.71 0 0 1 7.38.7 11.44 11.44 0 0 1 5.48 5.62A12.07 12.07 0 0 0 22.54 5a12.58 12.58 0 0 0-8.44-2 13.31 13.31 0 0 0-8.18 4 14 14 0 0 0-3.81 8.75v.08a2.29 2.29 0 0 0 0 .37 2.51 2.51 0 1 0 5-.45z"
        data-name="Looding"
    />
</svg>
