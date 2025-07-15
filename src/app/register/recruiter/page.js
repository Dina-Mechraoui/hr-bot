'use client';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Link from 'next/link';
import { RegisterRecruiter } from '@/api/auth';
import { useRegister } from '@/hooks/useRegister';
import { useForm } from '@/hooks/useForm';
import PasswordField from '@/components/common/PasswordField';

export default function RegisterHrPage() {
  const {formValues, handleChange, setFormValues} = useForm({
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

  const { handleRegister, loading, error } = useRegister(RegisterRecruiter);
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl px-8 max-xl:py-8 xl:py-4">
        <div className="flex justify-center mb-4">
          <img src="/assets/LOGO.svg" alt="Logo" className="w-12 h-12" />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">Sign up</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Sign up with your email address</p>

        <form className="space-y-3"  onSubmit={(e) => handleRegister(e, formValues)}>
        <TextField
          name="full_name"
          label="Full Name"
          placeholder='Enter your profile name'
          value={formValues.full_name}
          onChange={handleChange}
          fullWidth
          className='!mb-3'
          error={!!error.full_name}
          helperText={error.full_name}
        />

        <TextField
          name="company_name"
          label="Company Name"
          placeholder='Enter your company name'
          value={formValues.company_name}
          onChange={handleChange}
          fullWidth
          className='!mb-3'
          error={!!error.company_name}
          helperText={error.company_name}
        />

        <TextField
          name="company_field"
          label="Company Field"
          placeholder='Enter your company field'
          value={formValues.company_field}
          onChange={handleChange}
          fullWidth
          error={!!error.company_field}
          helperText={error.company_field}
          className='!mb-3'
        />


          <TextField
            name="email"
            label="Email"
            type="email"
            placeholder='enter your email'
            value={formValues.email}
            onChange={handleChange}
            fullWidth
            className='!mb-3'
            error={!!error.email}
            helperText={error.email}
          />

          <PasswordField
            name="password"
            value={formValues.password}
            onChange={handleChange}
            error={!!error.password}
            helperText={error.password}
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
            </span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={formValues.date_of_birth}
                label="Date of Birth"
                onChange={(value) =>
                  setFormValues((prev) => ({
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
            disabled={loading}
            className="w-full mt-4 bg-[#468585] text-white font-semibold py-3 rounded-full hover:bg-[#386969] transition cursor-pointer disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Sign up"}
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
