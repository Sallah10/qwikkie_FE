import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
  PointsDistributionChart,
  SocialMediaChart,
  WeeklyProgressChart,
  LevelDistributionChart,
} from "@/components/dashboard/Charts";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader
        title="Analytics Dashboard"
        description="Deep dive into QWIKKIE metrics and trends"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PointsDistributionChart />
        <LevelDistributionChart />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <WeeklyProgressChart />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SocialMediaChart />
      </div>
    </div>
  );
}
