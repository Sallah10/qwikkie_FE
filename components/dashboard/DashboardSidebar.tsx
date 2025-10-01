// src/components/dashboard/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Trophy,
  Activity,
  BarChart3,
  Settings,
  Award,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Members", href: "/dashboard/members", icon: Users },
  { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { name: "Activities", href: "/dashboard/activities", icon: Activity },
  { name: "Rewards", href: "/dashboard/rewards", icon: Award },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Award className="h-6 w-6" />
            <span className="text-xl">QWIKKIE</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
