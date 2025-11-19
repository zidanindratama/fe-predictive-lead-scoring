"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  UserCircle,
  BarChart2,
  Target,
  FileJson,
} from "lucide-react";

const modules = [
  {
    title: "Auth Module",
    icon: ShieldCheck,
    desc: "JWT-based authentication with Access & Refresh token rotation. Secure Bcrypt hashing for passwords.",
    color: "text-emerald-500",
  },
  {
    title: "Users Management",
    icon: UserCircle,
    desc: "Role-based access control (RBAC) handling ADMIN, STAFF, and USER permissions and CRUD operations.",
    color: "text-blue-500",
  },
  {
    title: "Campaign Engine",
    icon: Target,
    desc: "JSON-based filtering logic ({'age': {'lt': 35}}) to target specific customer segments for batch predictions.",
    color: "text-red-500",
  },
  {
    title: "Customer Data",
    icon: Users,
    desc: "Handling bulk import (CSV/Excel) and export functionality. Validates attributes like job, marital status, and loan history.",
    color: "text-yellow-500",
  },
  {
    title: "Prediction Service",
    icon: FileJson,
    desc: "Manages the handshake with the external ML API. Stores prediction results (Probability YES/NO) linked to customers.",
    color: "text-purple-500",
  },
  {
    title: "Analytics Aggregator",
    icon: BarChart2,
    desc: "Compiles raw data into visual trends: Predictions by Job, Weekly Trends, and Conversion Overview.",
    color: "text-cyan-500",
  },
];

export const CoreModules = () => {
  return (
    <section className="py-24 bg-background border-t border-border/50">
      <div className="container px-4 mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Modules</h2>
          <p className="text-muted-foreground text-lg">
            Broken down into micro-services for scalability and maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-3xl border border-border/50 bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center mb-6 ${mod.color}`}
              >
                <mod.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {mod.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {mod.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
