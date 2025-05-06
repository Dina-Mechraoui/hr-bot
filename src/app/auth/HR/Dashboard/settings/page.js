'use client';

import { useState } from 'react';
import DeleteAccountModal from '@/components/DeleteAccountModal';

export default function SettingsPage() {
  const initialUser = {
    fullName: 'Hamid Ait Alli',
    company: 'Thyck Tech Dz',
    email: 'thynktechdz@gmail.com',
    field: 'Tech',
    dob: '2018-02-29',
    gender: 'Male',
    overview:
      'SecureNet Global is a leading cybersecurity firm dedicated to protecting businesses worldwide from digital threats. With a focus on innovative security solutions and a commitment to excellence, we help our clients navigate the complex landscape of cybersecurity. Our team is passionate about staying ahead of emerging threats and delivering top-tier services that ensure our clients’ data and networks remain secure.',
    username: 'thycktechdz',
    logo: null,
  };

  const [userData, setUserData] = useState(initialUser);
  const [editingField, setEditingField] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const madeChanges = JSON.stringify(userData) !== JSON.stringify(initialUser);
  const [tempValue, setTempValue] = useState('');

  const handleEdit = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  const saveEdit = () => {
    setUserData({ ...userData, [editingField]: tempValue });
    setEditingField(null);
    setTempValue('');
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleCancelAll = () => {
    setUserData(initialUser);
    setEditingField(null);
    setTempValue('');
  };

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
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-6 text-sm text-gray-700">
            {[
              { label: 'Full name', field: 'fullName' },
              { label: 'Company name', field: 'company' },
              { label: 'Email address', field: 'email' },
              { label: 'Company field', field: 'field' },
              { label: 'Date Of Birth', field: 'dob' },
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
      {showDeleteModal && 
        <DeleteAccountModal
          post={{ title: `@${userData.username}` }}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            setShowDeleteModal(false);
          }}
        />
      }
      

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
