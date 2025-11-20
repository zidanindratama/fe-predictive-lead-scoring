"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/(global)/sidebar";
import { Header } from "@/components/dashboard/(global)/header";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#f4f4f5] dark:bg-[#09090b]">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <motion.div
        initial={false}
        animate={{
          paddingLeft: isMobile ? 0 : isCollapsed ? 80 : 280,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex-1 flex flex-col min-w-0 h-screen transition-all pl-0"
        )}
      >
        <div className="flex-1 flex flex-col h-full">
          <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth bg-background/50">
            <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              {children}
            </div>
          </main>
        </div>
      </motion.div>
    </div>
  );
}
