// src/app/dashboard/layout.tsx
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavbar from "@/components/dashboard/MobileNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Navigation Bar - hidden on desktop */}
        <MobileNavbar />

        {/* Content with padding for mobile nav */}
        <main className="flex-1 overflow-auto pt-16 md:pt-0 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
