"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";

export const ContactForm = () => {
  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-5 min-h-[650px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#050505]"
        >
          <div className="lg:col-span-2 relative p-10 md:p-14 flex flex-col justify-between text-white overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-zinc-900 to-black z-0" />
            <div className="absolute top-0 left-0 w-full h-full opacity-20 z-1" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] z-2 group-hover:bg-primary/30 transition-colors duration-700" />

            <div className="relative z-10">
              <div className="mb-12">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1] mb-6">
                  Let's build the <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500">
                    future
                  </span>{" "}
                  together.
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-sm">
                  Ready to deploy predictive AI? Our engineers are standing by
                  to architect your solution.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    label: "Email Us",
                    value: "hello@smartbank.ai",
                    link: "mailto:hello@smartbank.ai",
                  },
                  {
                    icon: MapPin,
                    label: "Visit Us",
                    value: "Silicon Valley, CA",
                    link: "#",
                  },
                  {
                    icon: MessageCircle,
                    label: "Live Support",
                    value: "Available 24/7",
                    link: "#",
                  },
                ].map((item, i) => (
                  <a
                    href={item.link}
                    key={i}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 group-hover/item:bg-primary group-hover/item:text-white group-hover/item:border-primary transition-all duration-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-lg font-medium text-zinc-200 group-hover/item:text-white transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
              <p className="text-zinc-500 text-sm">
                &copy; 2024 SmartBank Inc. <br /> All secure communications
                encrypted.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 bg-background/95 backdrop-blur-xl p-10 md:p-14 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 w-full h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-50" />

            <form className="space-y-8 max-w-lg mx-auto w-full relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">
                    First Name
                  </label>
                  <Input
                    placeholder="John"
                    className="h-14 bg-secondary/30 border-transparent focus:bg-background focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all rounded-xl text-lg placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">
                    Last Name
                  </label>
                  <Input
                    placeholder="Doe"
                    className="h-14 bg-secondary/30 border-transparent focus:bg-background focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all rounded-xl text-lg placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">
                  Work Email
                </label>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  className="h-14 bg-secondary/30 border-transparent focus:bg-background focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all rounded-xl text-lg placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">
                  What can we help you with?
                </label>
                <Textarea
                  placeholder="Tell us about your project goals, timeline, and budget..."
                  className="min-h-40 resize-none bg-secondary/30 border-transparent focus:bg-background focus:border-primary/30 focus:ring-4 focus:ring-primary/10 transition-all rounded-xl text-lg p-4 placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="pt-4">
                <Button
                  size="lg"
                  className="w-full h-16 rounded-full text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25 group"
                >
                  Send Message
                  <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
