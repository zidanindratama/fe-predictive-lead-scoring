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

  const { data: user } = useGetData<UserProfile>(["me"], "/auth/me");

  const handleLogout = async () => {
    try {
      await axiosInstance.delete("/auth/logout");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to log out");
    } finally {
      setAccessToken(null);
      router.push("/");
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
          <DropdownMenuItem className="rounded-lg focus:bg-white/10 focus:text-white cursor-pointer p-2.5">
            <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
            <span>Upgrade to Pro</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="rounded-lg focus:bg-white/10 focus:text-white cursor-pointer p-2.5">
            <User className="mr-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg focus:bg-white/10 focus:text-white cursor-pointer p-2.5">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg focus:bg-white/10 focus:text-white cursor-pointer p-2.5">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="rounded-lg focus:bg-red-500/10 focus:text-red-400 text-red-400 cursor-pointer p-2.5"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
