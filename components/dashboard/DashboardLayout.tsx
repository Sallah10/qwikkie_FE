/* eslint-disable prefer-const */
"use client";

import { useEffect, useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let refreshInterval: NodeJS.Timeout;
    let inactivityTimer: NodeJS.Timeout;

    const triggerRefresh = () => {
      console.log("🔄 Triggering dashboard refresh...");
      setRefreshTrigger((prev) => prev + 1); // This will re-render ALL children
    };

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        clearInterval(refreshInterval);
        console.log("⏸️ Auto-refresh paused due to inactivity");
      }, 2 * 60 * 1000); // 2 minutes inactivity
    };

    // Refreshes every 5 minutes
    refreshInterval = setInterval(triggerRefresh, 5 * 60 * 1000);
    resetInactivityTimer();

    // Listen for user activity
    const events = ["mousemove", "keypress", "click", "scroll"];
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
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">QWIKKIE Rewards Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Auto-refresh enabled • Last: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div key={refreshTrigger}>{children}</div>
    </div>
  );
}
