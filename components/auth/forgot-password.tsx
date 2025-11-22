"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Loader2, ShieldQuestion } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePostData } from "@/hooks/use-post-data";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const router = useRouter();

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: sendOtp, isPending } = usePostData<any, ForgotPasswordValues>(
    "/auth/forgot-password",
    [],
    {
      onSuccess: (_, variables) => {
        toast.success("OTP sent to your email!");
        // Redirect ke reset password sambil membawa email agar user tidak perlu ketik ulang
        router.push(
          `/auth/reset-password?email=${encodeURIComponent(variables.email)}`
        );
      },
    }
  );

  const onSubmit = (values: ForgotPasswordValues) => {
    sendOtp(values);
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-background">
      <div className="hidden lg:flex relative flex-col justify-between p-12 bg-[#0a0a0a] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 z-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />

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
            Forgot your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-400">
              Password?
            </span>
          </h2>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                <ShieldQuestion className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Account Recovery</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Don't worry, it happens to the best of us. Enter your email
                  and we'll send you a secure OTP to reset your password
                  instantly.
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
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Reset Password
            </h1>
            <p className="text-muted-foreground">
              Enter your email to receive a verification code
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
                    <FormItem>
                      <FormLabel className="text-sm font-medium leading-none">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="john@company.com"
                            className="pl-10 h-12 bg-secondary/20 border-transparent focus:border-primary/50 focus:bg-background transition-all"
                            disabled={isPending}
                          />
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
                      Send OTP
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
            Remember your password?{" "}
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

export default ForgotPassword;
