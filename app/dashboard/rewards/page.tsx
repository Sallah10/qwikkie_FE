// src/app/dashboard/rewards/page.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RewardsProgress from "@/components/dashboard/RewardsProgress";

export default function RewardsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader
        title="Rewards Progress"
        description="Track member progress through reward levels"
      />
      <RewardsProgress />
    </div>
  );
}
