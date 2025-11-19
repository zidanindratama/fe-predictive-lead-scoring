"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldAlert, Lock } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 bg-red-500/5 z-0" />
      <div className="absolute inset-0 opacity-20 z-0" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mb-8 relative"
        >
          <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center shadow-[0_0_40px_-10px_rgba(239,68,68,0.5)]">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <div className="absolute top-0 right-0 p-2 bg-background rounded-full border border-border">
            <Lock className="w-4 h-4 text-muted-foreground" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white"
        >
          Access <span className="text-red-500">Denied</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-lg mb-10 leading-relaxed"
        >
          Your security clearance does not permit access to this sector of the
          database. This incident has been logged by the system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link href="/login">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full h-12 px-8 bg-white text-black hover:bg-white/90 font-semibold"
            >
              Log in with Different ID
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full h-12 px-8 border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent"
            >
              Return to Homepage
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute top-0 w-full h-1 bg-linear-to-r from-transparent via-red-500 to-transparent opacity-50" />
    </div>
  );
}
