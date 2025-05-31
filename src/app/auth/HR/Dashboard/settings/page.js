'use client';

import { useState, useEffect } from 'react';
import DeleteAccountModal from '@/components/DeleteAccountModal';
import { getSettings, updateSettings } from '@/api/hr';

export default function SettingsPage() {
  const [userData, setUserData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [updateUser, setUpdateUser] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const [loading, setLoading] = useState(true);

  const madeChanges = JSON.stringify(userData) !== JSON.stringify(originalData);

  const handleEdit = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  const saveEdit = () => {
    setUserData({ ...userData, [editingField]: tempValue });
    setUpdateUser({ ...updateUser, [editingField]: tempValue });
    setEditingField(null);
    setTempValue('');
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleCancelAll = () => {
    setUserData(originalData);
    setUpdateUser({});
    setEditingField(null);
    setTempValue('');
  };

  const handleConfirm = async () => {
    try {
      const filteredUpdate = Object.fromEntries(
        Object.entries(updateUser).filter(([_, value]) => value !== '')
      );
      console.log('Filtered update data:', filteredUpdate);
      const response = await updateSettings(filteredUpdate);
      console.log('Updated settings:', response);

      setOriginalData({ ...userData });
      setUpdateUser({});
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setUserData(data.data);
        setOriginalData(data.data);
      } catch (error) {
        console.error('Failed to fetch user settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="p-4 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-10">
          <div>
            <p className="font-semibold text-sm mb-2">Company Logo</p>
            <div className="relative w-40 h-40">
              <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
                {userData.logo ? (
                  <img
                    src={userData.logo}
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
                    setUserData((prev) => ({ ...prev, logo: url }));
                    setUpdateUser((prev) => ({ ...prev, logo: file }));
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
                      onClick={() => handleEdit(field, userData[field])}
                    >
                      Edit
                    </button>
                  )}
                </div>
                {editingField === field ? (
                  <div className="mt-2 space-y-2">
                    <input
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="border rounded px-3 py-1 w-full text-sm"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="text-sm text-white bg-[#468585] hover:cursor-pointer px-3 py-1 rounded hover:bg-[#386969]"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
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
              {editingField !== 'overview' && (
                <button
                  className="text-xs underline"
                  onClick={() => handleEdit('overview', userData.overview)}
                >
                  Edit
                </button>
              )}
            </div>

            {editingField === 'overview' ? (
              <div className="mt-2 space-y-2">
                <textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm min-h-[120px]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="text-sm text-white bg-[#468585] px-3 py-1 rounded hover:bg-[#386969]"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed mt-2">
                {userData.overview}
              </p>
            )}
            <hr className="mt-6 border-gray-200" />
          </div>

          <div className="space-y-1">
            <p className="font-semibold">Delete account</p>
            <p className="text-gray-600">
              Do you want to delete your account :{' '}
              <span className="text-[#468585] font-medium">
                @{userData.username}
              </span>
              ?
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-red-600 text-sm mt-2 hover:underline hover:cursor-pointer font-semibold"
            >
              I want to delete my account
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteAccountModal
          post={{ title: `@${userData.username}` }}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            setShowDeleteModal(false);
          }}
        />
      )}

      <div className="mt-10 flex justify-end gap-4">
        <button
          onClick={handleCancelAll}
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
          onClick={handleConfirm}
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
