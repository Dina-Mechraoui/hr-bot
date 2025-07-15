'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {
  const searchParams = useSearchParams();
  return (
    <div
      className={`
        relative min-h-screen flex items-center justify-center
        bg-cover bg-center bg-no-repeat
        sm:bg-none
      `}
      style={{ backgroundImage: "url('/assets/SignMenu.png')" }}
    >
      <div className="hidden sm:block absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />
      <section
        className={`
          relative z-10 bg-[#F9F5F6]
          w-full md:w-11/12 xl:w-1/2
          max-h-md
          rounded-none md:rounded-2xl
          p-6 sm:p-10 md:p-12 lg:p-16
          shadow-none sm:shadow-lg
          flex flex-col justify-center
        `}
      >
        <div className="flex justify-center mb-6 sm:mb-10">
          <img
            src="/assets/LOGO.svg"
            alt="HRBot Logo"
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        </div>

        <h2 className="text-lg sm:text-2xl font-semibold text-center text-gray-800 mb-8 sm:mb-12">
          Are you an HR agent or a Job Seeker?
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col justify-between text-center space-y-4 p-4">
            <div>
              <h3 className="font-bold text-xl text-gray-800">HR Agent</h3>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                Are you an HR professional looking to streamline your recruitment process? Our AI tool lets you easily post job offers, track applicants, and use a chatbot for initial interviews.
              </p>
            </div>
            <Link
              href='/register/recruiter'
              className="w-full bg-[#468585] text-white font-semibold py-3 rounded-full hover:bg-[#386969] transition"
            >
              I am an HR agent
            </Link>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <span className="w-px bg-[#D9D9D9] h-40" />
          </div>

          <div className="flex-1 flex flex-col justify-between text-center space-y-4 p-4">
            <div>
              <h3 className="font-bold text-xl text-gray-800">Job Seeker</h3>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                Are you seeking new opportunities? Our AI tool matches your skills with job offers, gives feedback on your resume, and helps you find your next step with confidence.
              </p>
            </div>
            <Link
              href={`/register/candidate?redirect=${searchParams.get("redirect") || ''}`}
              className="w-full bg-[#468585] text-white font-semibold py-3 rounded-full hover:bg-[#386969] transition"
            >
              I am a job seeker
            </Link>
          </div>
        </div>

        <p className="text-sm mt-10 text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="underline font-medium text-[#468585] hover:text-[#386969]">
            Log in
          </Link>
        </p>
      </section>
    </div>
  );
}
