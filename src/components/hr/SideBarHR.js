'use client';

import React, { useState } from 'react';
import {
  Search,
  FileText,
  BarChart,
  Settings,
  LogOut,
  Menu
} from '@deemlol/next-icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function SideBarHR() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const navLinks = [
    { href: '/hr-dashboard/status', icon: <Search className="w-5 h-5" />, label: "Applications' Status" },
    { href: '/hr-dashboard/posts', icon: <FileText className="w-5 h-5" />, label: 'Posts' },
    { href: '/hr-dashboard/tracker', icon: <BarChart className="w-5 h-5" />, label: 'Usage Tracker' },
    { href: '/hr-dashboard/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' }
  ];

  return (
    <>
      <div className="md:hidden fixed top-1 left-1 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded bg-[#468585] text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* 💻 Desktop Sidebar */}
      <aside className="hidden md:flex h-screen lg:w-36 w-20 flex-col items-center bg-white border-r border-gray-200 py-6 justify-between transition-all duration-300">
        {/* Desktop content */}
        <SidebarContent isActive={isActive} navLinks={navLinks} />
      </aside>

      {/* 📱 Mobile Drawer Sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed  inset-0 z-40 bg-black/30" onClick={() => setMobileOpen(false)}>
          <div
            className="w-36 h-full bg-white shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent isActive={isActive} navLinks={navLinks} isMobile />
          </div>
        </div>
      )}
    </>
  );
}

// 🧩 Sidebar Content (reusable)
function SidebarContent({ isActive, navLinks, isMobile = false }) {
  return (
    <div className="w-full flex flex-col items-center justify-between h-full">
      <div className="w-full flex flex-col items-center">
        <img src="/assets/LOGO.svg" alt="Bot Icon" className="w-12 h-12 mb-6" />

        {/* Avatar */}
        <div className="flex flex-col w-full items-center bg-[#468585] mb-6 p-2">
          <img src="/assets/avatar.png" alt="Profile" className="w-12 h-12 rounded-full" />
          <p className="text-white px-4 py-1 mt-2 font-medium text-sm">Lilia Ali</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col font-semibold items-center space-y-6 w-full px-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center text-center gap-2 ${
                isActive(link.href) ? 'text-[#468585]' : 'text-black'
              } hover:text-[#386969]`}
            >
              {link.icon}
              <span className="text-xs">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Log Out */}
      <button className="mb-2 flex items-center gap-2 border border-[#468585] text-[#468585] hover:bg-[#468585] hover:text-white transition px-4 py-2 rounded-full text-sm">
        <LogOut className="w-4 h-4" />
        <span>Log Out</span>
      </button>
    </div>
  );
}
