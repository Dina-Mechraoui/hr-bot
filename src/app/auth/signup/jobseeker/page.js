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
import ReCAPTCHA from 'react-google-recaptcha';


export default function JobSeekerSignUp() {
  const [fileName, setFileName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    field: '',
    email: '',
    password: '',
    gender: '',
    dob: null,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('DOB:', formData.dob.d);

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
            name="name"
            label="Full Name"
            placeholder="Enter your profile name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            className="!mb-3"
          />
          
          <TextField
            name="field"
            label="Field"
            placeholder="Enter your field"
            value={formData.field}
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
                What's your gender? <span className="text-gray-400">(optional)</span>
              </p>
              <div className="flex gap-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
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
                  value={formData.dob}
                  onChange={(value) => setFormData((prev) => ({ ...prev, dob: value }))}
                />
              </LocalizationProvider>
            </span>
          </div>

          <div className="flex items-start text-sm">
            <input
              type="checkbox"
              name="shareData"
              checked={formData.acceptTerms}
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

            <ReCAPTCHA
              sitekey="6LekIBYrAAAAAJTHgVpcACRiNdCHZ5rR6DRNmVc9"
              onChange={(value) => {
                setCaptchaValue(value);
              }}
              theme="light"
              size="normal"
            />

          <button
            type="submit"
            className="w-full mt-2 bg-[#468585] text-white font-semibold py-3 rounded-full hover:bg-[#386969] transition"
          >
            Sign up
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{' '}
            <Link href="/auth/signin" className="underline text-[#468585]">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
