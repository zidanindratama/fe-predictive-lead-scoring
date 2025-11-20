"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, Loader2, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
      const initial = {
        name: user.name ?? "",
        role: normalizeRole(user.role),
        avatarUrl: user.avatarUrl || PLACEHOLDER_IMAGE,
      };
      form.reset(initial);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-row items-center gap-6 p-4 border rounded-xl bg-slate-50/50 dark:bg-zinc-900/50">
              <div className="relative group">
                <Avatar className="h-20 w-20 border-2 border-slate-200 dark:border-zinc-700">
                  <AvatarImage src={form.watch("avatarUrl")} />
                  <AvatarFallback className="text-lg">
                    {user?.name?.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
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
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="font-medium text-sm">Profile Picture</h3>
                  <p className="text-xs text-muted-foreground max-w-[200px]">
                    Click the image to upload. Supported formats: JPG, PNG.
                  </p>
                </div>
                {form.watch("avatarUrl") !== PLACEHOLDER_IMAGE && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-fit h-8 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900/30"
                    onClick={handleRemoveImage}
                  >
                    <Trash2 className="mr-2 h-3 w-3" />
                    Reset to default
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
                    className="bg-slate-100 dark:bg-zinc-900 opacity-70 cursor-not-allowed border-slate-200 dark:border-zinc-800"
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

              <FormItem className="md:col-span-2">
                <FormLabel>Role & Permissions</FormLabel>
                <Controller
                  control={form.control}
                  name="role"
                  render={({ field }) => {
                    return (
                      <Select
                        key={field.value}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USER">User</SelectItem>
                          <SelectItem value="STAFF">Staff</SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
                <FormDescription>
                  Controls access level: Admin (Full), Staff (Manage Data), User
                  (Read Only).
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 dark:border-zinc-900 mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                disabled={isSaving || isUploading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving || isUploading}>
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
