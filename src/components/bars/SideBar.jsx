'use client';

import { usePathname } from 'next/navigation';
import { navLinks } from '@/config/navLinks';
import { useState } from 'react';
import { Menu, X } from '@deemlol/next-icons';
import SidebarContent from './sidebar/SidebarContent';

export default function SideBar({ role }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = navLinks[role] || [];
  const isActive = (path) => pathname.startsWith(path);

  return (
    <>
      <div className="md:hidden fixed top-1 left-1 z-50 ">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-8 h-8 bg-[#468585] text-white p-1 rounded" />}
        </button>
      </div>

      <aside className="hidden md:flex h-screen w-30 lg:w-36 flex-col items-center bg-white border-r py-6">
        <SidebarContent navLinks={links} isActive={isActive} />
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/30" onClick={() => setMobileOpen(false)}>
          <div className="w-36 h-full bg-white shadow-md">
            <SidebarContent navLinks={links} isActive={isActive} isMobile />
          </div>
        </div>
      )}
    </>
  );
}
