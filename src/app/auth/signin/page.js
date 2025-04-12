'use client';
import { useState } from 'react';
import { Eye, EyeOff } from '@deemlol/next-icons';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', data);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/loginPic.png')" }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs z-0" />

      <div className="relative z-10 bg-[#F9F5F6] w-2/3 lg:w-1/2 rounded-2xl p-6 md:p-16">
        <div className="flex justify-center">
          <img src="/assets/LOGO.svg" alt="HRBot Logo" className="w-20 h-20" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">Log in</h2>
        <p className="text-sm text-center mb-6 text-gray-600">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="underline font-medium">
            Sign up
          </a>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-[#666666] mb-1">
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              className="w-full border border-[#C6C3C4] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#468585]"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-[#666666] mb-1">
              Your password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={data.password}
                onChange={handleChange}
                className="w-full border border-[#C6C3C4] rounded-md px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-[#468585]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="text-right mt-1">
              <a href="#" className="text-sm underline text-gray-700 hover:text-[#468585]">
                Forgot your password
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 cursor-pointer bg-[#468585] text-white font-semibold py-2 rounded-full hover:bg-[#386969] transition"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
