import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata, Viewport } from "next"; // Tambah Viewport
import { Poppins } from "next/font/google";
import TanStackProvider from "@/providers/tanstack-query-provider";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://fe-predictive-lead-scoring.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SmartBank - AI Predictive Lead Scoring for Banking",
    template: "%s | SmartBank",
  },
  description:
    "Transform raw banking data into actionable sales insights. SmartBank uses advanced Machine Learning to predict customer conversion probabilities with 94% accuracy.",
  keywords: [
    "Lead Scoring",
    "Banking AI",
    "Predictive Analytics",
    "Fintech Dashboard",
    "Customer Intelligence",
    "Machine Learning for Banks",
  ],
  authors: [{ name: "SmartBank Team", url: SITE_URL }],
  creator: "SmartBank Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "SmartBank - AI Predictive Lead Scoring",
    description:
      "Stop guessing, start converting. The #1 AI prediction engine for modern financial institutions.",
    siteName: "SmartBank",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SmartBank Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartBank - AI Predictive Lead Scoring",
    description: "Transform raw banking data into actionable sales insights.",
    images: ["/og-image.png"],
    creator: "@zidanindratama",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanStackProvider>
            <main>{children}</main>
            <Toaster position="top-center" />
          </TanStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
