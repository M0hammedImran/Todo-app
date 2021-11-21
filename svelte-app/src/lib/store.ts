import { writable } from 'svelte/store';
import type { Todo } from './query';

const fetchTodos = async (): Promise<{ ok: boolean; data: Todo[] }> => {
    const todosUrl = 'http://localhost:5555/todo';
    const response = await fetch(todosUrl);
    return await response.json();
};
type UpdateTodoInput = Pick<Todo, 'id' | 'completed' | 'text'>;

const updateTodo = async ({
    id,
    ...rest
}: UpdateTodoInput): Promise<{ ok: boolean; data: Todo }> => {
    const todosUrl = 'http://localhost:5555/todo';
    const response = await fetch(`${todosUrl}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...rest }),
        headers: {
            'content-type': 'application/json',
        },
    });
    return await response.json();
};

const deleteTodo = async (id: string): Promise<{ ok: boolean }> => {
    const todosUrl = 'http://localhost:5555/todo';
    const response = await fetch(`${todosUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
    });
    return await response.json();
};

interface Store {
    todos: Todo[];
    isRefetching: boolean;
    isLoading: boolean;
    isUpdating: boolean;
    error: any | null;
}

const initialState: Store = {
    error: null,
    isLoading: false,
    isRefetching: false,
    isUpdating: false,
    todos: [],
};

function createStore() {
    const { subscribe, update } = writable<Store>(initialState);

    return {
        subscribe,
        refetch: async () => {
            update((state) => ({ ...state, isRefetching: true }));
            const todos = await fetchTodos();
            update((state) => ({ ...state, isRefetching: false, todos: todos.data }));
        },
        fetch: async () => {
            update((state) => ({ ...state, isLoading: true }));
            const todos = await fetchTodos();
            update((state) => ({ ...state, isLoading: false, todos: todos.data }));
        },
        updatedTodo: async (todo: UpdateTodoInput) => {
            update((state) => ({ ...state, isUpdating: true }));
            const data = await updateTodo(todo);
            update((state) => {
                const idx = state.todos.findIndex((t) => t.id === data.data.id);
                return {
                    ...state,
                    todos: [...state.todos.slice(0, idx), data.data, ...state.todos.slice(idx + 1)],
                    isUpdating: false,
                };
            });
        },
        deleteTodo: async (id: string) => {
            update((state) => ({ ...state, isUpdating: true }));
            const { ok } = await deleteTodo(id);
            if (!ok) {
                return update((state) => ({
                    ...state,
                    isUpdating: false,
                }));
            }
            update((state) => ({
                ...state,
                todos: state.todos.filter((t) => t.id !== id),
                isUpdating: false,
            }));
        },
    };
}

export const store = createStore();
