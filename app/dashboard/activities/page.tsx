import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function ActivitiesPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader
        title="Activity Feed"
        description="Monitor all member activities"
      />
      <RecentActivity />
    </div>
  );
}
