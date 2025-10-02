import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsOverview from "@/components/dashboard/StatsOverview";
import Leaderboard from "@/components/dashboard/Leaderboard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
// import RewardsProgress from "@/components/dashboard/RewardsProgress";
import MemberManagement from "@/components/dashboard/MemberManagement";
// import {
//   PointsDistributionChart,
//   SocialMediaChart,
//   WeeklyProgressChart,
//   LevelDistributionChart,
// } from "@/components/dashboard/Charts";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Only show header on desktop - mobile uses MobileNavbar */}
        <div className="hidden md:block mt-4">
          <DashboardHeader
            title="QWIKKIE Rewards Dashboard"
            description="Monitor member activities and reward progress"
          />
        </div>

        <StatsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Leaderboard />
          <RecentActivity />
        </div>
        {/* 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PointsDistributionChart />
        <LevelDistributionChart />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <WeeklyProgressChart />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SocialMediaChart />
      </div> */}

        {/* <RewardsProgress /> */}

        <MemberManagement />
      </div>
    </DashboardLayout>
  );
}
