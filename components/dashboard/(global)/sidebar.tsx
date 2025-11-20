"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { navItems, navSecondary } from "@/config/dashboard-nav";
import { UserNav } from "@/components/dashboard/(global)/user-nav";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isSmall = window.innerWidth < 768;
      setIsMobile(isSmall);
      if (isSmall) setIsCollapsed(true);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsCollapsed]);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? "100px" : "280px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-y-0 left-0 z-50 hidden md:flex flex-col border-r border-border/40 bg-[#09090b] text-white transition-all shadow-xl"
      )}
    >
      <div className="flex h-20 items-center px-6 border-b border-white/5">
        <Link
          href={"/"}
          className={cn(
            "flex items-center w-full overflow-hidden transition-all",
            isCollapsed ? "justify-center" : "gap-3"
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Command className="h-5 w-5" />
          </div>
          <motion.div
            animate={{
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : "auto",
            }}
            className="flex flex-col overflow-hidden"
          >
            <span className="font-bold text-base tracking-tight">
              SmartBank
            </span>
            <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">
              Enterprise
            </span>
          </motion.div>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="flex flex-col gap-2">
          <TooltipProvider delayDuration={0}>
            {navItems.map((item, index) => {
              const isActive =
                item.url === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname === item.url ||
                    pathname.startsWith(item.url + "/");

              const hasSubmenu = item.items && item.items.length > 0;

              if (isCollapsed) {
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 group relative",
                          "mx-auto",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {isActive && (
                          <motion.div
                            layoutId="active-pill"
                            className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="font-medium bg-[#1c1c1e] border-white/10 text-white"
                    >
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return hasSubmenu ? (
                <Collapsible
                  key={index}
                  defaultOpen={isActive}
                  className="group/collapsible"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between h-11 px-4 rounded-xl font-medium transition-all duration-200",
                        isActive
                          ? "bg-white/5 text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon
                          className={cn(
                            "h-4 w-4",
                            isActive ? "text-primary" : "text-white/40"
                          )}
                        />
                        {item.title}
                      </span>
                      <ChevronRight className="h-4 w-4 text-white/20 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-white/5 pl-4 py-1">
                      {item.items!.map((subItem, subIndex) => {
                        const isSubActive = pathname === subItem.url;
                        return (
                          <Link
                            key={subIndex}
                            href={subItem.url}
                            className={cn(
                              "flex h-9 items-center rounded-lg px-3 text-sm transition-colors relative",
                              isSubActive
                                ? "text-white font-medium bg-white/5"
                                : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                          >
                            {subItem.title}
                          </Link>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link key={index} href={item.url} className="block">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-11 px-4 rounded-xl font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-4 w-4",
                        isActive
                          ? "text-white dark:text-black"
                          : "text-white/40"
                      )}
                    />
                    {item.title}
                  </Button>
                </Link>
              );
            })}
          </TooltipProvider>

          <div className="my-6 px-2">
            <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="flex flex-col gap-1">
            {navSecondary.map((item, index) =>
              isCollapsed ? (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.url}
                      className="flex h-11 w-11 items-center justify-center rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors mx-auto"
                    >
                      <item.icon className="h-5 w-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-[#1c1c1e] border-white/10 text-white"
                  >
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Link key={index} href={item.url}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-10 px-4 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-medium"
                  >
                    <item.icon className="mr-3 h-4 w-4 text-white/40" />
                    {item.title}
                  </Button>
                </Link>
              )
            )}
          </div>
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-white/5 bg-[#09090b]">
        <UserNav
          isCollapsed={isCollapsed}
          side={isCollapsed ? "right" : "top"}
          align={isCollapsed ? "end" : "center"}
        />
      </div>
    </motion.aside>
  );
}
