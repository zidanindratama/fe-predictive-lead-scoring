"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Server,
  Database,
  BrainCircuit,
  HardDrive,
  Layout,
  ShieldCheck,
  CloudFog,
  Lock,
  Container,
} from "lucide-react";
import { SectionHeader } from "../doc-ui";
import { cn } from "@/lib/utils";

function TechCard({
  title,
  icon: Icon,
  tech,
  color,
  className,
  dots = [],
}: {
  title: string;
  icon: any;
  tech: string;
  color: "blue" | "orange" | "green" | "purple" | "slate";
  className?: string;
  dots?: ("top" | "bottom" | "left" | "right")[];
}) {
  const styles = {
    blue: "border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    orange:
      "border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]",
    green:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    purple:
      "border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
    slate: "border-slate-600/30 bg-slate-700/10 text-slate-300",
  };

  return (
    <div
      className={cn(
        "relative flex items-center gap-3 p-3 rounded-xl border backdrop-blur-md z-20 w-[180px] h-[64px] transition-transform hover:scale-105",
        styles[color],
        "bg-[#0f172a]",
        className
      )}
    >
      <div className={cn("p-2 rounded-lg bg-black/20 shrink-0")}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-bold text-white/90 truncate">
          {title}
        </span>
        <span className="text-[10px] font-mono opacity-70 truncate">
          {tech}
        </span>
      </div>

      {dots.includes("top") && (
        <div className="absolute w-1.5 h-1.5 rounded-full border border-[#0f172a] bg-slate-400 left-1/2 -top-1 -translate-x-1/2" />
      )}
      {dots.includes("bottom") && (
        <div className="absolute w-1.5 h-1.5 rounded-full border border-[#0f172a] bg-slate-400 left-1/2 -bottom-1 -translate-x-1/2" />
      )}
      {dots.includes("left") && (
        <div className="absolute w-1.5 h-1.5 rounded-full border border-[#0f172a] bg-slate-400 -left-1 top-1/2 -translate-y-1/2" />
      )}
      {dots.includes("right") && (
        <div className="absolute w-1.5 h-1.5 rounded-full border border-[#0f172a] bg-slate-400 -right-1 top-1/2 -translate-y-1/2" />
      )}
    </div>
  );
}

function ConnectionPath({
  d,
  color = "stroke-slate-700",
}: {
  d: string;
  color?: string;
}) {
  return (
    <>
      <path d={d} fill="none" strokeWidth="2" className="stroke-slate-800" />
      <motion.path
        d={d}
        fill="none"
        strokeWidth="2"
        className={color}
        strokeDasharray="4 4"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -20 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </>
  );
}

