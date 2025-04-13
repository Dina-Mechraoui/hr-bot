'use client';

import { useState } from 'react';
import { Eye, EyeOff } from '@deemlol/next-icons';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
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
        <div className="relative z-10 bg-[#F9F5F6] w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2 rounded-2xl p-6 md:p-16">
          <div className="flex justify-center">
            <img src="/assets/LOGO.svg" alt="HRBot Logo" className="w-20 h-20" />
          </div>

          <h2 className="text-2xl font-semibold text-center mb-2">Log in</h2>
          <p className="text-sm text-center mb-6 text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="underline font-medium">
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleChange}
                fullWidth
                autoComplete="email"
              />
            </div>
            <div className="mb-4">
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={data.password}
                onChange={handleChange}
                fullWidth
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div className="text-right mt-1">
                <Link href="/auth/forgot-password" className="text-sm underline text-gray-700 hover:text-[#468585]">
                  Forgot your password
                </Link>
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
