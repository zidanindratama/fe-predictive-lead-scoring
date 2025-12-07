"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePostData } from "@/hooks/use-post-data";

const resetPasswordSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    otp: z.string().min(6, { message: "OTP must be 6 characters" }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
type ResetPasswordPayload = Omit<ResetPasswordValues, "confirmPassword">;

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailFromQuery = searchParams.get("email") || "";

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: emailFromQuery,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (emailFromQuery) {
      form.setValue("email", emailFromQuery);
    }
  }, [emailFromQuery, form]);

  const { mutate: resetPassword, isPending } = usePostData<
    any,
    ResetPasswordPayload
  >("/auth/reset-password", [], {
    onSuccess: () => {
      toast.success("Password reset successfully! Please login.");
      router.push("/auth/sign-in");
    },
  });

  const { mutate: resendOtp, isPending: isResending } = usePostData<
    any,
    { email: string }
  >("/auth/forgot-password", [], {
    onSuccess: () => {
      toast.success("New OTP sent to your email!");
    },
  });

  const onSubmit = (values: ResetPasswordValues) => {
    const { confirmPassword, ...payload } = values;
    resetPassword(payload);
  };

  const handleResendOtp = () => {
    if (!emailFromQuery) return;
    resendOtp({ email: emailFromQuery });
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-background">
      <div className="hidden lg:flex relative flex-col justify-between p-12 bg-[#050505] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 z-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <Link href={"/"} className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl tracking-tight">SmartBank</span>
          </Link>
        </div>
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold tracking-tighter leading-tight mb-6">
            Secure your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-400">
              Digital Future.
            </span>
          </h2>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-teal-500/20 rounded-lg text-teal-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Security Check</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Please enter the OTP sent to your email and choose a strong
                  new password to restore access to your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 text-xs text-zinc-600">
          © 2025 SmartBank Inc. All rights reserved.
        </div>
      </div>

      <div className="relative flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
              <KeyRound className="w-3 h-3" />
              Set new password
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              New Credentials
            </h1>
            <p className="text-muted-foreground">
              Check your email for the OTP code
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input {...field} type="hidden" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-sm font-medium leading-none">
                          OTP Code
                        </FormLabel>

                        {emailFromQuery && (
                          <Button
                            type="button"
                            variant="link"
                            size="sm"
                            onClick={handleResendOtp}
                            disabled={isResending || isPending}
                            className="h-auto p-0 text-xs font-normal text-primary hover:no-underline"
                          >
                            {isResending ? (
                              <>
                                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <span className="flex items-center gap-1 hover:underline">
                                <RefreshCw className="h-3 w-3" />
                                Resend OTP
                              </span>
                            )}
                          </Button>
                        )}
                      </div>

                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          {...field}
                          disabled={isPending}
                          containerClassName="w-full gap-4"
                        >
                          <InputOTPGroup className="flex-1">
                            <InputOTPSlot
                              index={0}
                              className="w-full h-12 text-lg"
                            />
                            <InputOTPSlot
                              index={1}
                              className="w-full h-12 text-lg"
                            />
                            <InputOTPSlot
                              index={2}
                              className="w-full h-12 text-lg"
                            />
                          </InputOTPGroup>

                          <InputOTPSeparator />

                          <InputOTPGroup className="flex-1">
                            <InputOTPSlot
                              index={3}
                              className="w-full h-12 text-lg"
                            />
                            <InputOTPSlot
                              index={4}
                              className="w-full h-12 text-lg"
                            />
                            <InputOTPSlot
                              index={5}
                              className="w-full h-12 text-lg"
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium leading-none">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10 h-12 bg-secondary/20 border-transparent focus:border-primary/50 focus:bg-background transition-all"
                            disabled={isPending}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                            disabled={isPending}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium leading-none">
                        Confirm New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10 h-12 bg-secondary/20 border-transparent focus:border-primary/50 focus:bg-background transition-all"
                            disabled={isPending}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                            disabled={isPending}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 text-base rounded-xl group bg-primary hover:bg-primary/90"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-sm text-muted-foreground"
          >
            Back to{" "}
            <Link
              href="/auth/sign-in"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
