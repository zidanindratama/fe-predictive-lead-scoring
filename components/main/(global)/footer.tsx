import Link from "next/link";

export const Footer = () => {
  const mainLinks = [
    { name: "About", href: "/about-us" },
    { name: "Workflow", href: "/workflow" },
    { name: "Features", href: "/features" },
    { name: "Tour", href: "/tour" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative bg-background text-foreground border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  S
                </span>
              </div>
              <span className="font-bold text-xl tracking-tight">
                SmartBank
              </span>
            </div>
            <p className="text-muted-foreground text-lg md:text-xl max-w-md leading-relaxed">
              Empowering financial institutions with next-generation AI
              prediction models. We turn data into closed deals.
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <nav className="flex flex-col gap-2">
              {mainLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center justify-between border-b border-border py-6 text-2xl md:text-3xl font-medium transition-all hover:text-primary hover:pl-4"
                >
                  {link.name}
                  <span className="opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-lg">
                    ↗
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="w-full border-t border-border pt-10 mb-10">
          <h1 className="text-[13vw] leading-[0.8] font-bold tracking-tighter text-center text-foreground/5 select-none pointer-events-none">
            SMARTBANK
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SmartBank Inc.</p>

          <div className="flex items-center gap-8">
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
    </footer>
  );
};
