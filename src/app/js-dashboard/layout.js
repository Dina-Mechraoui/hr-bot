'use client';

import SideBarJS from "@/components/jobSeeker/SideBarJS";
export default function DashboardJSLayout({ children }) {
  return (
    <div className="flex">
      <SideBarJS />
      <main className="flex-1 bg-[#F9F5F6] min-h-screen p-6">
        {children}
      </main>
    </div>
  );
}