export function ArchitectureSection() {
  const CLIENT_X = 70;
  const CLIENT_Y_WEB = 180;
  const CLIENT_Y_MOBILE = 280;

  const VPC_CENTER_X = 510;
  const VPC_Y_L1 = 60;
  const VPC_Y_L2 = 160;
  const VPC_Y_L3 = 260;
  const VPC_Y_L4 = 380;
  const VPC_Y_L5 = 480;

  const EXT_X = 950;
  const EXT_Y_EMAIL = 180;
  const EXT_Y_AUTH = 280;

  const C_CLIENT = CLIENT_X + 180;
  const C_VPC = VPC_CENTER_X + 90;
  const C_EXT = EXT_X;

  return (
    <section id="architecture" className="scroll-mt-32">
      <SectionHeader
        title="High-Level Architecture"
        icon={Layout}
        description="Visualization of SmartBank's cloud-native infrastructure. The system is designed with a clear separation of concerns between the User Interface, API Gateway, and Intelligence Engine."
      />

      <div className="w-full bg-[#020617] border border-slate-800 rounded-3xl p-8 overflow-x-auto shadow-2xl">
        <div className="relative min-w-[1200px] h-[600px] mx-auto">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15] rounded-xl pointer-events-none" />

          <div className="absolute top-[120px] left-[20px] w-[260px] h-[280px] border border-dashed border-slate-800 rounded-3xl bg-white/[0.02]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500 bg-[#020617] px-3 z-10 uppercase tracking-widest">
              Client Zone
            </div>
          </div>

          <div className="absolute top-[20px] left-[320px] w-[560px] h-[560px] border border-indigo-500/20 rounded-3xl bg-indigo-500/[0.03]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-indigo-400 bg-[#020617] px-3 border border-indigo-500/20 rounded-full z-10 uppercase tracking-widest">
              App Cluster
            </div>
          </div>

          <div className="absolute top-[120px] left-[920px] w-[260px] h-[280px] border border-dashed border-slate-800 rounded-3xl bg-white/[0.02]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500 bg-[#020617] px-3 z-10 uppercase tracking-widest">
              3rd Party
            </div>
          </div>

          <div
            className="absolute"
            style={{ top: CLIENT_Y_WEB, left: CLIENT_X - 10 }}
          >
            <TechCard
              title="Web Browser"
              tech="Chrome / Edge"
              icon={Globe}
              color="blue"
              dots={["right"]}
            />
          </div>
          <div
            className="absolute"
            style={{ top: CLIENT_Y_MOBILE, left: CLIENT_X - 10 }}
          >
            <TechCard
              title="Mobile App"
              tech="PWA View"
              icon={Smartphone}
              color="blue"
              dots={["right"]}
            />
          </div>

          <div
            className="absolute"
            style={{ top: VPC_Y_L1, left: VPC_CENTER_X }}
          >
            <TechCard
              title="Cloudflare"
              tech="WAF & DNS"
              icon={ShieldCheck}
              color="orange"
              dots={["bottom", "left"]}
            />
          </div>
          <div
            className="absolute"
            style={{ top: VPC_Y_L2, left: VPC_CENTER_X }}
          >
            <TechCard
              title="Frontend"
              tech="Next.js Container"
              icon={Container}
              color="slate"
              dots={["top", "bottom"]}
            />
          </div>
          <div
            className="absolute z-30"
            style={{ top: VPC_Y_L3, left: VPC_CENTER_X }}
          >
            <TechCard
              title="Backend API"
              tech="NestJS Core"
              icon={Server}
              color="blue"
              className="shadow-blue-500/40 border-blue-500 scale-105"
              dots={["top", "bottom", "right"]}
            />
          </div>

          <div
            className="absolute"
            style={{ top: VPC_Y_L4, left: VPC_CENTER_X - 140 }}
          >
            <TechCard
              title="ML Engine"
              tech="Python/Flask"
              icon={BrainCircuit}
              color="purple"
              className="w-[160px]"
              dots={["top"]}
            />
          </div>
          <div
            className="absolute"
            style={{ top: VPC_Y_L4, left: VPC_CENTER_X + 160 }}
          >
            <TechCard
              title="MongoDB"
              tech="Atlas Cluster"
              icon={Database}
              color="green"
              className="w-[160px]"
              dots={["top", "bottom"]}
            />
          </div>
          <div
            className="absolute"
            style={{ top: VPC_Y_L5, left: VPC_CENTER_X + 160 }}
          >
            <TechCard
              title="Blob Storage"
              tech="Cloudinary"
              icon={HardDrive}
              color="slate"
              className="w-[160px]"
              dots={["top"]}
            />
          </div>

          <div
            className="absolute"
            style={{ top: EXT_Y_EMAIL, left: EXT_X + 10 }}
          >
            <TechCard
              title="Email Service"
              tech="Resend / SMTP"
              icon={CloudFog}
              color="slate"
              dots={["left"]}
            />
          </div>
          <div
            className="absolute"
            style={{ top: EXT_Y_AUTH, left: EXT_X + 10 }}
          >
            <TechCard
              title="Auth Provider"
              tech="JWT / OAuth"
              icon={Lock}
              color="slate"
              dots={["left"]}
            />
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
            <ConnectionPath
              d={`M ${C_CLIENT} ${CLIENT_Y_WEB + 32} C ${C_CLIENT + 60} ${
                CLIENT_Y_WEB + 32
              }, ${VPC_CENTER_X - 60} ${VPC_Y_L1 + 32}, ${VPC_CENTER_X} ${
                VPC_Y_L1 + 32
              }`}
              color="stroke-blue-500"
            />
            <ConnectionPath
              d={`M ${C_CLIENT} ${CLIENT_Y_MOBILE + 32} C ${C_CLIENT + 60} ${
                CLIENT_Y_MOBILE + 32
              }, ${VPC_CENTER_X - 60} ${VPC_Y_L1 + 32}, ${VPC_CENTER_X} ${
                VPC_Y_L1 + 32
              }`}
              color="stroke-blue-500"
            />

            <ConnectionPath
              d={`M ${C_VPC} ${VPC_Y_L1 + 64} L ${C_VPC} ${VPC_Y_L2}`}
              color="stroke-orange-500"
            />
            <ConnectionPath
              d={`M ${C_VPC} ${VPC_Y_L2 + 64} L ${C_VPC} ${VPC_Y_L3}`}
              color="stroke-slate-500"
            />

            <ConnectionPath
              d={`M ${C_VPC} ${VPC_Y_L3 + 64} C ${C_VPC} 360, ${
                C_VPC - 400 + 80
              } 360, ${C_VPC - 140} ${VPC_Y_L4}`}
              color="stroke-purple-500"
            />

            <ConnectionPath
              d={`M ${C_VPC} ${VPC_Y_L3 + 64} C ${C_VPC} 360, ${
                C_VPC + 160 + 80
              } 360, ${C_VPC + 100 + 50} ${VPC_Y_L4}`}
              color="stroke-green-500"
            />

            <ConnectionPath
              d={`M ${C_VPC + 70 + 80} ${VPC_Y_L4 + 64} L ${
                C_VPC + 70 + 80
              } ${VPC_Y_L5}`}
              color="stroke-slate-500"
            />

            <ConnectionPath
              d={`M ${C_VPC + 90} ${VPC_Y_L3 + 32} C ${C_VPC + 180} ${
                VPC_Y_L3 + 32
              }, ${C_VPC + 180} ${EXT_Y_EMAIL + 32}, ${C_EXT} ${
                EXT_Y_EMAIL + 32
              }`}
              color="stroke-slate-500"
            />
            <ConnectionPath
              d={`M ${C_VPC + 90} ${VPC_Y_L3 + 32} L ${C_EXT} ${
                EXT_Y_AUTH + 32
              }`}
              color="stroke-slate-500"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[
          {
            label: "Main App Flow",
            desc: "Handles user interactions via Next.js and orchestrates business logic through the NestJS API Gateway.",
            color: "bg-blue-500",
            bg: "bg-blue-500/5",
            border: "border-blue-500/20",
          },
          {
            label: "Data Persistence",
            desc: "Secure storage layer using MongoDB Replica Sets for high-availability customer data and audit logs.",
            color: "bg-green-500",
            bg: "bg-green-500/5",
            border: "border-green-500/20",
          },
          {
            label: "AI Inference Engine",
            desc: "Isolated Python environment that normalizes data and runs Scikit-learn models for real-time scoring.",
            color: "bg-purple-500",
            bg: "bg-purple-500/5",
            border: "border-purple-500/20",
          },
          {
            label: "Security & Edge Layer",
            desc: "Protection via Cloudflare WAF and Identity Management (OAuth/JWT) ensuring zero-trust access control.",
            color: "bg-orange-500",
            bg: "bg-orange-500/5",
            border: "border-orange-500/20",
          },
        ].map((l, i) => (
          <div
            key={i}
            className={cn(
              "flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-md",
              l.bg,
              l.border
            )}
          >
            <div
              className={cn("w-3 h-3 mt-1.5 rounded-full shrink-0", l.color)}
            />
            <div>
              <h4 className="font-bold text-sm text-foreground">{l.label}</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {l.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
