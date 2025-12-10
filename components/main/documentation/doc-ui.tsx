"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeader({ title, icon: Icon, description }: any) {
  return (
    <div className="space-y-4 border-b border-border pb-6 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function CodeBlock({
  code,
  lang = "bash",
  title,
}: {
  code: string;
  lang?: string;
  title?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-border bg-[#0c0c0e]">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
          <span className="text-xs font-mono text-muted-foreground">
            {title}
          </span>
          <button
            onClick={onCopy}
            className="text-muted-foreground hover:text-white transition-colors"
          >
            {copied ? (
              <Check className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed text-blue-100">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-sm text-muted-foreground"
        >
          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
