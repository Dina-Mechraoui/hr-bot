'use client';

import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="flex flex-row items-center justify-between px-6 lg:pt-16 bg-white">
      <div className="w-full lg:w-1/2 hidden lg:grid grid-cols-5 grid-rows-4 gap-6">
        <div className="rounded-xl overflow-hidden shadow-md justify-self-end self-end max-w-72 col-span-3 row-span-2">
          <img
            src="/assets/pic1.png"
            alt="Main visual"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-xl overflow-hidden shadow-md col-span-2 row-span-2 max-h-56 max-w-48 row-start-2 col-start-4">
          <img
            src="/assets/pic2.png"
            alt="Interview"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-xl overflow-hidden shadow-md col-span-2 row-span-2 max-h-56 max-w-48 justify-self-end col-start-2">
          <img
            src="/assets/pic3.png"
            alt="Resume"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 mt-12 lg:mt-0 lg:pl-16 space-y-8 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          Welcome to HR Bot
        </h1>
        <p className="text-gray-800 text-md md:text-lg font-medium leading-relaxed">
          Optimize your hiring process or advance your job search with our AI-driven tools.
          Whether you&apos;re an HR professional seeking to streamline recruitment or a job seeker
          aiming to improve your career prospects, HR-Agent is here to support you.
          Choose your role below to begin your journey.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <Link
            href="/auth/signup/hr"
            className="bg-[#468585] cursor-pointer text-white font-semibold py-2 px-8 rounded-full hover:bg-[#386969] transition"
          >
            I am an HR
          </Link>
          <Link
            href="/auth/signup/jobseeker"
            className="bg-[#468585] cursor-pointer text-white font-semibold py-2 px-8 rounded-full hover:bg-[#386969] transition"
          >
            I am a Job Seeker
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
