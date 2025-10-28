'use client';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getSettings, updateSettings } from '@/api/hr';
import { useSettings } from '@/hooks/useSettings';

export default function SettingsPage() {

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
  } = useSettings(getSettings, updateSettings);
  
  const logoUrl = userData.company_logo 
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${userData.company_logo}` 
    : null;
  console.log(userData)
  return (
    <div className="p-4 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-10">
          <div>
            <p className="font-semibold text-sm mb-2">Company Logo</p>
            <div className="relative w-40 h-40">
              <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
                {userData.company_logo ? (
                  <img
                    src={logoUrl} 
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
              <label
                htmlFor="logo-upload"
                className="absolute bottom-2 left-2 bg-white text-sm px-3 py-1 rounded-full shadow-md cursor-pointer"
              >
                Edit
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    updateField('company_logo', file);
                    setUserData((prev) => ({ ...prev, company_logo: url }));
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-6 text-sm text-gray-700">
            {[
              { label: 'Full name', field: 'full_name' },
              { label: 'Company name', field: 'company_name' },
              { label: 'Email address', field: 'email' },
              { label: 'Company field', field: 'company_field' },
              { label: 'Date Of Birth', field: 'date_of_birth' },
              { label: 'Gender', field: 'gender' },
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
            <div className="flex justify-between items-center">
              <p className="font-semibold">Company overview</p>
              {editingField !== 'company_overview' && (
                <button
                  className="text-xs underline"
                  onClick={() => startEditing('company_overview', userData.company_overview)}
                >
                  Edit
                </button>
              )}
            </div>

            {editingField === 'company_overview' ? (
              <div className="mt-2 space-y-2">
                <textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm min-h-[120px]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveEditing}
                    className="text-sm text-white bg-[#468585] px-3 py-1 rounded hover:bg-[#386969]"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed mt-2">
                {userData.company_overview}
              </p>
            )}
            <hr className="mt-6 border-gray-200" />
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
