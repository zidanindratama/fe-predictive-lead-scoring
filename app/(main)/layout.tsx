import { Footer } from "@/components/main/(global)/footer";
import { Navbar } from "@/components/main/(global)/navbar";
import * as React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
