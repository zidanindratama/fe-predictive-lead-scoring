"use client";

import {
  Server,
  Database,
  ShieldCheck,
  Lock,
  Key,
  FileJson,
  Layers,
  Code2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader, CodeBlock } from "../doc-ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const prismaSchema = `model Customer {
  id            String   @id @default(auto()) @map("_id") @db.ObjectId
  name          String
  age           Int
  job           String
  marital       String
  education     String
  creditDefault String   @map("default")
  housing       String
  loan          String
  contact       String
  
  // Economic Indicators
  emp_var_rate  Float
  cons_price_idx Float
  cons_conf_idx Float
  euribor3m     Float
  
  Prediction    Prediction[]
}`;

const moduleCode = `@Module({
  imports: [PrismaModule, MlModule],
  controllers: [CampaignsController],
  providers: [CampaignsService],
  exports: [CampaignsService],
})
export class CampaignsModule {}`;

export function BackendSection() {
  return (
    <section id="backend" className="scroll-mt-32">
      <SectionHeader
        title="Backend Services"
        icon={Server}
        description="A robust, modular, and type-safe backend architecture built with NestJS to ensure scalability and maintainability."
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4 font-medium text-muted-foreground data-[state=active]:text-foreground transition-all"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="database"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4 font-medium text-muted-foreground data-[state=active]:text-foreground transition-all"
          >
            Database
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4 font-medium text-muted-foreground data-[state=active]:text-foreground transition-all"
          >
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="overview"
          className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Layers className="w-5 h-5 text-red-500" />
                  Modular Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We leverage NestJS Modules to encapsulate business logic. Each
                  domain (Users, Campaigns, Predictions) works in isolation,
                  exposing only necessary services via exports.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Dependency Injection</Badge>
                  <Badge variant="outline">Singleton Services</Badge>
                  <Badge variant="outline">Decorators</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Code2 className="w-5 h-5 text-blue-500" />
                  Strict Type-Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Input validation is handled globally using Zod pipes. This
                  ensures that no malformed data ever reaches the controller
                  layer.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="text-blue-500 border-blue-200 bg-blue-50/10"
                  >
                    Zod DTOs
                  </Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Global Pipes</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-4 border-b bg-muted/30">
              <span className="font-mono text-sm font-semibold">
                campaigns.module.ts
              </span>
            </div>
            <CodeBlock code={moduleCode} lang="typescript" />
          </div>
        </TabsContent>

        <TabsContent
          value="database"
          className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Database className="w-5 h-5 text-green-600" />
                  MongoDB + Prisma
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We chose MongoDB for its document-oriented flexibility,
                  allowing us to store dynamic campaign criteria JSON without
                  rigid schema migrations.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>Native JSON Support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>Replica Set Ready</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span>Prisma ORM Type Safety</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl border bg-card">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-purple-500" />
                  Dynamic Filtering
                </h4>
                <p className="text-xs text-muted-foreground">
                  The `criteria` field in Campaign model stores complex JSON
                  logic (e.g., age &gt; 30 AND job = 'admin') which translates
                  directly to MongoDB queries.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-xl border border-border bg-card overflow-hidden h-full">
                <div className="p-3 border-b bg-muted/30 flex justify-between items-center">
                  <span className="font-mono text-sm font-semibold">
                    schema.prisma
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    MongoDB
                  </Badge>
                </div>
                <CodeBlock code={prismaSchema} lang="prisma" />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="security"
          className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-orange-500 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Key className="w-4 h-4 text-orange-600" /> Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold text-2xl mb-1">Dual Token</div>
                <p className="text-xs text-muted-foreground">
                  Short-lived Access Token (15m) + Long-lived HTTP-Only Refresh
                  Token (7d).
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />{" "}
                  Authorization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold text-2xl mb-1">RBAC</div>
                <p className="text-xs text-muted-foreground">
                  Role-Based Access Control using Custom Decorators{" "}
                  <code className="text-xs bg-black/10 px-1 rounded">
                    @Roles()
                  </code>{" "}
                  and Guards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 bg-purple-500/5">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-600" /> Encryption
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold text-2xl mb-1">Bcrypt</div>
                <p className="text-xs text-muted-foreground">
                  Passwords are salted and hashed with cost factor 10 before
                  storage.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="p-8 rounded-2xl border border-dashed border-border bg-secondary/10">
            <h3 className="text-center font-bold text-lg mb-8">
              Secure Request Pipeline
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
              <div className="px-6 py-3 bg-background border rounded-lg shadow-sm text-center">
                <div className="font-bold mb-1">Client Request</div>
                <div className="text-xs text-muted-foreground">
                  Bearer Token
                </div>
              </div>

              <div className="w-0.5 h-8 md:w-8 md:h-0.5 bg-border relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-border rounded-full" />
              </div>

              <div className="px-6 py-3 bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg text-center">
                <div className="font-bold text-orange-700 dark:text-orange-400 mb-1">
                  JwtAuthGuard
                </div>
                <div className="text-xs text-muted-foreground">
                  Validates Signature
                </div>
              </div>

              <div className="w-0.5 h-8 md:w-8 md:h-0.5 bg-border relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-border rounded-full" />
              </div>

              <div className="px-6 py-3 bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-center">
                <div className="font-bold text-blue-700 dark:text-blue-400 mb-1">
                  RolesGuard
                </div>
                <div className="text-xs text-muted-foreground">
                  Checks Metadata
                </div>
              </div>

              <div className="w-0.5 h-8 md:w-8 md:h-0.5 bg-border relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-border rounded-full" />
              </div>

              <div className="px-6 py-3 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                <div className="font-bold text-green-700 dark:text-green-400 mb-1">
                  Controller
                </div>
                <div className="text-xs text-muted-foreground">
                  Business Logic
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
