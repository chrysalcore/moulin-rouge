import { useQuery, type QueryKey } from "@tanstack/react-query"
import type { ResourceStatus } from '../types'

type Resource<T> = ResourceStatus & {
    data: T[]
}

function useResource<T>(queryKey: QueryKey, queryFn: () => Promise<T[]>): Resource<T> {
    const { data, isLoading, error, refetch } = useQuery({ queryKey, queryFn })

    const handleRetry = () => {
        void refetch()
    }

    return {
        loading: isLoading,
        data: data ?? [],
        error,
        handleRetry
    }
}

export default useResource
