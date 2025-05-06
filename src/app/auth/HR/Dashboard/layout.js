'use client';

import SideBarHR from "@/components/hr/SideBarHR";
export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <SideBarHR />
      <main className="flex-1 bg-[#F9F5F6] min-h-screen p-6">
        {children}
      </main>
    </div>
  );
}
