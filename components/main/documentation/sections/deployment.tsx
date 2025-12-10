"use client";

import {
  GitBranch,
  Terminal,
  Globe,
  Server,
  Rocket,
  Settings,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { SectionHeader, CodeBlock } from "../doc-ui";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DeploymentSection() {
  return (
    <section id="deployment" className="scroll-mt-32">
      <SectionHeader
        title="Deployment & DevOps"
        icon={Rocket}
        description="Production readiness guide. From environment configuration to CI/CD pipelines for both Frontend and Backend services."
      />

      <div className="mb-10 p-8 rounded-2xl border bg-secondary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Rocket className="w-32 h-32" />
        </div>
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-primary" />
          Standard Deployment Pipeline
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm relative z-10">
          <div className="flex flex-col items-center gap-3 text-center w-full md:w-auto">
            <div className="w-12 h-12 rounded-full bg-background border-2 border-slate-200 dark:border-zinc-700 flex items-center justify-center shadow-sm">
              <GitBranch className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <div className="font-bold">Git Push</div>
              <div className="text-xs text-muted-foreground">main branch</div>
            </div>
          </div>

          <div className="hidden md:block h-0.5 flex-1 bg-border relative">
            <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>

          <div className="flex flex-col items-center gap-3 text-center w-full md:w-auto">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 flex items-center justify-center shadow-sm">
              <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="font-bold">Build & Lint</div>
              <div className="text-xs text-muted-foreground">
                GitHub Actions / Vercel
              </div>
            </div>
          </div>

          <div className="hidden md:block h-0.5 flex-1 bg-border relative">
            <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>

          <div className="flex flex-col items-center gap-3 text-center w-full md:w-auto">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 flex items-center justify-center shadow-sm">
              <Rocket className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="font-bold">Production</div>
              <div className="text-xs text-muted-foreground">Live URL</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-500" />
              Backend Service
            </h3>
            <Badge variant="outline">Vercel</Badge>
          </div>

          <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-800 dark:text-amber-300">
              Prisma Client Warning
            </AlertTitle>
            <AlertDescription className="text-xs text-amber-700 dark:text-amber-400/90 mt-1">
              Prisma relies on C-based binaries. You <strong>must</strong> run
              the generate command during the build phase on the production
              server to match the OS architecture.
            </AlertDescription>
          </Alert>

          <Card>
            <CardContent className="p-0 overflow-hidden">
              <div className="bg-muted/50 p-3 border-b flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Terminal className="w-3 h-3" /> build_script.sh
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    1. Generate Client
                  </span>
                  <CodeBlock code="npx prisma generate" title="" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    2. Transpile NestJS
                  </span>
                  <CodeBlock code="npm run build" title="" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    3. Start Production
                  </span>
                  <CodeBlock code="node dist/main.js" title="" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Globe className="w-5 h-5 text-orange-500" />
              Frontend Application
            </h3>
            <Badge variant="outline">Vercel / Edge</Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            The Next.js app is optimized for Vercel. Ensure the following
            Environment Variables are configured in your Project Settings before
            deployment.
          </p>

          <Card className="border-dashed">
            <CardHeader className="py-4 bg-muted/20 border-b border-dashed">
              <CardTitle className="text-sm font-mono flex items-center gap-2">
                <Settings className="w-4 h-4" /> Required Variables
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[
                  {
                    key: "NEXT_PUBLIC_APP_URL",
                    desc: "Base URL of the frontend (e.g., https://smartbank.ai)",
                    req: true,
                  },
                  {
                    key: "NEXT_PUBLIC_API_URL",
                    desc: "Base URL of the backend API",
                    req: true,
                  },
                  {
                    key: "AUTH_SECRET",
                    desc: "Random string for NextAuth encryption",
                    req: true,
                  },
                ].map((env, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between p-4 text-sm"
                  >
                    <div>
                      <div className="font-mono font-bold text-foreground">
                        {env.key}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {env.desc}
                      </div>
                    </div>
                    {env.req && (
                      <Badge variant="secondary" className="text-[10px] h-5">
                        Required
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="pt-2">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Build Command
              </span>
              <CodeBlock code="npm run build" title="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
