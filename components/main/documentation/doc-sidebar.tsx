"use client";

import { cn } from "@/lib/utils";
import {
  Book,
  Server,
  Layout,
  BrainCircuit,
  GitBranch,
  Layers,
} from "lucide-react";

export const DOC_SECTIONS = [
  { id: "intro", title: "1. Introduction", icon: Book },
  { id: "architecture", title: "2. System Architecture", icon: Layers },
  { id: "backend", title: "3. Backend Services", icon: Server },
  { id: "frontend", title: "4. Frontend Application", icon: Layout },
  { id: "ml-engine", title: "5. ML Integration", icon: BrainCircuit },
  { id: "deployment", title: "6. Deployment", icon: GitBranch },
];

export function DocSidebar({ activeSection }: { activeSection: string }) {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-28 space-y-6">
      <div className="px-2">
        <h3 className="font-bold text-lg mb-2">Documentation</h3>
        <p className="text-sm text-muted-foreground">
          Full technical reference for SmartBank
        </p>
      </div>
      <nav className="flex flex-col space-y-1">
        {DOC_SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all text-left",
              activeSection === section.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            )}
          >
            <section.icon className="w-4 h-4" />
            {section.title}
          </button>
        ))}
      </nav>

      <div className="px-4 pt-6 border-t border-border mt-6">
        <p className="text-xs text-muted-foreground">
          &copy; 2025 SmartBank Inc.
        </p>
      </div>
    </div>
  );
}
