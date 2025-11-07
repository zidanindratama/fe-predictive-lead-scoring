import * as React from "react";
import { Navbar } from "@/components/site-navbar";
import { Poppins } from "next/font/google";

export const metadata = {
  title: {
    default: "NAMA WEB",
    template: "NAMA WEB",
  },
  description: "DESKRIPSI WEB",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins", 
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <body className={`${poppins.variable} antialiased`}>
        <Navbar />
        <main className="min-h-[calc(100dvh-64px-200px)]">{children}</main>  
      </body>
      
    </>
  );
}
