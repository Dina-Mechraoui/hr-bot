'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from "@deemlol/next-icons";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleScrollLink = (id) => {
      const section = document.getElementById(id);
      section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="border-black border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex justify-between items-center py-3 w-full">
          <div className="hidden md:flex items-center w-2/3 gap-8">
            <Link href="/" className="flex items-center gap-3">
              <img src="/assets/LOGO.svg" alt="HRBot Logo" className="w-10 h-10" />
              <span className="text-teal-700 text-xl font-bold">HRBot</span>
            </Link>
            <div className="h-6 w-px bg-black mx-2" />
            <div className="flex items-center gap-6">
              <button
                onClick={() => handleScrollLink('features')}
                className="font-semibold cursor-pointer hover:text-teal-700 text-md"
              >
                Features
              </button>
              <button
                onClick={() => handleScrollLink('about')}
                className="font-semibold cursor-pointer hover:text-teal-700 text-md"
              >
                About Us
              </button>
              <button
                onClick={() => handleScrollLink('contact')}
                className="font-semibold cursor-pointer hover:text-teal-700 text-md"
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-end gap-4 w-1/3">
            <Link
              href="/auth/signin"
              className="border-teal-700 text-black border-2 font-semibold px-6 py-2 rounded-full hover:bg-teal-50 transition"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="bg-teal-700 text-white border-2 border-teal-700 font-semibold px-6 py-2 rounded-full hover:bg-teal-800 transition"
            >
              Join Now
            </Link>
          </div>

          <div className="md:hidden flex justify-between items-center w-full">
            <Link href="/" className="flex items-center">
              <img src="/assets/LOGO.svg" alt="HRBot Logo" className="w-12 h-12" />
              <span className="text-teal-700 text-xl font-bold">HRBot</span>
              <div className="hidden md:block h-8 w-px bg-black mx-4"></div>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4 flex flex-col items-center w-full">
            <button
              onClick={() => {
                handleScrollLink('features');
                setIsOpen(false);
              }}
              className="w-full text-center font-semibold py-2"
            >
              Features
            </button>
            <button
              onClick={() => {
                handleScrollLink('about');
                setIsOpen(false);
              }}
              className="w-full text-center font-semibold py-2"
            >
              About Us
            </button>

            <button
              onClick={() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                setIsOpen(false);
              }}
              className="w-full text-center font-semibold py-2"
            >
              Contact Us
            </button>

            <Link
              href="/auth/signin"
              className="w-full text-center font-semibold border-2 rounded-md border-teal-700 px-4 py-2"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>

            <Link
              href="/auth/signup"
              className="w-full text-center font-semibold text-white bg-teal-700 px-4 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Join Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
