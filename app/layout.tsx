import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata, Viewport } from "next";
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
    default:
      "SmartBank - AI-Powered Predictive Lead Scoring for Modern Banking",
    template: "%s | SmartBank Enterprise",
  },
  description:
    "Revolutionize your banking sales with SmartBank. Our AI engine analyzes customer data to predict conversion probabilities with 94% accuracy. Stop guessing, start closing.",
  applicationName: "SmartBank Enterprise",
  authors: [{ name: "SmartBank Team", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "Lead Scoring",
    "Banking AI",
    "Predictive Analytics",
    "Fintech Dashboard",
    "Customer Intelligence",
    "Machine Learning for Banks",
    "Sales Optimization",
    "Conversion Rate Optimization",
    "B2B Fintech",
    "Enterprise AI",
  ],
  creator: "SmartBank Inc.",
  publisher: "SmartBank Inc.",
  category: "Finance",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "SmartBank - The Future of Banking Sales Intelligence",
    description:
      "Empower your sales team with AI-driven insights. Predict customer needs, optimize campaigns, and maximize revenue with SmartBank.",
    siteName: "SmartBank Enterprise",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SmartBank Dashboard - AI Predictive Analytics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartBank - AI Predictive Lead Scoring",
    description:
      "Transform raw banking data into actionable sales insights. #Fintech #AI #Banking",
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
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
