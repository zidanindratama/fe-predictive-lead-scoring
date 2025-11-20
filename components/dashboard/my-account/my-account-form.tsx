"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, Loader2, Save, Shield, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Badge } from "@/components/ui/badge";
import { useGetData } from "@/hooks/use-get-data";
import { usePatchData } from "@/hooks/use-patch-data";
import { useUploadData } from "@/hooks/use-upload-data";
import { PLACEHOLDER_IMAGE } from "@/config/const";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  avatarUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function MyAccountForm() {
  const { data: user, isLoading: isLoadingUser } = useGetData<{
    id: string;
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
  }>(["me"], "/auth/me");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      avatarUrl: PLACEHOLDER_IMAGE,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        avatarUrl: user.avatarUrl || PLACEHOLDER_IMAGE,
      });
    }
  }, [user, form]);

  const { mutate: uploadImage, isPending: isUploading } = useUploadData<{
    url: string;
  }>("/uploads/image", [], {
    onSuccess: (data) => {
      form.setValue("avatarUrl", data.url, { shouldDirty: true });
      toast.success("Avatar uploaded successfully");
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

  const { mutate: updateProfile, isPending: isSaving } = usePatchData<
    any,
    ProfileFormValues
  >("/auth/me", [["me"]], {
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile({ data });
  };

  if (isLoadingUser) {
    return (
      <Card className="border-slate-200 dark:border-zinc-800 w-full animate-in fade-in">
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
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm rounded-2xl w-full animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
        <CardDescription>
          Manage your personal account settings and preferences.
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
                  htmlFor="avatar-upload-me"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer text-white hover:bg-black/50"
                >
                  {isUploading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <Camera className="h-6 w-6" />
                  )}
                </label>
                <input
                  id="avatar-upload-me"
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

              <div className="md:col-span-2 flex flex-col gap-2">
                <span className="text-sm font-medium">Your Role</span>
                <div className="p-3 border rounded-lg bg-slate-50 dark:bg-zinc-900/50 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md text-blue-600 dark:text-blue-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user?.role}</p>
                    <p className="text-xs text-muted-foreground">
                      You have {user?.role?.toLowerCase()} access permissions.
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-auto capitalize">
                    {user?.role?.toLowerCase()}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-slate-100 dark:border-zinc-900">
              <Button
                type="submit"
                disabled={isSaving || isUploading}
                className="w-full sm:w-auto"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Profile
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
