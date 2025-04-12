'use client';

import { useState } from 'react';

export default function CandidateSettings() {
  const initialUser = {
    name: 'Lilia Ali',
    email: 'jennyfox@gmail.com',
    gender: 'Male',
    dob: '30/05/1997',
    field: 'Artificial Intelligent',
    photo: '/assets/avatar.png',
    resumeName: 'Lilia-resume.pdf',
  };

  const [user, setUser] = useState(initialUser);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

  const handleEdit = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  const saveEdit = () => {
    setUser({ ...user, [editingField]: tempValue });
    setEditingField(null);
    setTempValue('');
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setUser((prev) => ({
        ...prev,
        resumeName: file.name,
      }));
    }
  };

  return (
    <div className="md:p-10 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-10">
          <div>
            <p className="font-semibold text-sm mb-2">Profile Picture</p>
            <div className="relative w-40 h-40">
              <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/avatar-placeholder.svg"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-2 left-2 bg-white text-sm px-3 py-1 rounded-full shadow-md cursor-pointer"
              >
                ✎ Edit
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setUser((prev) => ({ ...prev, photo: url }));
                  }
                }}
              />
            </div>
          </div>

          {/* Info fields */}
          <div className="space-y-6 text-sm text-gray-700">
            {[
              { label: 'Name', field: 'name' },
              { label: 'Email address', field: 'email' },
              { label: 'Gender', field: 'gender' },
              { label: 'Date of birth', field: 'dob' },
              { label: 'Field', field: 'field' },
            ].map(({ label, field }) => (
              <div key={field}>
                <div className="flex justify-between">
                  <p className="text-gray-500">{label}</p>
                  {editingField !== field && (
                    <button
                      className="text-blue-600 text-xs underline"
                      onClick={() => handleEdit(field, user[field])}
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
                  <p className="mt-1 font-medium">{user[field]}</p>
                )}
                <hr className="mt-3 border-gray-200" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-10 text-sm text-gray-800">
          {/* Resume Upload */}
          <div>
            <p className="font-semibold mb-2">Resume</p>
            <p className="font-semibold text-black mb-2">{user.resumeName}</p>
            <div
  className="border border-dashed border-gray-300 rounded-lg p-5 flex items-center justify-between relative"
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setUser((prev) => ({ ...prev, resumeName: file.name }));
    }
  }}
>
  <div className="flex items-center gap-2">
    <span className="text-2xl">📤</span>
    <div>
      <p className="font-semibold text-sm">Select a file or drag and drop here</p>
      <p className="text-xs text-gray-500">PDF, file size no more than 10MB</p>
    </div>
  </div>

  {/* Clickable upload button */}
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
    onChange={handleResumeUpload}
  />
</div>

          </div>

          {/* Delete Account */}
          <div className="space-y-1">
            <p className="font-semibold">Delete account</p>
            <button className="text-red-600 text-sm mt-1 hover:underline font-semibold">
              I want to delete my account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
