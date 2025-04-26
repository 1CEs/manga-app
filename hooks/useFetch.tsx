import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | AxiosError | null;
    refetch: () => Promise<void>;
}

export function useFetch<T>(url: string, config?: AxiosRequestConfig): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | AxiosError | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios(url, {
                ...config,
            });
            setData(response.data);
        } catch (err) {
            setError(err as Error | AxiosError);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    const refetch = async () => {
        await fetchData();
    };

    return { data, loading, error, refetch };
}
