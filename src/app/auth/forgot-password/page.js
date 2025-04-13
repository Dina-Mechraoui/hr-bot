'use client';

import { useState } from 'react';
import { Eye, EyeOff } from '@deemlol/next-icons';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
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

        <h2 className="text-2xl font-semibold text-center mb-2">
          {step === 1 && 'Reset Password'}
          {step === 2 && 'Enter Verification Code'}
          {step === 3 && 'Create New Password'}
        </h2>

        <p className="text-sm text-center mb-6 text-gray-600">
          {step === 1 &&
            'Enter your email address to receive a verification code.'}
          {step === 2 &&
            'We’ve sent a verification code to your email. Please enter it below.'}
          {step === 3 &&
            'Create a new secure password for your account.'}
        </p>

        <form>
          {step === 1 && (
            <div className="mb-4">
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                placeholder="Enter your email"
                fullWidth
                autoComplete="email"
              />
            </div>
          )}

          {step === 2 && (
            <div className="mb-4">
              <TextField
                id="code"
                name="code"
                label="Verification Code"
                type="text"
                variant="outlined"
                placeholder="Enter the code sent to your email"
                fullWidth
              />
            </div>
          )}

          {step === 3 && (
            <div className="mb-4">
              <TextField
                id="newPassword"
                name="newPassword"
                label="New Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your new password"
                fullWidth
                autoComplete="new-password"
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
            </div>
          )}

          <button
            type="submit"
            onClick={(e) => {
                e.preventDefault();
                step === 1
                ? setStep(2)
                : step === 2
                ? setStep(3)
                : router.push('/auth/signin');
            }}
            className="w-full mt-4 cursor-pointer bg-[#468585] text-white font-semibold py-2 rounded-full hover:bg-[#386969] transition"
          >
            {step === 1 && 'Send Code'}
            {step === 2 && 'Verify Code'}
            {step === 3 && 'Reset Password'}
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-600">
          <Link href="/auth/signin" className="underline hover:text-[#468585]">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
