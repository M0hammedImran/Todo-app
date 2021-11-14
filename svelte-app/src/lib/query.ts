import type {
    QueryClient,
    QueryObserverOptions,
    QueryObserverResult,
    RefetchQueryFilters,
    RefetchOptions,
    QueryStatus,
} from 'react-query/core';
import { QueryObserver } from 'react-query/core';
import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { getContext } from 'svelte';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface QueryState<TData = any, TError = any> {
    data: TData | undefined;
    dataUpdatedAt?: number;
    error: TError | null;
    errorUpdatedAt?: number;
    failureCount: number;
    isError: boolean;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isLoadingError: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetchError: boolean;
    isRefetching: boolean;
    isStale: boolean;
    isSuccess: boolean;
    refetch: <TPageData>(
        options?: RefetchOptions & RefetchQueryFilters<TPageData>,
    ) => Promise<QueryObserverResult<TData, TError>>;
    remove: () => void;
    status: QueryStatus;
}

const initialState: QueryState = {
    status: 'loading',
    data: undefined,
    failureCount: 0,
    error: null,
    isError: false,
    isFetching: true,
    isFetched: false,
    isRefetching: false,
    isSuccess: false,
    isIdle: false,
    isFetchedAfterMount: false,
    isLoadingError: false,
    isPlaceholderData: false,
    isPreviousData: false,
    isRefetchError: false,
    isStale: false,
    isLoading: true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    refetch: async (_options) => {
        return {} as QueryObserverResult<any, any>;
    },
    remove: () => {
        return;
    },
};

export const useQuery = <Tdata = undefined | Record<any, any>, TError = any>(
    queryKey: string | string[],
    queryFn: () => Promise<void>,
    options?: QueryObserverOptions,
): Readable<QueryState<Tdata, TError>> => {
    const queryClient = getContext<QueryClient>('queryClient');

    const observer = new QueryObserver(queryClient, {
        queryKey,
        queryFn,
        ...options,
    });

    return readable(initialState, (set) => {
        const unsubscribe = observer.subscribe((result) => {
            set(result as QueryState<Tdata, TError>);
        });

        return unsubscribe;
    });
};
