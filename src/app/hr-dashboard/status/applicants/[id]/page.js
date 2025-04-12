'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

const dummyApplicants = [
  {
    id: 1,
    name: 'Samir Alloui',
    company: 'PixelPerfect Studio',
    submitted: 'about 13 hours ago',
    matching: 'Resume matches 78% of the job description for this position.',
    finalThought: 'Good potential, worth considering further.',
    strengths: ['Strong design sense', 'Good communication', 'Team player'],
    weaknesses: ['Lacks experience in Figma', 'Limited prototyping'],
    imageUrl: '/assets/details.png',
    resumeName: 'Samir-Resume.pdf',
    resumeLink: '/Samir-Resume.pdf',
  },
  {
    id: 2,
    name: 'Abdeslam Ferhat',
    company: 'PixelPerfect Studio',
    submitted: 'about 13 hours ago',
    matching: 'Resume matches 85% of the job description for Full Stack Developer.',
    finalThought: 'Overall, this applicant suits the job well.',
    strengths: [
      'Lack of experience with Node.js and Django.',
      'No mention of cloud services.',
      'Missing details on DevOps practices.',
    ],
    weaknesses: [
      'Proficiency in HTML, CSS, and JavaScript.',
      'Strong experience with database management.',
      'Solid problem-solving skills.',
    ],
    imageUrl: '/assets/details.png',
    resumeName: 'Lilia-resume.pdf',
  },
];

export default function ApplicantsPage() {
  const params = useParams();
  const jobId = params.jobId;
  const [applicants, setApplicants] = useState(dummyApplicants);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">UI/UX designer</h1>
      <p className="text-sm text-gray-600">{applicants.length} applicants</p>

      <hr className="border-gray-300" />

      <h2 className="text-xl font-bold">Applicants list</h2>

      {applicants.map((applicant) => (
        <div key={applicant.id} className="border-b py-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="flex items-center gap-1 text-sm text-gray-800">
                <span className="text-[#16a34a] text-xl">•</span>
                {applicant.name}
              </p>
              <p className="text-xs text-gray-600 font-semibold">
                {applicant.company} • <span className="font-normal">{applicant.submitted}</span>
              </p>
              <button
                className="text-xs text-red-600 mt-2 hover:cursor-pointer hover:underline"
              >
                I want to reject this applicant
              </button>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setSelectedApplicant(applicant)}
                className="px-4 py-2 rounded-full hover:cursor-pointer bg-white text-sm font-medium hover:bg-gray-100 transition"
              >
                Details
              </button>
              <button className="px-4 py-2 rounded-full bg-[#468585] hover:cursor-pointer text-white text-sm font-medium hover:bg-[#386969] transition">
                Hire
              </button>
            </div>
          </div>
        </div>
      ))}

      {applicants.length === 0 && (
        <p className="text-gray-500 mt-8">No applicants remaining for this job.</p>
      )}

      {/* Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-lg p-16 w-full max-w-3xl relative">
            <button
              onClick={() => setSelectedApplicant(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black hover:cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">{selectedApplicant.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className='font-semibold'>Matching percentage</p>
                <p className="mb-4">{selectedApplicant.matching}</p>

                <p className='font-semibold'>Final thought</p>
                <p className="mb-4">{selectedApplicant.finalThought}</p>

                <p className='font-semibold'>Strengths</p>
                <ul className="list-disc list-inside mb-4">
                  {selectedApplicant.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>

                <p className='font-semibold'>Weaknesses</p>
                <ul className="list-disc list-inside mb-4">
                  {selectedApplicant.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>

                <button
                  className="text-xs text-red-600 hover:cursor-pointer hover:underline"
                >
                  I want to reject this applicant
                </button>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src={selectedApplicant.imageUrl}
                  alt="applicant resume preview"
                  className="w-48 h-48 object-cover rounded-md mb-4"
                />
                <p className='text-left self-start font-semibold'>Resume</p>
                <a
                  target="_blank"
                  className="text-sm flex self-start gap-4"
                >
                  <img src='/assets/resume_.svg'/>
                  {selectedApplicant.resumeName} • <span className='text-[#468585] hover:cursor-pointer hover:underline'>Preview</span>
                </a>

                <button
                  className="mt-6 px-6 py-2 rounded-full bg-[#468585] text-white hover:cursor-pointer hover:bg-[#386969]"
                >
                  hire
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
