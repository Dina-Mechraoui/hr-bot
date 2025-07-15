'use client';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { RegisterCandidate } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useForm } from '@/hooks/useForm';
import PasswordField from '@/components/common/PasswordField';
import { useRegister } from '@/hooks/useRegister';

export default function RegisterCandidatePage() {
  const { formValues, handleChange, setFormValues } = useForm({
    last_name: '',
    first_name: '',
    email: '',
    password: '',
    gender: '',
    date_of_birth: null,
    resume: null,
    shareData: false,
  });

  const [fileName, setFileName] = useState('');
  const { handleRegister, loading, error } = useRegister(RegisterCandidate);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setFormValues((prev) => ({ ...prev, resume: e.target.files[0] }));
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

        <form className="space-y-3" onSubmit={(e) => handleRegister(e, formValues)}>
          <TextField
            name="first_name"
            label="First Name"
            placeholder="Enter your first name"
            value={formValues.first_name}
            onChange={handleChange}
            fullWidth
            error={!!error.first_name}
            helperText={error.first_name}
            className="!mb-3"
          />

          <TextField
            name="last_name"
            label="Last Name"
            placeholder="Enter your last name"
            value={formValues.last_name}
            onChange={handleChange}
            fullWidth
            error={!!error.last_name}
            helperText={error.last_name}
            className="!mb-3"
          />

          <div className="border border-dashed flex items-center justify-between border-gray-300 rounded-md p-4 text-center">
            <label className="text-sm font-medium flex items-center gap-3 text-gray-500">
              <img src="/assets/upload.svg" className="w-8" alt="Upload" />Resume
            </label>
            <input type="file" id="resume" onChange={handleFileChange} className="hidden" />
            <label
              htmlFor="resume"
              className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-[#468585] hover:bg-gray-100"
            >
              {fileName || 'SELECT FILE'}
            </label>
          </div>
          {error.resume && (
            <p className="text-sm text-red-500 mt-1">{error.resume}</p>
          )}

          <TextField
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            fullWidth
            error={!!error.email}
            helperText={error.email}
            className="!mb-3"
          />

          <PasswordField
            name="password"
            error={!!error.password}
            helperText={error.password}
            value={formValues.password}
            onChange={handleChange}
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
                    checked={formValues.gender === 'Female'}
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
                    checked={formValues.gender === 'Male'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
              </div>
              {error.gender && (
                <p className="text-sm text-red-500 mt-1">{error.gender}</p>
              )}
            </span>

            <span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formValues.date_of_birth}
                  onChange={(value) =>
                    setFormValues((prev) => ({
                      ...prev,
                      date_of_birth: value,
                    }))
                  }
                  slots={{ textField: TextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error.date_of_birth,
                      helperText: error.date_of_birth,
                    },
                  }}
                />
              </LocalizationProvider>
            </span>
          </div>

          <div className="flex items-start text-sm">
            <input
              type="checkbox"
              name="shareData"
              checked={formValues.shareData}
              onChange={handleChange}
              className="mr-2 mt-1"
            />
            <span>Share my registration data with our HR agents.</span>
          </div>
          {error.shareData && (
            <p className="text-red-500 text-sm mt-1">{error.shareData}</p>
          )}

          <p className="text-xs text-gray-500">
            By creating an account, you agree to the{' '}
            <a href="#" target="_blank" className="text-[#468585] underline">Terms of use</a> and{' '}
            <a href="#" target="_blank" className="text-[#468585] underline">Privacy Policy</a>.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#468585] text-white font-semibold py-3 rounded-full hover:bg-[#386969] transition cursor-pointer disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Sign up"}
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
