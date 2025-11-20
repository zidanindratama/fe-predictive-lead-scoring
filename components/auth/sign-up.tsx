"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  Sparkles,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

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
import { setAccessToken } from "@/lib/axios";

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: register, isPending } = usePostData<
    { user: any; accessToken: string },
    Omit<RegisterFormValues, "confirmPassword">
  >("/auth/register", [], {
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    const { confirmPassword, ...payload } = values;
    register(payload);
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

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
            Join the financial <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500">
              revolution.
            </span>
          </h2>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <p className="text-lg text-zinc-300 italic mb-4">
              "SmartBank's AI prediction engine transformed our lead generation
              process entirely. It's not just a tool; it's a competitive
              advantage."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-blue-500" />
              <div>
                <p className="font-semibold text-sm">Elena Rodriguez</p>
                <p className="text-xs text-zinc-500">CTO at FinCorp Global</p>
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
              <Sparkles className="w-3 h-3" />
              Start your successful prediction
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Create an account
            </h1>
            <p className="text-muted-foreground">
              Enter your details below to create your account
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium leading-none">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="John Doe"
                            className="pl-10 h-12 bg-secondary/20 border-transparent focus:border-primary/50 focus:bg-background transition-all"
                            disabled={isPending}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium leading-none">
                        Password
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
                        Confirm Password
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
                      Create Account
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
            Already have an account?{" "}
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

export default SignUp;
