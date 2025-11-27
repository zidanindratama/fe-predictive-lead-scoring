import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useGetData = <T>(
  key: string[],
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">
) => {
  return useQuery<T, Error>({
    queryKey: [...key, params],
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, { params });
      return data.data;
    },
    ...options,
  });
};
