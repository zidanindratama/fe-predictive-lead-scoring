import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosResponse } from "axios";

interface ExportParams {
  url: string;
  format: "csv" | "xlsx";
  filename?: string; 
}

export const useExportData = () => {
  return useMutation({
    mutationFn: async ({ url, format, filename }: ExportParams) => {
      const response: AxiosResponse = await axiosInstance.get(url, {
        responseType: "blob",
      });

      let finalFilename = filename || `export.${format}`;
      
      if (!filename) {
        const contentDisposition = response.headers["content-disposition"];
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
          if (filenameMatch && filenameMatch[1]) {
            finalFilename = filenameMatch[1];
          }
        }
      }

      const href = window.URL.createObjectURL(new Blob([response.data]));
      
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", finalFilename);
      document.body.appendChild(link);
      
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(href);

      return true;
    },
    onSuccess: () => {
      toast.success("Export started successfully");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Export error:", error);
      toast.error(
        error?.response?.data?.message || 
        "Failed to export data. Please check your permissions."
      );
    },
  });
};