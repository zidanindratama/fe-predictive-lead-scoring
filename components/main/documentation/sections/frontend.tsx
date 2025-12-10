"use client";

import {
  Layout,
  Palette,
  Zap,
  Layers,
  Folder,
  FileCode,
  Component,
  ArrowRight,
  Activity,
  MousePointer2,
  Smartphone,
  Box,
  Settings,
  Globe,
  Download,
  Trash2,
  UploadCloud,
  RefreshCw,
} from "lucide-react";
import { SectionHeader } from "../doc-ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export function FrontendSection() {
  return (
    <section id="frontend" className="scroll-mt-32">
      <SectionHeader
        title="Frontend Application"
        icon={Layout}
        description="A modern, high-performance web client built with Next.js 14 App Router. Designed for rich interactivity, accessibility, and seamless data synchronization."
      />

      <Tabs defaultValue="stack" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
          <TabsTrigger
            value="stack"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4 font-medium text-muted-foreground data-[state=active]:text-foreground transition-all"
          >
            Tech Stack
          </TabsTrigger>
          <TabsTrigger
            value="structure"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-4 font-medium text-muted-foreground data-[state=active]:text-foreground transition-all"
          >
            Project Structure
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="stack"
          className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-t-4 border-t-black dark:border-t-white hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Layers className="w-5 h-5" /> Core Framework
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">Next.js 14</span>
                    <Badge variant="secondary">App Router</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Leveraging React Server Components (RSC) for initial load
                    performance and Client Components for interactivity.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Server Actions</Badge>
                  <Badge variant="outline">Streaming SSR</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-blue-500 hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Palette className="w-5 h-5 text-blue-500" /> UI System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">Tailwind + Shadcn</span>
                    <Badge
                      variant="secondary"
                      className="bg-blue-500/10 text-blue-600"
                    >
                      Utility-First
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Built on Radix UI primitives for uncompromised
                    accessibility, styled with Tailwind CSS v4 for rapid
                    development.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-red-500 hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="w-5 h-5 text-red-500" /> Data
                  Synchronization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">TanStack Query</span>
                    <Badge
                      variant="secondary"
                      className="bg-red-500/10 text-red-600"
                    >
                      v5
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Manages server state with features like automatic
                    refetching, caching, and optimistic updates for a snappy UX.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-purple-500 hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MousePointer2 className="w-5 h-5 text-purple-500" />{" "}
                  Interaction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <div className="mt-1 p-1 bg-purple-100 dark:bg-purple-900/30 rounded">
                      <Zap className="w-3 h-3 text-purple-600" />
                    </div>
                    <div>
                      <span className="font-semibold block">Framer Motion</span>
                      <span className="text-muted-foreground text-xs">
                        Complex gestures & layout animations.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="mt-1 p-1 bg-orange-100 dark:bg-orange-900/30 rounded">
                      <Smartphone className="w-3 h-3 text-orange-600" />
                    </div>
                    <div>
                      <span className="font-semibold block">Recharts</span>
                      <span className="text-muted-foreground text-xs">
                        Responsive SVG-based data visualization.
                      </span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value="structure"
          className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <Card className="bg-[#1e1e20] text-zinc-300 border-zinc-800">
            <CardContent className="p-6 font-mono text-sm">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-zinc-100 font-bold mb-2">
                  <Folder className="w-4 h-4 fill-zinc-100" />
                  <span>src/</span>
                </div>

                <div className="ml-4 flex flex-col gap-2 relative border-l border-zinc-700 pl-4">
                  <div className="flex items-start justify-between group">
                    <div className="flex items-center gap-2 text-blue-400">
                      <Folder className="w-4 h-4 fill-blue-900/30" />
                      <span>app/</span>
                    </div>
                    <span className="text-xs text-zinc-500">
                      // Next.js App Router
                    </span>
                  </div>
                  <div className="ml-6 border-l border-zinc-800 pl-4 text-zinc-400 text-xs flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Folder className="w-3 h-3 text-blue-300" /> (auth){" "}
                      <span className="text-zinc-600">-- Login / Register</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Folder className="w-3 h-3 text-blue-300" /> (dashboard){" "}
                      <span className="text-zinc-600">-- Protected Routes</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300">
                      <FileCode className="w-3 h-3" /> layout.tsx{" "}
                      <span className="text-zinc-600">-- Root Layout</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300">
                      <FileCode className="w-3 h-3" /> globals.css{" "}
                      <span className="text-zinc-600">
                        -- Tailwind Directives
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-yellow-400 mt-2">
                    <Folder className="w-4 h-4 fill-yellow-900/30" />
                    <span>components/</span>
                  </div>
                  <div className="ml-6 border-l border-zinc-800 pl-4 text-zinc-400 text-xs flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Folder className="w-3 h-3" /> ui{" "}
                      <span className="text-zinc-600">-- Radix Primitives</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Folder className="w-3 h-3" /> dashboard{" "}
                      <span className="text-zinc-600">-- Feature Widgets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Folder className="w-3 h-3" /> main{" "}
                      <span className="text-zinc-600">-- Landing Page</span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between group mt-2">
                    <div className="flex items-center gap-2 text-purple-400">
                      <Folder className="w-4 h-4 fill-purple-900/30" />
                      <span>hooks/</span>
                    </div>
                    <span className="text-xs text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      // Custom Data Hooks
                    </span>
                  </div>
                  <div className="ml-6 border-l border-zinc-800 pl-4 text-zinc-400 text-xs flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Activity className="w-3 h-3 text-blue-400" />{" "}
                      use-get-data.ts{" "}
                      <span className="text-zinc-600 opacity-50">
                        -- GET (Query)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-yellow-400" />{" "}
                      use-post-data.ts{" "}
                      <span className="text-zinc-600 opacity-50">
                        -- POST (Mutation)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-3 h-3 text-orange-400" />{" "}
                      use-patch-data.ts{" "}
                      <span className="text-zinc-600 opacity-50">
                        -- PATCH (Mutation)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-3 h-3 text-red-400" />{" "}
                      use-delete-data.ts{" "}
                      <span className="text-zinc-600 opacity-50">
                        -- DELETE (Mutation)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UploadCloud className="w-3 h-3 text-cyan-400" />{" "}
                      use-upload-data.ts{" "}
                      <span className="text-zinc-600 opacity-50">
                        -- Multipart Form
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-3 h-3 text-green-400" />{" "}
                      use-export-data.ts{" "}
                      <span className="text-zinc-600 opacity-50">
                        -- Blob Downloader
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCode className="w-3 h-3" /> use-debounce.ts{" "}
                      <span className="text-zinc-600 opacity-50">
                        -- Search Utility
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-green-400 mt-2">
                    <Folder className="w-4 h-4 fill-green-900/30" />
                    <span>lib/</span>
                  </div>
                  <div className="ml-6 border-l border-zinc-800 pl-4 text-zinc-400 text-xs flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Globe className="w-3 h-3" /> axios.ts{" "}
                      <span className="text-zinc-600">
                        -- Interceptors & JWT
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCode className="w-3 h-3" /> utils.ts{" "}
                      <span className="text-zinc-600">-- Class Merger</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-orange-400 mt-2">
                    <Folder className="w-4 h-4 fill-orange-900/30" />
                    <span>providers/</span>
                  </div>
                  <div className="ml-6 border-l border-zinc-800 pl-4 text-zinc-400 text-xs flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Box className="w-3 h-3" /> tanstack-query-provider.tsx
                    </div>
                    <div className="flex items-center gap-2">
                      <Palette className="w-3 h-3" /> theme-provider.tsx
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 mt-2">
                    <Folder className="w-4 h-4 fill-slate-900/30" />
                    <span>config/</span>
                  </div>
                  <div className="ml-6 border-l border-zinc-800 pl-4 text-zinc-400 text-xs flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Settings className="w-3 h-3" /> dashboard-nav.ts
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border bg-secondary/10 flex flex-col gap-2">
              <span className="font-semibold flex items-center gap-2">
                <Component className="w-4 h-4" /> Atomic Design
              </span>
              <p className="text-xs text-muted-foreground">
                UI components are separated into atomic primitives (ui/) and
                molecular features (dashboard/).
              </p>
            </div>
            <div className="p-4 rounded-xl border bg-secondary/10 flex flex-col gap-2">
              <span className="font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" /> Custom Hooks
              </span>
              <p className="text-xs text-muted-foreground">
                Data fetching logic is abstracted into granular hooks, keeping
                UI components clean.
              </p>
            </div>
            <div className="p-4 rounded-xl border bg-secondary/10 flex flex-col gap-2">
              <span className="font-semibold flex items-center gap-2">
                <ArrowRight className="w-4 h-4" /> Type Safety
              </span>
              <p className="text-xs text-muted-foreground">
                Strict Zod schemas in forms ensure data integrity before it even
                reaches the backend API.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
