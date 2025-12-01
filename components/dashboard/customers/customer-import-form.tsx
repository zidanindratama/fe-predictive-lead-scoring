"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileSpreadsheet,
  Loader2,
  Info,
  FileText,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useUploadData } from "@/hooks/use-upload-data";

export function CustomerImportForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorReport, setErrorReport] = useState<string[] | null>(null);

  const { mutate: uploadFile, isPending: isUploading } = useUploadData(
    "/customers/import",
    [["customers"]],
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (data: any) => {
        const count = data?.imported || "multiple";
        toast.success(`Successfully imported ${count} customers`);
        router.push("/dashboard/customers");
        setErrorReport(null);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        const responseData = error.response?.data;
        let details: string[] = [];

        if (Array.isArray(responseData?.message)) {
          details = responseData.message;
        } else if (Array.isArray(responseData?.errors)) {
          details = responseData.errors;
        } else if (typeof responseData?.message === "string") {
          details = [responseData.message];
        } else {
          details = [
            "An unexpected error occurred during import. Please check your file format.",
          ];
        }

        setErrorReport(details);
      },
    }
  );

  const clearState = () => {
    setFile(null);
    setErrorReport(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrorReport(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
        "application/vnd.ms-excel",
      ];

      const hasValidExtension =
        droppedFile.name.endsWith(".csv") || droppedFile.name.endsWith(".xlsx");

      if (validTypes.includes(droppedFile.type) || hasValidExtension) {
        setFile(droppedFile);
        setErrorReport(null);
      } else {
        toast.error("Invalid file type. Please upload CSV or XLSX.");
      }
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setErrorReport(null);
    const formData = new FormData();
    formData.append("file", file);
    uploadFile(formData);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => router.back()}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!file || isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Importing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Start Import
              </>
            )}
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Instructions
            </h3>
            <p className="text-sm text-muted-foreground">
              Bulk import allows you to add multiple customers efficiently.
              Please ensure your data follows the required format.
            </p>
          </div>

          <Alert className="bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950/30 dark:text-blue-200 dark:border-blue-900">
            <Info className="h-4 w-4" />
            <AlertTitle>File Requirements</AlertTitle>
            <AlertDescription className="text-xs mt-2 space-y-1.5">
              <p>
                • <strong>Format:</strong> .csv or .xlsx
              </p>
              <p>
                • <strong>Max Size:</strong> 10MB
              </p>
              <p>
                • <strong>Required Columns:</strong> name, age, job, marital,
                education, default, housing, loan
              </p>
            </AlertDescription>
          </Alert>
        </div>

        <div className="md:col-span-2 space-y-4">
          <Card
            className={errorReport ? "border-red-200 dark:border-red-900" : ""}
          >
            <CardHeader>
              <CardTitle>Upload Data</CardTitle>
              <CardDescription>
                Drag and drop your file here or click to browse.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`
                    border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ease-in-out
                    ${
                      isDragOver
                        ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 scale-[1.01]"
                        : "border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900/50 hover:border-slate-300 dark:hover:border-zinc-700"
                    }
                  `}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() =>
                  document.getElementById("file-upload-page")?.click()
                }
              >
                <input
                  id="file-upload-page"
                  type="file"
                  accept=".csv, .xlsx"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {file ? (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="h-16 w-16 bg-blue-100 text-blue-600 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <FileSpreadsheet className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearState();
                      }}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="h-12 w-12 bg-slate-100 text-slate-500 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        CSV or Excel files (Max 10MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {errorReport && (
            <Alert
              variant="destructive"
              className="animate-in fade-in slide-in-from-top-2 border-red-200 bg-red-50 text-red-900 dark:bg-red-950/20 dark:border-red-900 dark:text-red-200"
            >
              <XCircle className="h-4 w-4" />
              <AlertTitle>Import Failed</AlertTitle>
              <AlertDescription className="mt-3">
                <p className="mb-2 font-medium text-xs uppercase tracking-wider">
                  Error Details:
                </p>
                <ul className="list-disc pl-5 space-y-1 max-h-[150px] overflow-y-auto text-xs bg-white/50 dark:bg-black/20 p-2 rounded-md border border-red-100 dark:border-red-900/50">
                  {errorReport.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
