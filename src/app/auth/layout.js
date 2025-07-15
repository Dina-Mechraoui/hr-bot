'use client';
import SideBar from "@/components/bars/SideBar";
import React from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function DashboardLayout({ children }) {
  const user = useCurrentUser();
  const allowedRoles = ['Candidate', 'HR', 'Admin'];
  const role = allowedRoles.includes(user?.role) ? user.role : null;

  if (!role) {
    return (
      <main className="flex-1 bg-[#F9F5F6] min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Unauthorized: Role not recognized</p>
      </main>
    );
  }
  return (
    <div className="flex h-screen min-h-0 overflow-auto">
      <SideBar role={role} />
      <main className="flex-1 bg-[#F9F5F6] p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
