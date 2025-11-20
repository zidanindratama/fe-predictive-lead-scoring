import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useDeleteData = <T, TContext = unknown>(
  url: string,
  invalidateKeys: string[][] = [],
  options?: UseMutationOptions<T, Error, string, TContext>
) => {
  const queryClient = useQueryClient();

  return useMutation<T, Error, string, TContext>({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.delete(`${url}/${id}`);
      return data.data;
    },
    onSuccess: (...args) => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      toast.success("Data deleted successfully");

      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
    onError: (...args) => {
      const error = args[0];
      const errorMessage =
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
        error.message ||
        "Failed to delete data";

      toast.error(errorMessage);

      if (options?.onError) {
        options.onError(...args);
      }
    },
    ...options,
  });
};
