'use client';

import { X } from '@deemlol/next-icons';

export default function JobDetailsModal({ isOpen, onClose, job }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl overflow-y-auto p-8 relative shadow-xl">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 space-y-4 text-sm text-gray-800">
            <div>
              <h2 className="text-xl font-bold">{job.role}</h2>
              <p className="text-sm text-gray-500">{job.companyName}</p>
            </div>

            <div>
              <h3 className="font-semibold">Job Name</h3>
              <p>{job.role}</p>
            </div>

            <div>
              <h3 className="font-semibold">Job Description</h3>
              <p>{job.description}</p>
            </div>

            <div>
              <h3 className="font-semibold">Required Qualifications</h3>
              <ul className="list-disc pl-5">
                {job.qualifications.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Employment Type:</strong> {job.employmentType}</p>
              <p><strong>Work Hours:</strong> {job.workHours}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-4 text-sm text-gray-800">
            <img
              src={job.companyImages[0]}
              alt="Company"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="flex flex-col gap-2">
              {job.companyImages.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-full h-24 object-cover rounded-md"
                  alt="Office"
                />
              ))}
            </div>

            <div>
              <h3 className="font-semibold">Company Name</h3>
              <p>{job.companyName}</p>
            </div>

            <div>
              <h3 className="font-semibold">Company Overview</h3>
              <p>{job.companyDescription}</p>
            </div>

            <div>
              <h3 className="font-semibold">Contact Information</h3>
              <p>{job.contact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
