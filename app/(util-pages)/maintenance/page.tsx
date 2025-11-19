"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Settings, RefreshCcw } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 opacity-[0.03]" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg mx-auto">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="mb-8 relative"
        >
          <div className="w-24 h-24 rounded-2xl bg-secondary border border-border flex items-center justify-center shadow-2xl">
            <Settings className="w-10 h-10 text-primary" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full border-4 border-background animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
        >
          Upgrading Neural Network
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg mb-8 leading-relaxed"
        >
          Our engineers are currently optimizing the predictive algorithms to
          serve you better. We expect to be back online shortly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary"
            onClick={() => window.location.reload()}
          >
            <RefreshCcw className="w-4 h-4" />
            Check Status
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-8 text-xs text-muted-foreground font-mono">
        SYSTEM_STATUS: MAINTENANCE_MODE_ACTIVE
      </div>
    </div>
  );
}
