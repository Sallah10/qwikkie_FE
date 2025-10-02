// src/app/dashboard/members/page.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MemberManagement from "@/components/dashboard/MemberManagement";

export default function MembersPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader
        title="Member Management"
        description="View and manage all QWIKKIE members"
      />
      <MemberManagement isStandalone={true} />
    </div>
  );
}
