import { useState, useEffect, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApi<T>(
  apiCall: (() => Promise<{ data: T; success: boolean; message?: string }>) | Promise<{ data: T; success: boolean; message?: string }>,
  options: UseApiOptions = {}
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: options.immediate !== false,
    error: null
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = typeof apiCall === 'function' ? await apiCall() : await apiCall;
      
      if (response.success) {
        setState({
          data: response.data,
          loading: false,
          error: null
        });
        
        if (options.onSuccess) {
          options.onSuccess(response.data);
        }
      } else {
        throw new Error(response.message || 'API call failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      setState({
        data: null,
        loading: false,
        error: errorMessage
      });
      
      if (options.onError) {
        options.onError(errorMessage);
      }
    }
  }, []);

  useEffect(() => {
    if (options.immediate !== false) {
      execute();
    }
  }, [execute]);

  const refetch = useCallback(() => {
    execute();
  }, [execute]);

  return {
    ...state,
    execute,
    refetch
  };
}

export function useMutation<T, P = any>(
  apiCall: (params: P) => Promise<{ data: T; success: boolean; message?: string }>
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const mutate = useCallback(async (params: P) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiCall(params);
      
      if (response.success) {
        setState({
          data: response.data,
          loading: false,
          error: null
        });
        
        return response;
      } else {
        throw new Error(response.message || 'Mutation failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      setState({
        data: null,
        loading: false,
        error: errorMessage
      });
      
      throw error;
    }
  }, [apiCall]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null
    });
  }, []);

  return {
    ...state,
    mutate,
    reset
  };
}