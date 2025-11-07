"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navigationItems = [
  { href: "/", label: "Landing" },
  { href: "/PageA", label: "PageA" },
  { href: "/PageB", label: "PageB" },
  { href: "/PageC", label: "PageC" },
];

export function Navbar() {
  const pathName = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-600 font-sans">
      <nav className="md:grid md:grid-cols-3 flex items-center md:justify-items-center justify-between py-8 px-6 min-w-screen">

        {/* Desktop version */}
        <ul className="hidden md:flex gap-8">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn("text-md font-medium transition-colors hover:text-primary", pathName === item.href ? "text-primary" : "text-gray-600")}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        
        <Link href="/" className="text-[1.375rem]">
          NAMA WEB {/* Temporary Logo */}
        </Link>

        {/* Login Button */}
        <div className="hidden md:block">
          <Button asChild>
            <Link href="/PageD">Get Started</Link>
          </Button>
        </div>

        {/* Mobile version button */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile version */}
        {open && (
          <div className="absolute top-full left-0 w-full border-y border-gray-600 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <ul className="flex flex-col items-center gap-4 py-6">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn("text-lg font-medium transition-colors hover:text-primary", pathName === item.href ? "text-primary" : "text-gray-600")}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Button asChild className="mt-2">
                  <Link href="/PageD">Get Started</Link>
                </Button>
              </li>
            </ul>
          </div>
        )}

      </nav>

    </header>
  )
}
