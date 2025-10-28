'use client';

import { useState } from 'react';
import DeleteAccountModal from '@/components/DeleteAccountModal';
import { getUserSettings, updateSettings } from '@/api/candidate';
import { useSettings } from '@/hooks/useSettings';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CandidateSettingsPage() {

  const {
    userData,
    editingField,
    tempValue,
    madeChanges,
    startEditing,
    cancelEditing,
    setUserData,
    saveEditing,
    setTempValue,
    updateField,
    confirmChanges,
    cancelAll,
  } = useSettings(getUserSettings, updateSettings);
const logoUrl = userData.photo_js 
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${userData.photo_js}` 
    : null;
  console.log(userData)
  return (
    <div className="p-4 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-10">
          <div>
            <p className="font-semibold text-sm mb-2">Profile Picture</p>
            <div className="relative w-40 h-40">
              <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
                {userData.photo_js ? (
                  <img
                    src={logoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src="/assets/avatar.png" alt="Default Avatar" className='w-full h-full object-cover' />
                )}
              </div>
              <label
                htmlFor="photo-upload"
                className="absolute bottom-2 left-2 bg-white text-sm px-3 py-1 rounded-full shadow-md cursor-pointer"
              >
                Edit
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    updateField('photo_js', file);
                    setUserData((prev) => ({ ...prev, photo_js: url }));
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-6 text-sm text-gray-700">
            {[
              { label: 'First Name', field: 'first_name' },
              { label: 'Last Name', field: 'last_name' },
              { label: 'Email address', field: 'email' },
              { label: 'Gender', field: 'gender' },
              { label: 'Date of Birth', field: 'date_of_birth' },
            ].map(({ label, field }) => (
              <div key={field}>
                <div className="flex justify-between">
                  <p className="text-gray-500">{label}</p>
                  {editingField !== field && (
                    <button
                      className="text-xs underline hover:cursor-pointer"
                      onClick={() => startEditing(field, userData[field])}
                    >
                      Edit
                    </button>
                  )}
                </div>
                {editingField === field ? (
                  <div className="mt-2 space-y-2">
                    {field === 'gender' ? (
                      <div className="flex gap-6">
                        {['Female', 'Male'].map((gender) => (
                          <label key={gender} className="inline-flex items-center">
                            <input
                              type="radio"
                              name="gender"
                              value={gender}
                              checked={tempValue === gender}
                              onChange={(e) => setTempValue(e.target.value)}
                              className="mr-2"
                            />
                            {gender}
                          </label>
                        ))}
                      </div>
                    ) : field === 'date_of_birth' ? (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={tempValue ? dayjs(tempValue) : null}
                          onChange={(value) => {
                            const formattedDate = value ? value.format('YYYY-MM-DD') : '';
                            setTempValue(formattedDate);
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: 'small',
                            },
                          }}
                        />
                      </LocalizationProvider>
                    ) : (
                      <input
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="border rounded px-3 py-1 w-full text-sm"
                      />
                    )}

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={saveEditing}
                        className="text-sm text-white bg-[#468585] hover:cursor-pointer px-3 py-1 rounded hover:bg-[#386969]"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-sm text-gray-600 hover:cursor-pointer hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 font-medium">{userData[field]}</p>
                )}
                <hr className="mt-3 border-gray-200" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10 text-sm text-gray-800">
          <div>
            <p className="font-semibold mb-2">Resume</p>
            <p className="font-semibold text-black mb-2">{userData.resume || 'No resume uploaded'}</p>
            <div
              className="border border-dashed border-gray-300 rounded-lg p-5 flex items-center justify-between relative"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file && file.type === 'application/pdf') {
                  updateField('resume', file);
                  setUserData((prev) => ({ ...prev, resume: file.name }));
                }
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  <img src="/assets/upload.svg" />
                </span>
                <div>
                  <p className="font-semibold text-sm">Select a file or drag and drop here</p>
                  <p className="text-xs text-gray-500">PDF, max 10MB</p>
                </div>
              </div>
              <label
                htmlFor="resume-upload"
                className="text-white bg-[#468585] text-sm px-4 py-2 rounded cursor-pointer hover:bg-[#386969]"
              >
                Replace File
              </label>
              <input
                id="resume-upload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    updateField('resume', file);
                    setUserData((prev) => ({ ...prev, resume: file.name }));
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end gap-4">
        <button
          onClick={cancelAll}
          disabled={!madeChanges}
          className={`px-5 py-2 text-sm rounded border ${
            madeChanges
              ? 'text-gray-700 border-gray-300 hover:bg-gray-100 hover:cursor-pointer'
              : 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-100'
          }`}
        >
          Cancel
        </button>

        <button
          disabled={!madeChanges}
          onClick={confirmChanges}
          className={`px-5 py-2 text-sm rounded ${
            madeChanges
              ? 'bg-[#468585] text-white hover:bg-[#386969] hover:cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
