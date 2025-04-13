'use client';

import { useState } from 'react';

export default function EditJobPage() {
  const [initialJob, setInitialJob] = useState({
    image: '/assets/details.png',
    jobName: 'Thyck Tech Dz',
    workHours: 'thynktechdz@gmail.com',
    location: '0666849835',
    employmentType: 'Tech',
    description:
      'SecureNet Global is a leading cybersecurity firm dedicated to protecting businesses worldwide from digital threats...',
    qualifications:
      'SecureNet Global is a leading cybersecurity firm dedicated to protecting businesses worldwide from digital threats...',
    benefits:
      'SecureNet Global is a leading cybersecurity firm dedicated to protecting businesses worldwide from digital threats...',
  });

  const [jobData, setJobData] = useState(initialJob);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const madeChanges = JSON.stringify(jobData) !== JSON.stringify(initialJob);

  const startEditing = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const saveEdit = () => {
    setJobData({ ...jobData, [editingField]: tempValue });
    setEditingField(null);
    setTempValue('');
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleCancelAll = () => {
    setJobData(initialJob);
    setEditingField(null);
    setTempValue('');
  };

  const handleConfirmAll = () => {
    setInitialJob(jobData);
    setEditingField(null);
    setTempValue('');
  };

  return (
    <div className="p-4 md:p-16 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-10">
          <div>
            <p className="font-semibold text-sm mb-2">Pictures</p>
            <div className="relative max-w-xs">
              <img src={jobData.image} alt="Job preview" className="rounded-xl w-full" />
              <button className="absolute bottom-3 left-3 bg-white text-sm px-3 py-1 rounded-full shadow-md cursor-pointer">
                ✎ Edit
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200 text-sm text-gray-700">
            {[
              { label: 'Job name', field: 'jobName' },
              { label: 'Work hours', field: 'workHours' },
              { label: 'Location', field: 'location' },
              { label: 'Employement type', field: 'employmentType' },
            ].map(({ label, field }) => (
              <div key={field} className="py-4">
                <div className="flex justify-between">
                  <p className="text-gray-500">{label}</p>
                  {editingField === field ? null : (
                    <button
                      className="underline cursor-pointer"
                      onClick={() => startEditing(field, jobData[field])}
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
                      className="border rounded px-2 py-1 w-full"
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
                  <p className="mt-1 font-medium">{jobData[field]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10 flex flex-col text-sm text-gray-800">
          {[
            { title: 'Job description', field: 'description' },
            { title: 'Required qualifications', field: 'qualifications' },
            { title: 'Salary and benefits', field: 'benefits' },
          ].map(({ title, field }) => (
            <div key={field} className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{title}</p>
                {editingField === field ? null : (
                  <button
                    className="underline text-sm cursor-pointer"
                    onClick={() => startEditing(field, jobData[field])}
                  >
                    Edit
                  </button>
                )}
              </div>
              {editingField === field ? (
                <div className="space-y-2">
                  <textarea
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm min-h-[100px]"
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
                <p className="text-gray-700">{jobData[field]}</p>
              )}
            </div>
          ))}
          <div className="flex justify-end self-end gap-4">
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
              onClick={handleConfirmAll}
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
      </div>
    </div>
  );
}
