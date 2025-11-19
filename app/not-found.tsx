"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 opacity-[0.05] z-0" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-[25vw] leading-none text-foreground/5 select-none pointer-events-none z-0">
        404
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 p-4 rounded-full bg-secondary/30 backdrop-blur-md border border-border inline-flex items-center justify-center"
        >
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2" />
          <span className="text-sm font-medium text-muted-foreground">
            Error Code: Not Found
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl md:text-7xl font-bold tracking-tighter mb-6"
        >
          Lost in the <span className="text-primary">Data Stream</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg text-muted-foreground max-w-md mb-10"
        >
          The page you are looking for has been moved, deleted, or possibly
          never existed in this dimension.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex gap-4"
        >
          <Link href="/">
            <Button size="lg" className="rounded-full h-12 px-8 gap-2">
              <Home className="w-4 h-4" />
              Return Home
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-12 px-8 gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
