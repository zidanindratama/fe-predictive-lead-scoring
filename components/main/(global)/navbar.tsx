"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Menu,
  X,
  LogOut,
  Settings,
  LayoutDashboard,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useGetData } from "@/hooks/use-get-data";
import { axiosInstance, getAccessToken, setAccessToken } from "@/lib/axios";

const navLinks = [
  { name: "About Us", href: "/about-us" },
  { name: "Workflow", href: "/workflow" },
  { name: "Contact", href: "/contact" },
];

const menuVariants: Variants = {
  initial: {
    opacity: 0,
    y: "-100%",
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: apiUser,
    isLoading,
    refetch,
  } = useGetData<{
    name: string;
    email: string;
    avatarUrl?: string;
    role: string;
  }>(["me"], "/auth/me", undefined, {
    retry: false,
    refetchOnMount: "always",
  });

  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    setHasToken(!!token);
    refetch();
  }, [pathname, refetch]);

  const user = hasToken ? apiUser : null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.delete("/auth/logout");
      setAccessToken(null);
      setHasToken(false);
      toast.success("Logged out successfully");

      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled || isOpen
          ? "bg-background/80 backdrop-blur-xl border-border/50 shadow-sm supports-backdrop-filter:bg-background/60"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-50 relative">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-primary-foreground font-bold text-lg">S</span>
          </div>
          <span className="font-bold text-xl tracking-tight">SmartBank</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />

          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all"
                >
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />

                <DropdownMenuItem
                  onClick={() => router.push("/dashboard")}
                  className="group flex items-center gap-2 p-2 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="p-1.5 rounded-md bg-blue-100/50 dark:bg-blue-900/20 group-hover:bg-blue-200/50 dark:group-hover:bg-blue-900/40 transition-colors">
                    <LayoutDashboard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium">Dashboard</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/settings")}
                  className="group flex items-center gap-2 p-2 text-muted-foreground hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-lg cursor-pointer transition-colors mt-1"
                >
                  <div className="p-1.5 rounded-md bg-orange-100/50 dark:bg-orange-900/20 group-hover:bg-orange-200/50 dark:group-hover:bg-orange-900/40 transition-colors">
                    <Settings className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="font-medium">Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-border/50 my-1" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="group flex items-center gap-2 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="p-1.5 rounded-md bg-red-100/50 dark:bg-red-900/20 group-hover:bg-red-200/50 dark:group-hover:bg-red-900/40 transition-colors">
                    <LogOut className="h-4 w-4 text-red-600" />
                  </div>
                  <span className="font-medium">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/sign-in">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground font-medium"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 md:hidden z-50">
          <ModeToggle />
          <button
            className="p-2 text-foreground hover:bg-secondary/50 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-40 bg-background h-dvh flex flex-col pt-24 px-6 pb-8 md:hidden"
            >
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col gap-6 flex-1"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between text-3xl font-bold tracking-tight text-foreground/80 hover:text-primary transition-colors"
                    >
                      {link.name}
                      <ChevronRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-auto pt-8 border-t border-border/50"
              >
                {user ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50">
                      <Avatar className="h-14 w-14 border-2 border-primary/20">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-lg truncate">
                          {user.name}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="h-14 text-base font-medium rounded-xl border-border/50 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30 hover:border-blue-200 dark:hover:border-blue-900 transition-all"
                        onClick={() => {
                          setIsOpen(false);
                          router.push("/dashboard");
                        }}
                      >
                        <LayoutDashboard className="mr-2 h-5 w-5" />
                        Dashboard
                      </Button>
                      <Button
                        variant="outline"
                        className="h-14 text-base font-medium rounded-xl border-border/50 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950/30 hover:border-orange-200 dark:hover:border-orange-900 transition-all"
                        onClick={() => {
                          setIsOpen(false);
                          router.push("/dashboard/settings");
                        }}
                      >
                        <Settings className="mr-2 h-5 w-5" />
                        Settings
                      </Button>
                      <Button
                        variant="destructive"
                        className="h-14 text-base font-medium rounded-xl col-span-2 shadow-lg shadow-red-500/20"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-5 w-5" />
                        Log out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Button
                      className="w-full h-14 text-lg font-semibold rounded-xl shadow-xl shadow-primary/20"
                      size="lg"
                      asChild
                    >
                      <Link href={"/auth/sign-up"}>Get Started</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-14 text-lg font-semibold rounded-xl border-2 hover:bg-secondary/50"
                      size="lg"
                    >
                      <Link href={"/auth/sign-in"}>Log in</Link>
                    </Button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
