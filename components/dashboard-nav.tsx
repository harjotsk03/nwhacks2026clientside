// components/dashboard-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  Users,
  Store,
  PlayCircle,
  BarChart3,
  Settings,
  Layers,
  Workflow,
  UserCircle2,
  Computer,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Simulation", href: "/dashboard/simulator", icon: Workflow },
  { name: "Customers", href: "/dashboard/customers", icon: UserCircle2 },
  { name: "Integrations", href: "/dashboard/integrations", icon: Computer },
  // { name: "Market Context", href: "/market", icon: Layers },
  // { name: "Business Info", href: "/business", icon: Store },
  // { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 p-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-slate-100",
              pathname === item.href
                ? "bg-slate-100 text-black"
                : "text-slate-500",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
