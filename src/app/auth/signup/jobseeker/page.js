'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from '@deemlol/next-icons';

export default function JobSeekerSignUp() {
  const [fileName, setFileName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    field: '',
    email: '',
    password: '',
    gender: '',
    dob: {
      month: '',
      day: '',
      year: '',
    },
    resume: null,
    acceptTerms: false,
  });

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'acceptTerms') {
      setFormData((prev) => ({ ...prev, acceptTerms: checked }));
    } else if (['month', 'day', 'year'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        dob: { ...prev.dob, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl px-8 max-xl:py-8 xl:py-4">
        <div className="flex justify-center mb-4">
          <img src="/assets/LOGO.svg" alt="Logo" className="w-12 h-12" />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">Sign up</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Sign up with your email address</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter your profile name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#468585]"
          />
          <input
            type="text"
            name="field"
            value={formData.field}
            placeholder="Enter your field"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#468585]"
          />

          {/* Resume Upload */}
          <div className="border border-dashed flex items-center justify-between border-gray-300 rounded-md p-4 text-center">
            <label className="text-sm font-medium text-gray-500">Resume</label>
            <input type="file" id="resume" onChange={handleFileChange} className="hidden" />
            <label
              htmlFor="resume"
              className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-[#468585] hover:bg-gray-100"
            >
              {fileName || 'SELECT FILE'}
            </label>
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email address"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#468585]"
          />

          {/* Password */}
          <div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-[#468585]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>

          {/* Gender */}
          <div className="text-sm text-gray-700">
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
          </div>

          {/* DOB */}
          <div className="text-sm text-gray-700">
            <p className="mb-1">What's your date of birth?</p>
            <div className="flex gap-2">
              <select
                name="month"
                value={formData.dob.month}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#468585]"
              >
                <option>Month</option>
                <option>Jan</option>
                <option>Feb</option>
                <option>Mar</option>
              </select>
              <select
                name="day"
                value={formData.dob.day}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#468585]"
              >
                <option>Day</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              <select
                name="year"
                value={formData.dob.year}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#468585]"
              >
                <option>Year</option>
                <option>2000</option>
                <option>2001</option>
                <option>2002</option>
              </select>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-start text-sm">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="mr-2 mt-1"
            />
            <span>Share my registration data with our HR agents.</span>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500">
            By creating an account, you agree to the{' '}
            <a href="#" className="text-[#468585] underline">Terms of use</a> and{' '}
            <a href="#" className="text-[#468585] underline">Privacy Policy</a>.
          </p>

          {/* reCAPTCHA Placeholder */}
          <div className="flex justify-center">
            <div className="mt-2 bg-gray-100 rounded px-4 py-2 text-sm text-gray-700">
              [reCAPTCHA placeholder]
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-[#468585] text-white font-semibold py-3 rounded-full hover:bg-[#386969] transition"
          >
            Sign up
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{' '}
            <a href="/auth/signin" className="underline text-[#468585]">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
