import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const usePatchData = <T, D, TContext = unknown>(
  url: string,
  invalidateKeys: string[][] = [],
  options?: UseMutationOptions<T, Error, { id?: string; data: D }, TContext>
) => {
  const queryClient = useQueryClient();

  return useMutation<T, Error, { id?: string; data: D }, TContext>({
    mutationFn: async ({ id, data: payload }) => {
      const finalUrl = id ? `${url}/${id}` : url;
      const { data } = await axiosInstance.patch(finalUrl, payload);
      return data.data;
    },
    onSuccess: (...args) => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      toast.success("Data updated successfully");

      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
    onError: (...args) => {
      const error = args[0];
      const errorMessage =
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
        error.message ||
        "Failed to update data";

      toast.error(errorMessage);

      if (options?.onError) {
        options.onError(...args);
      }
    },
    ...options,
  });
};
