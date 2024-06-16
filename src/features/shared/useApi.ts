import axios, { AxiosError } from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { GlobalContext } from './Context';
import { useTranslation } from 'react-i18next';
import { CONTEXT_ROUTE, LOGIN_ROUTE } from './RoutesURL';

const useApi = <T>(
  route: string,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  enabled: boolean = true,
  body?: any,
  params?: any,
) => {
  const { setApiError } = useContext(GlobalContext);
  const { t } = useTranslation();

  const fetchData = async () => {
    try {
      const response = await axios(route, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        data: body,
        params,
        timeout: 3e4,
        timeoutErrorMessage: t('shared.TIMEOUT_MESSAGE'),
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        setApiError({
          isError: true,
          errorMessage: axiosError.response
            ? axiosError.response.data
            : axiosError.message,
        });
      }

      console.error('Error fetching data:', error);
      throw new Error('Failed to fetch' + error);
    }
  };

  const { data, isLoading, isError, refetch, remove, isSuccess, isFetching } =
    useQuery<T>([`${route}-${method}`, { params }], fetchData, {
      enabled,
      retry: false,
      cacheTime: route === LOGIN_ROUTE || route === CONTEXT_ROUTE ? 0 : 3e5,
      staleTime: 0,
      refetchOnWindowFocus: false,
    });

  return {
    data,
    isSuccess,
    isLoading: isLoading || isFetching,
    isError,
    remove,
    refetch,
  };
};

export default useApi;
