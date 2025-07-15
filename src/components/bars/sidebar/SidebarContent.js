'use client';

import { LogOut } from '@deemlol/next-icons';
import { useLogout } from '@/hooks/useLogout';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import UserCard from './UserCard';
import NavLinkGroup from './NavLinkGroup';

export default function SidebarContent({ navLinks = [], isActive }) {
  const user = useCurrentUser();
  const { handleLogout, loading, error } = useLogout();

  return (
    <div className="w-full flex flex-col items-center justify-between h-screen py-4 sm:py-0 overflow-hidden">
      <div className="flex flex-col w-full items-center justify-center space-y-4">
        <img src="/assets/LOGO.svg" alt="Logo" className="w-12 h-12" />
        <UserCard
          fullName={user?.full_name}
          avatar={user?.avatar || '/assets/avatar.png'}
        />

        <NavLinkGroup navLinks={navLinks} isActive={isActive} />
      </div>

      <div className="flex flex-col items-center shrink-0">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center text-xs text-[#468585] hover:text-white hover:bg-[#468585] px-3 py-2 rounded-full transition border border-[#468585] disabled:opacity-60"
        >
          <LogOut className="w-4 h-4" />
          <span className="mt-1">{loading ? "Logging out..." : "Log Out"}</span>
        </button>
        {error && <p className="text-red-500 text-xs mt-1 text-center">{error}</p>}
      </div>
    </div>
  );
}
