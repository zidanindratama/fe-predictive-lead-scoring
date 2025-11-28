"use client";

import {
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
  User,
  ChevronsUpDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useGetData } from "@/hooks/use-get-data";
import { axiosInstance, setAccessToken } from "@/lib/axios";
import Link from "next/link";

interface UserNavProps {
  isCollapsed?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export function UserNav({
  isCollapsed = false,
  side = "top",
  align = "center",
}: UserNavProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user } = useGetData<UserProfile>(["me"], "/auth/me");

  const handleLogout = async () => {
    try {
      await axiosInstance.delete("/auth/logout");

      setAccessToken(null);

      queryClient.setQueryData(["me"], null);

      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to log out");
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full h-auto p-2 hover:bg-white/5 rounded-xl transition-all duration-200 group",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 p-0.5">
              <div className="h-full w-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-bold text-xs text-white">
                    {initials}
                  </span>
                )}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#09090b]" />
          </div>

          {!isCollapsed && (
            <div className="flex flex-col items-start ml-3 text-left flex-1 overflow-hidden">
              <span className="text-sm font-semibold text-white truncate w-full">
                {user?.name || "Loading..."}
              </span>
              <span className="text-[10px] text-white/40 font-medium truncate w-full">
                {user?.email || "..."}
              </span>
            </div>
          )}

          {!isCollapsed && (
            <ChevronsUpDown className="h-4 w-4 text-white/20 ml-2 group-hover:text-white/60" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 rounded-2xl bg-[#1c1c1e] border-white/10 text-white p-2 mb-2"
        side={side}
        align={align}
        sideOffset={isCollapsed ? 20 : 10}
      >
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name || "User"}
            </p>
            <p className="text-xs leading-none text-white/50">
              {user?.email || "user@smartbank.ai"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/dashboard/my-account")}
            className="group flex items-center gap-2 p-2 text-muted-foreground hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-lg cursor-pointer transition-colors mt-1"
          >
            <div className="p-1.5 rounded-md bg-orange-100/50 dark:bg-orange-900/20 group-hover:bg-orange-200/50 dark:group-hover:bg-orange-900/40 transition-colors">
              <User className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="font-medium">Account</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-white/10" />
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
  );
}
