"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, Info, Loader2, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/use-get-data";
import { usePatchData } from "@/hooks/use-patch-data";
import { useUploadData } from "@/hooks/use-upload-data";
import { PLACEHOLDER_IMAGE } from "@/config/const";

const ROLES = ["ADMIN", "STAFF", "USER"] as const;

const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  role: z.enum(ROLES, { message: "Please select a valid role." }),
  avatarUrl: z.string().optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormUpdateProps {
  userId: string;
}

function normalizeRole(input?: string): (typeof ROLES)[number] {
  const val = (input ?? "USER").toString().toUpperCase();
  const cast = val as (typeof ROLES)[number];
  return ROLES.includes(cast) ? cast : "USER";
}

export function UserFormUpdate({ userId }: UserFormUpdateProps) {
  const router = useRouter();

  const { data: user, isLoading: isLoadingUser } = useGetData<{
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF" | "USER";
    avatarUrl?: string;
  }>(["users", userId], `/users/${userId}`, undefined, {
    enabled: !!userId,
  });

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      role: "USER",
      avatarUrl: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user?.name || "",
        role: normalizeRole(user?.role),
        avatarUrl: user?.avatarUrl || PLACEHOLDER_IMAGE,
      });
    }
  }, [user]);

  const { mutate: uploadImage, isPending: isUploading } = useUploadData<{
    url: string;
  }>("/uploads/image", [], {
    onSuccess: (data) => {
      form.setValue("avatarUrl", data.url, { shouldDirty: true });
      toast.success("Image uploaded successfully");
    },
    onError: () => {
      toast.error("Failed to upload image");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadImage(formData);
    }
  };

  const handleRemoveImage = () => {
    form.setValue("avatarUrl", PLACEHOLDER_IMAGE, { shouldDirty: true });
    toast.info("Avatar reset to default");
  };

  const { mutate: updateUser, isPending: isSaving } = usePatchData<
    any,
    UserFormValues
  >("/users", [["users"], ["users", userId]], {
    onSuccess: () => {
      toast.success("User updated successfully");
      router.push("/dashboard/users");
    },
  });

  const onSubmit = (data: UserFormValues) => {
    updateUser({ id: userId, data });
  };

  if (isLoadingUser) {
    return (
      <Card className="border-slate-200 dark:border-zinc-800 w-full">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-40" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm rounded-2xl w-full">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
        <CardDescription>
          Make changes to the user profile here. Email is read-only.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border rounded-xl bg-slate-50/50 dark:bg-zinc-900/50 transition-colors">
              <div className="relative group shrink-0">
                <Avatar className="h-24 w-24 sm:h-20 sm:w-20 border-2 border-slate-200 dark:border-zinc-700 shadow-sm">
                  <AvatarImage
                    src={form.watch("avatarUrl")}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-xl font-bold bg-slate-200 dark:bg-zinc-800">
                    {user?.name?.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer text-white hover:bg-black/50"
                >
                  {isUploading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <Camera className="h-6 w-6" />
                  )}
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isUploading || isSaving}
                />
              </div>

              <div className="flex flex-col gap-3 text-center sm:text-left w-full">
                <div>
                  <h3 className="font-semibold text-foreground">
                    Profile Picture
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Supports JPG, PNG. Max size 5MB.
                  </p>
                </div>

                {form.watch("avatarUrl") !== PLACEHOLDER_IMAGE && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-fit h-9 px-3 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900/30 gap-2 transition-colors"
                    onClick={handleRemoveImage}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Reset to Default
                  </Button>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    value={user?.email}
                    disabled
                    className="bg-slate-100 dark:bg-zinc-900/50 opacity-100 text-muted-foreground cursor-not-allowed border-slate-200 dark:border-zinc-800"
                  />
                </FormControl>
              </FormItem>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 space-y-3">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => {
                    const value = (field.value ?? "USER") as string;
                    return (
                      <FormItem>
                        <FormLabel>Role & Permissions</FormLabel>
                        <Select
                          key={field.value}
                          value={value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full bg-background">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USER">User</SelectItem>
                            <SelectItem value="STAFF">Staff</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertTitle className="text-blue-700 dark:text-blue-300 font-semibold mb-2">
                    Access Level Guide
                  </AlertTitle>
                  <AlertDescription className="text-blue-600 dark:text-blue-300/90 text-xs leading-relaxed">
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <span className="font-bold">Admin:</span> Full system
                        access, user management, and critical settings.
                      </li>
                      <li>
                        <span className="font-bold">Staff:</span> Can manage
                        customer data, campaigns, and view analytics.
                      </li>
                      <li>
                        <span className="font-bold">User:</span> Read-only
                        access to public dashboard data.
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-slate-100 dark:border-zinc-900">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => router.back()}
                disabled={isSaving || isUploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving || isUploading}
                className="w-full sm:w-auto"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
