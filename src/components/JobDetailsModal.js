'use client';

import React from 'react';

export default function JobDetailsModal({ job, onClose }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-lg p-16 w-full max-w-5xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
            <p className="text-gray-700 font-semibold mb-4">{job.company}</p>

            <p><strong>Job Name:</strong> {job.details.name}</p>
            <p className="my-4">
              <strong>Job Description:</strong><br />{job.details.description}
            </p>

            <p className="font-semibold mt-4">Required Qualifications</p>
            <ul className="list-disc list-inside text-sm mb-4">
              {job.details.qualifications.map((q, i) => <li key={i}>{q}</li>)}
            </ul>

            <p><strong>Location:</strong> {job.details.location}</p>
            <p><strong>Employment Type:</strong> {job.details.type}</p>
            <p><strong>Work Hours:</strong> {job.details.hours}</p>

            <p className="font-semibold mt-4">Salary and Benefits</p>
            <p>{job.details.salary}</p>
            <ul className="list-disc list-inside text-sm">
              {job.details.benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>

          <div>
            <img src={job.details.images[0]} alt="office" className="rounded-lg mb-3" />
            <div className="flex gap-2 mb-4">
              {job.details.images.slice(1).map((img, i) => (
                <img key={i} src={img} alt={`office ${i}`} className="w-16 h-16 object-cover rounded-md" />
              ))}
            </div>

            <p className="font-semibold">Company Overview</p>
            <p className="text-sm mb-4">{job.details.companyOverview}</p>

            <p className="font-semibold">Contact</p>
            <p className="text-sm">{job.details.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
