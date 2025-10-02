// components/dashboard/DashboardLayout.tsx
"use client";

import { useEffect, useState, useCallback } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // This function will be called to refresh ALL data
  const refreshAllData = useCallback(async () => {
    if (isRefreshing) return;

    console.log("🔄 Auto-refreshing all dashboard data...");
    setIsRefreshing(true);

    try {
      // Dispatch a custom event that all components can listen to
      window.dispatchEvent(new CustomEvent("dashboardRefresh"));
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Auto-refresh failed:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  useEffect(() => {
    let refreshInterval: NodeJS.Timeout;
    let inactivityTimer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        clearInterval(refreshInterval); // Stop refresh when inactive
        console.log("⏸️ Auto-refresh paused due to inactivity");
      }, 2 * 60 * 1000); // 2 minutes inactivity
    };

    const setupRefresh = () => {
      refreshInterval = setInterval(refreshAllData, 5 * 60 * 1000); // 5 minutes
    };

    // Start everything
    setupRefresh();
    resetInactivityTimer();

    // Listen for user activity
    const events = ["mousemove", "keypress", "click", "scroll", "touchstart"];
    events.forEach((event) => {
      document.addEventListener(event, resetInactivityTimer);
    });

    return () => {
      clearInterval(refreshInterval);
      clearTimeout(inactivityTimer);
      events.forEach((event) => {
        document.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [refreshAllData]);

  return (
    <div className="p-6 space-y-6">
      {/* Refresh Indicator */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bot Moderator Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {isRefreshing && (
            <span className="animate-pulse">🔄 Refreshing...</span>
          )}
          <span>Last update: {lastRefresh.toLocaleTimeString()}</span>
        </div>
      </div>

      {children}
    </div>
  );
}
