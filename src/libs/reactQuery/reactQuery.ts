import { AxiosError } from "axios";
import { QueryClient, DefaultOptions, UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export type QueryConfig<FetcherFnType extends (...args: any) => any> = UseQueryOptions<
  Awaited<ReturnType<FetcherFnType>>,
  AxiosError<any>
>;

export type MutationConfig<FetcherFnType extends (...args: any) => any> = UseMutationOptions<
  Awaited<ReturnType<FetcherFnType>>,
  AxiosError<any>,
  Parameters<FetcherFnType>[0]
>;

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
