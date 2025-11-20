import {
  LayoutDashboard,
  Users,
  Megaphone,
  LineChart,
  Settings,
  BrainCircuit,
  FileText,
  LifeBuoy,
  CreditCard,
} from "lucide-react";

export const navItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
    items: [
      { title: "All Customers", url: "/dashboard/customers" },
      { title: "Import Data", url: "/dashboard/customers/import" },
      { title: "Segments", url: "/dashboard/customers/segments" },
    ],
  },
  {
    title: "Campaigns",
    url: "/dashboard/campaigns",
    icon: Megaphone,
    items: [
      { title: "Active Campaigns", url: "/dashboard/campaigns/active" },
      { title: "Drafts", url: "/dashboard/campaigns/drafts" },
      { title: "Archives", url: "/dashboard/campaigns/archives" },
    ],
  },
  {
    title: "Predictions",
    url: "/dashboard/predictions",
    icon: BrainCircuit,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: LineChart,
  },
];

export const navSecondary = [
  {
    title: "Documentation",
    url: "/docs",
    icon: FileText,
  },
  {
    title: "Support",
    url: "/support",
    icon: LifeBuoy,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];
