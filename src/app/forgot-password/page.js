'use client';

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from '@deemlol/next-icons';
import { forgotPasswordCode, resetPassword, verifyCode } from '@/api/auth';
import toast from 'react-hot-toast';
import PasswordField from '@/components/common/PasswordField';

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (step === 1) {
        const result = await forgotPasswordCode(email);
        if (result?.success) {
          setStep(2);
        } else {
          setError(result?.error || "Failed to send verification code.");
        }
      } else if (step === 2) {
        const result = await verifyCode(email, code);
        if (result?.success) {
          setStep(3);
        } else {
          setError(result?.error || "Invalid verification code.");
        }
      } else if (step === 3) {
        const result = await resetPassword(email, code ,newPassword);
        if (result?.success) {
          toast.success("Password reset successfully!");
          router.push('/login');
        } else {
          setError(result?.error || "Failed to reset password.");
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/loginPic.png')" }}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs z-0" />
      <div className="relative z-10 bg-[#F9F5F6] w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2 rounded-2xl p-6 md:p-16">
        <div className="flex justify-center mb-4">
          <img src="/assets/LOGO.svg" alt="HRBot Logo" className="w-20 h-20" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          {step === 1 && 'Reset Password'}
          {step === 2 && 'Enter Verification Code'}
          {step === 3 && 'Create New Password'}
        </h2>

        <p className="text-sm text-center text-gray-600 mb-6">
          {step === 1 && 'Enter your email address to receive a verification code.'}
          {step === 2 && 'Check your inbox and enter the code we sent.'}
          {step === 3 && 'Create a secure new password.'}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {step === 1 && (
            <TextField
              id="email"
              label="Email"
              placeholder="Enter your email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={step === 1 ? error : ''}
            />
          )}

          {step === 2 && (
            <TextField
              id="code"
              label="Verification Code"
              placeholder="Enter the code"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
              error={!!error}
              helperText={step === 2 ? error : ''}
            />
          )}

          {step === 3 && (
            <PasswordField 
              name='newPassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={!!error}
              helperText={step === 3 ? error : ''}
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#468585] text-white font-semibold py-2 rounded-full hover:bg-[#386969] transition disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : step === 1
              ? "Send Code"
              : step === 2
              ? "Verify Code"
              : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-600">
          <Link href="/login" className="underline hover:text-[#468585]">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}