import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const usePostData = <T, D, TContext = unknown>(
  url: string,
  invalidateKeys: string[][] = [],
  options?: UseMutationOptions<T, Error, D, TContext>
) => {
  const queryClient = useQueryClient();

  return useMutation<T, Error, D, TContext>({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post(url, payload);
      return data.data;
    },
    onSuccess: (...args) => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      toast.success("Data created successfully");

      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
    onError: (...args) => {
      const error = args[0];
      const errorMessage =
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
        error.message ||
        "Failed to create data";

      toast.error(errorMessage);

      if (options?.onError) {
        options.onError(...args);
      }
    },
    ...options,
  });
};
