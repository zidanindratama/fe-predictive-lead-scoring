"use client";

import { motion } from "framer-motion";
import { Server, Database, BrainCircuit } from "lucide-react";

export const SystemArchitecture = () => {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Data Flow Architecture
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            A high-performance pipeline built on NestJS and Prisma, connecting
            secure banking data with advanced machine learning models.
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <svg className="absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 hidden lg:block pointer-events-none z-0">
            <line
              x1="10%"
              y1="50%"
              x2="90%"
              y2="50%"
              stroke="#333"
              strokeWidth="2"
              strokeDasharray="10 10"
            />
            <motion.circle
              cx="10%"
              cy="50%"
              r="4"
              fill="#3b82f6"
              animate={{ cx: ["10%", "90%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
              cx="10%"
              cy="50%"
              r="4"
              fill="#a855f7"
              animate={{ cx: ["10%", "90%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: 1.5,
              }}
            />
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
              <Server className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">NestJS Core</h3>
            <p className="text-zinc-400 mb-4 text-sm">
              The central nervous system. Handles Authentication (JWT), User
              Management, and orchestrates the data pipeline using modular
              architecture.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                AuthModule
              </span>
              <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                Prisma ORM
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative z-10 p-8 rounded-3xl border border-purple-500/30 bg-purple-500/5 backdrop-blur-md shadow-[0_0_50px_-10px_rgba(168,85,247,0.15)]"
          >
            <div className="absolute -top-4 -right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              PROCESSING
            </div>
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
              <BrainCircuit className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Predictive ML
            </h3>
            <p className="text-zinc-400 mb-4 text-sm">
              Hosted on HuggingFace. Receives formatted customer data, runs
              classification models, and returns probability scores (YES/NO).
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-xs border border-purple-500/20">
                Python
              </span>
              <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-xs border border-purple-500/20">
                Scikit-learn
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative z-10 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6 text-green-400">
              <Database className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              MongoDB Cluster
            </h3>
            <p className="text-zinc-400 mb-4 text-sm">
              Stores raw customer profiles, historical prediction results, and
              campaign analytics in a scalable document structure.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs border border-green-500/20">
                Replica Set
              </span>
              <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs border border-green-500/20">
                Encryption
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
