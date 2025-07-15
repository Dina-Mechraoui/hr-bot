'use client';

import Link from 'next/link';

export default function NavLinkGroup({ navLinks = [], isActive }) {
  return (
    <nav className="flex flex-col items-center gap-6 mt-6 w-full">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex flex-col items-center text-sm transition ${
            isActive(link.href)
              ? 'text-[#468585] font-semibold'
              : 'text-gray-600 hover:text-[#468585]'
          }`}
        >
          <div
            className={`p-2 rounded-full ${
              isActive(link.href) ? 'bg-[#e0f2f1]' : ''
            }`}
          >
            {link.icon}
          </div>
          <span className="mt-1 text-xs text-center">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
