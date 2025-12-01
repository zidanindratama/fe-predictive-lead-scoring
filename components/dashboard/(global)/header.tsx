"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftOpen, HelpCircle, Command, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { navItems, navSecondary } from "@/config/dashboard-nav";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/dashboard/(global)/user-nav";

interface HeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export function Header({ isCollapsed, setIsCollapsed }: HeaderProps) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-40 flex h-20 shrink-0 items-center justify-between gap-x-4 border-b border-border/40 bg-background/80 px-4 md:px-8 shadow-sm backdrop-blur-md">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
            >
              <PanelLeftOpen className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="p-0 w-[280px] h-full max-h-screen bg-[#09090b] border-r border-white/10 text-white flex flex-col"
          >
            <SheetHeader className="h-20 flex items-center px-6 border-b border-white/5 shrink-0">
              <Link href={"/"} className="flex items-center gap-3 w-full">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Command className="h-5 w-5" />
                </div>
                <div className="flex flex-col items-start">
                  <SheetTitle className="font-bold text-base tracking-tight text-white">
                    SmartBank
                  </SheetTitle>
                  <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">
                    Mobile Access
                  </span>
                </div>
              </Link>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => {
                  const isActive =
                    item.url === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname === item.url ||
                        pathname.startsWith(item.url + "/");

                  const hasSubmenu = item.items && item.items.length > 0;

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
                            "w-full justify-between h-11 px-4 rounded-xl font-medium",
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
                      <CollapsibleContent>
                        <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-white/5 pl-4 py-1">
                          {item.items!.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.url}
                              className={cn(
                                "flex h-9 items-center rounded-lg px-3 text-sm transition-colors",
                                pathname === subItem.url
                                  ? "text-white font-medium bg-white/5"
                                  : "text-white/40 hover:text-white"
                              )}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link key={index} href={item.url}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-11 px-4 rounded-xl font-medium",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "mr-3 h-4 w-4",
                            isActive ? "text-white" : "text-white/40"
                          )}
                        />
                        {item.title}
                      </Button>
                    </Link>
                  );
                })}

                <div className="my-6 px-2">
                  <div className="h-px w-full bg-white/10" />
                </div>

                {navSecondary.map((item, index) => (
                  <Link key={index} href={item.url}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-10 px-4 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-medium"
                    >
                      <item.icon className="mr-3 h-4 w-4 text-white/40" />
                      {item.title}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t border-white/5 bg-[#09090b] shrink-0">
              <UserNav side="top" align="center" />
            </div>
          </SheetContent>
        </Sheet>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex text-muted-foreground hover:text-foreground"
        >
          <PanelLeftOpen
            className={cn(
              "h-5 w-5 transition-transform",
              isCollapsed ? "rotate-180" : ""
            )}
          />
        </Button>

        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            {paths.slice(1).map((path, index) => {
              const href = `/dashboard/${paths.slice(1, index + 2).join("/")}`;
              const isLast = index === paths.slice(1).length - 1;
              return (
                <div key={path} className="flex items-center">
                  <BreadcrumbSeparator className="text-muted-foreground/50" />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="capitalize font-medium text-foreground">
                        {path}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={href}
                        className="capitalize text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {path}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary/50"
          asChild
        >
          <Link href={"/tour"}>
            <HelpCircle className="h-5 w-5" />
          </Link>
        </Button>

        <ModeToggle />
      </div>
    </header>
  );
}
