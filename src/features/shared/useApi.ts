import axios, { AxiosError } from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { GlobalContext } from './Context';
import { useTranslation } from 'react-i18next';

const useApi = (
  route: string,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  enabled: boolean = true,
  body?: any,
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

  const { data, isLoading, isError, refetch, isSuccess } = useQuery(
    [route, {}],
    fetchData,
    {
      enabled,
      retry: false,
      cacheTime: 0,
      refetchOnWindowFocus: false,
    },
  );

  return { data, isSuccess, isLoading, isError, refetch };
};

export default useApi;
