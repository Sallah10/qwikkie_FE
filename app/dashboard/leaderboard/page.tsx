// src/app/dashboard/leaderboard/page.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Leaderboard from "@/components/dashboard/Leaderboard";

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader
        title="Leaderboard"
        description="View top performers and rankings"
      />
      <Leaderboard />
    </div>
  );
}
