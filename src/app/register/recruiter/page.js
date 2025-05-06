'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from '@deemlol/next-icons';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RegisterRecruiter } from '@/api/auth';

export default function Agent() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    gender: '',
    role: 'HR',
    company_name: '',
    company_field: '',
    date_of_birth: null,
    agreed_to_terms: "true",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await RegisterRecruiter({
        ...formData,
        date_of_birth: formData.date_of_birth?.format("YYYY-MM-DD") || "",
      });
      console.log("sign up success:", response);
      router.push("/login");
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('An error occurred while submitting the form. Please try again.');   
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
          name="full_name" // ✅ fixed
          label="Full Name"
          placeholder='Enter your profile name'
          value={formData.full_name}
          onChange={handleChange}
          fullWidth
          className='!mb-3'
        />

        <TextField
          name="company_name" // ✅ fixed
          label="Company Name"
          placeholder='Enter your company name'
          value={formData.company_name}
          onChange={handleChange}
          fullWidth
          className='!mb-3'
        />

        <TextField
          name="company_field" // ✅ fixed
          label="Company Field"
          placeholder='Enter your company field'
          value={formData.company_field}
          onChange={handleChange}
          fullWidth
          className='!mb-3'
        />


          <TextField
            name="email"
            label="Email"
            type="email"
            placeholder='enter your email'
            value={formData.email}
            onChange={handleChange}
            fullWidth
            className='!mb-3'
          />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <p className="text-xs text-gray-500">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>

          <div className="text-sm flex flex-col sm:flex-row gap-3 justify-between   text-gray-700">
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={formData.date_of_birth}
                label="Date of Birth"
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    date_of_birth: value,
                  }))
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </div>

          <p className="text-xs text-gray-500">
            By creating an account, you agree to the{' '}
            <a href="#" target='_blank' className="text-[#468585] underline">Terms of use</a> and{' '}
            <a href="#" target='_blank' className="text-[#468585] underline">Privacy Policy</a>.
          </p>

          <button
            type="submit"
            className="w-full mt-4 bg-[#468585] text-white font-semibold py-3 rounded-full hover:bg-[#386969] transition"
          >
            Sign up
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{' '}
            <Link href="/login" className="underline text-[#468585]">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
