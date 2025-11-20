import {
  LayoutDashboard,
  Users,
  UserCog,
  Megaphone,
  Settings,
  BrainCircuit,
  FileText,
  LifeBuoy,
  Upload,
  History,
  PlusCircle,
} from "lucide-react";

export const navItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: UserCog,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
    items: [
      {
        title: "All Customers",
        url: "/dashboard/customers",
        icon: Users,
      },
      {
        title: "Import Data",
        url: "/dashboard/customers/import",
        icon: Upload,
      },
    ],
  },
  {
    title: "Predictions",
    url: "/dashboard/predictions",
    icon: BrainCircuit,
    items: [
      {
        title: "Prediction History",
        url: "/dashboard/predictions",
        icon: History,
      },
      {
        title: "Single Prediction",
        url: "/dashboard/predictions/create",
        icon: PlusCircle,
      },
    ],
  },
  {
    title: "Campaigns",
    url: "/dashboard/campaigns",
    icon: Megaphone,
    items: [
      {
        title: "All Campaigns",
        url: "/dashboard/campaigns",
      },
      {
        title: "Create Campaign",
        url: "/dashboard/campaigns/create",
      },
    ],
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
