'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Eye, EyeOff } from '@deemlol/next-icons';
import Link from 'next/link';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { RegisterCandidate } from '@/api/auth';
import { useRouter } from 'next/navigation';

export default function JobSeekerSignUp() {
  const [fileName, setFileName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    email: '',
    password: '',
    gender: '',
    date_of_birth: null,
    resume: null,
    shareData: false,
  });

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'shareData') {
      setFormData((prev) => ({ ...prev, shareData: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RegisterCandidate({
        ...formData,
        date_of_birth: formData.date_of_birth?.format("YYYY-MM-DD") || "",
      });
      console.log("Registration successful:", response);
      router.push("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl px-8 max-xl:py-8 xl:py-4">
        <div className="flex justify-center mb-4">
          <img src="/assets/LOGO.svg" alt="Logo" className="w-12 h-12" />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">Sign up</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Sign up with your email address</p>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <TextField
            name="first_name"
            label="First Name"
            placeholder="Enter your First name"
            value={formData.first_name}
            onChange={handleChange}
            fullWidth
            className="!mb-3"
          />
          <TextField
            name="last_name"
            label="Last Name"
            placeholder="Enter your last name"
            value={formData.last_name}
            onChange={handleChange}
            fullWidth
            className="!mb-3"
          />

          <div className="border border-dashed flex items-center justify-between border-gray-300 rounded-md p-4 text-center">
            <label className="text-sm font-medium flex items-center gap-3 text-gray-500"><img src='/assets/upload.svg' className='w-8'/>Resume</label>
            <input type="file" id="resume" onChange={handleFileChange} className="hidden" />
            <label
              htmlFor="resume"
              className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-[#468585] hover:bg-gray-100"
            >
              {fileName || 'SELECT FILE'}
            </label>
          </div>

          <TextField
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            className="!mb-3"
          />

          <TextField
            name="password"
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <p className="text-xs text-gray-500 mb-3">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>

          <div className="text-sm text-gray-700 flex flex-col gap-4 sm:flex-row justify-between">
            <span>
              <p className="mb-1">
                What&apos;s your gender? <span className="text-gray-400">(optional)</span>
              </p>
              <div className="flex gap-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
              </div>
            </span>
            <span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.date_of_birth}
                  onChange={(value) => setFormData((prev) => ({ ...prev, date_of_birth: value }))}
                />
              </LocalizationProvider>
            </span>
          </div>

          <div className="flex items-start text-sm">
            <input
              type="checkbox"
              name="shareData"
              checked={formData.shareData}
              onChange={handleChange}
              className="mr-2 mt-1"
            />
            <span>Share my registration data with our HR agents.</span>
          </div>

          <p className="text-xs text-gray-500">
            By creating an account, you agree to the{' '}
            <a href="#" target='_blank' className="text-[#468585] underline">Terms of use</a> and{' '}
            <a href="#" target='_blank' className="text-[#468585] underline">Privacy Policy</a>.
          </p>

          <button
            type="submit"
            className="w-full mt-2 bg-[#468585] text-white font-semibold py-3 rounded-full hover:bg-[#386969] transition"
          >
            Sign up
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{' '}
            <Link href="/login" className="underline text-[#468585]">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
