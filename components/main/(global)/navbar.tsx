"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Loader2,
  ChevronRight,
  User,
  Sparkles,
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
import { Badge } from "@/components/ui/badge";

import { useGetData } from "@/hooks/use-get-data";
import { axiosInstance, getAccessToken, setAccessToken } from "@/lib/axios";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About Us", href: "/about-us" },
  { name: "Workflow", href: "/workflow" },
  { name: "Features", href: "/features" },
  { name: "Tour", href: "/tour" },
  { name: "Documentation", href: "/documentation" },
  { name: "Contact", href: "/contact" },
];

const menuVariants: Variants = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: "100vh",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  animate: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    setHasToken(!!token);
  }, []);

  const { data: apiUser, isLoading } = useGetData<{
    name: string;
    email: string;
    avatarUrl?: string;
    role: string;
  }>(["me"], "/auth/me", undefined, {
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: hasToken,
  });

  const user = hasToken ? apiUser : null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.delete("/auth/logout");
      setAccessToken(null);
      setHasToken(false);
      toast.success("Logged out successfully");
      window.location.href = "/";
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
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled || isOpen
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
            : "bg-transparent border-b border-transparent py-2"
        )}
      >
        <div className="container mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 z-50 relative group"
          >
            <div className="relative">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                <span className="text-primary-foreground font-bold text-lg">
                  S
                </span>
              </div>
              <div className="absolute -inset-1 bg-primary/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">
              SmartBank
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 relative p-1 rounded-full bg-secondary/30 border border-white/5 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200 z-10",
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {hoveredPath === link.href && !isActive && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-muted/50 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 shadow-sm rounded-full -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />

            {isLoading && !user ? (
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
                <DropdownMenuContent
                  className="w-56 p-2"
                  align="end"
                  forceMount
                >
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
                    onClick={() => router.push("/dashboard/my-account")}
                    className="group flex items-center gap-2 p-2 text-muted-foreground hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-lg cursor-pointer transition-colors mt-1"
                  >
                    <div className="p-1.5 rounded-md bg-orange-100/50 dark:bg-orange-900/20 group-hover:bg-orange-200/50 dark:group-hover:bg-orange-900/40 transition-colors">
                      <User className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="font-medium">Account</span>
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
                    className="text-muted-foreground hover:text-foreground font-medium hover:bg-secondary/50"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95">
                    <Sparkles className="w-4 h-4 mr-2 fill-current" />
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 md:hidden z-50">
            <ModeToggle />
            <button
              className="p-2 text-foreground hover:bg-secondary/50 rounded-full transition-colors relative z-50"
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
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col pt-28 px-6 pb-8 md:hidden"
            >
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col gap-4 flex-1"
              >
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Navigation
                </p>
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div key={link.name} variants={itemVariants}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "group flex items-center justify-between text-3xl font-bold tracking-tight transition-all",
                          isActive
                            ? "text-primary pl-4 border-l-4 border-primary"
                            : "text-foreground/60 hover:text-foreground"
                        )}
                      >
                        {link.name}
                        {isActive && (
                          <ChevronRight className="w-6 h-6 animate-pulse" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-auto pt-8 border-t border-border/50"
              >
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border border-border/50">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        {user.role}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => router.push("/dashboard")}
                        className="w-full h-12 rounded-xl"
                      >
                        Dashboard
                      </Button>
                      <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="w-full h-12 rounded-xl"
                      >
                        Logout
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
      </motion.nav>
    </>
  );
};
