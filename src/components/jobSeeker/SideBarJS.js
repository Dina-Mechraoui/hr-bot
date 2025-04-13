'use client';

import React, { useState } from 'react';
import {
  Search,
  FileText,
  BarChart,
  Settings,
  X,
  Menu
} from '@deemlol/next-icons';
import { usePathname } from 'next/navigation';
import SidebarContent from '../SidebarContent';

export default function SideBarJS() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const navLinks = [
    { href: '/js-dashboard/posts', icon: <Search className="w-5 h-5" />, label: "Posts" },
    { href: '/js-dashboard/resume-consultor', icon: <FileText className="w-5 h-5" />, label: 'Resume Consultor' },
    { href: '/js-dashboard/status', icon: <BarChart className="w-5 h-5" />, label: 'Applications Status' },
    { href: '/js-dashboard/tracker', icon: <Settings className="w-5 h-5" />, label: 'Usage Tracker'},
    { href: '/js-dashboard/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' }
  ];

  return (
    <>
      <div className="md:hidden fixed top-1 left-1 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 rounded  p-1 bg-[#468585] text-white" />}
        </button>
      </div>

      <aside className="hidden md:flex h-screen lg:w-36 w-20 flex-col items-center bg-white border-r border-gray-200 py-6 justify-between transition-all duration-300">
        <SidebarContent isActive={isActive} navLinks={navLinks} />
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed  inset-0 z-40 bg-black/30" onClick={() => setMobileOpen(false)}>
          <div
            className="w-36 h-full bg-white shadow-md"
          >
            <SidebarContent isActive={isActive} navLinks={navLinks} isMobile />
          </div>
        </div>
      )}
    </>
  );
}

