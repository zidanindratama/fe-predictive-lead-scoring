"use client"

import { Facebook, Instagram, Mail, MapPin, Phone, Send, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationLinks = [
  { href: "/", label: "Landing" },
  { href: "/PageA", label: "PageA" },
  { href: "/PageB", label: "PageB" },
  { href: "/PageC", label: "PageC" },
]

const companyLinks = [
  { href: "/PageE", label: "PageE" },
]

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Send, label: "YouTube", href: "#" },
]

const chatLinks = [
  { icon: Zap, label: "Viber", href: "#" },
  { icon: Send, label: "Telegram", href: "#" },
  { icon: Phone, label: "WhatsApp", href: "#" },
]

interface SiteFooterProps {
  className?: string
}

export function Footer({ className }: SiteFooterProps) {
  return (
    <footer className={cn("bg-black z-49 top-0 left-0 right-0 border-t border-gray-600", className)}>
      {/* Footer */}
      <div className="py-16 flex flex-col items-center min-w-screen">
        <div className="grid grid-cols-1 gap-12">
          <div className="grid md:grid-cols-2 gap-20">
            {/* Navigation Section */}
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">Navigation</h3>
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-gray-600 transition-colors hover:text-primary">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links Section */}
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">Team</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-gray-600 transition-colors hover:text-primary">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>  
          </div>
          
          {/* <div className="grid md:grid-cols-1"> */}
            {/* Contact Section */}
            {/* <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">Contact us</h3>
              <ul className="space-y-4 flex gap-16">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <div className="space-y-1">
                    <p className="text-sm text-gray-300">+1 (406) 555-0120</p>
                    <p className="text-sm text-gray-300">+1 (480) 555-0103</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <a
                    href="mailto:help@promptverse.com"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    help@promptverse.com
                  </a>
                </li>
              </ul>
            </div> */}

            {/* Social & Chat Section */}
            {/* <div className="mt-12 flex flex-row gap-24">
              <div className="mb-10">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Follow us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className="rounded-full border border-gray-600 p-2 transition-colors hover:border-white hover:text-white"
                        aria-label={link.label}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Let's chat</h3>
                <div className="flex gap-3">
                  {chatLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className="rounded-full border border-gray-600 p-2 transition-colors hover:border-white hover:text-white"
                        aria-label={link.label}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>   */}

            {/* Location Section */}
            {/* <div className="mt-4">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Location</h3>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                <p className="text-sm text-gray-300">2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
              </div>
            </div> */}
          {/* </div> */}
          
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 border-t border-gray-800 pt-8 min-w-screen">
          <div className="grid md:grid-cols-3 grid-cols-1 items-center justify-items-center gap-4 sm:flex-row">
            <div className="flex gap-4 text-xs text-gray-500">
              <a href="#" className="transition-colors hover:text-gray-300">
                Copyright
              </a>
              <span>•</span>
              <a href="#" className="transition-colors hover:text-gray-300">
                Privacy
              </a>
              <span>•</span>
              <span>All rights reserved</span>
            </div>
            <div className="flex gap-4 text-xs text-gray-500">
              <span>© 2025 — NAMA WEB</span>
            </div>
            <div className="flex gap-2 text-xs text-gray-500">
              <a href="#" className="transition-colors hover:text-gray-300">
                En
              </a>
              <span>|</span>
              <a href="#" className="transition-colors hover:text-gray-300">
                Id
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
