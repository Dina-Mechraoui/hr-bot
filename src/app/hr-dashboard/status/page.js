'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical } from '@deemlol/next-icons';
import { useRouter } from 'next/navigation';

export default function Status() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const menuRef = useRef(null);
  const router = useRouter();

  const jobPosts = [
    {
      id: 1,
      title: 'Cybersec Analyst',
      company: 'SecureNet Global',
      details: {
        name: 'Cybersecurity Analyst',
        description:
          'As a Cybersecurity Analyst at SecureNet Global, you will be responsible for monitoring, analyzing, and responding to security events and incidents across our clients\' networks...',
        qualifications: [
          'Bachelor’s degree in Computer Science, Information Security or a related field.',
          '3+ years of experience in cybersecurity or a similar role.',
          'Proficiency in network security tools and technologies.',
          'Strong knowledge of security protocols, cryptography, and risk management.',
          'Experience with incident response and threat analysis.',
        ],
        location: 'Hybrid - Bab Ezzouar, Alger',
        type: 'Full-time',
        hours: 'Monday to Friday, 9 AM to 5 PM (occasional on-call duties required)',
        salary: '90,000DZD to 120,000DZD monthly',
        benefits: [
          'Comprehensive health, dental, and vision insurance.',
          'Professional development opportunities and certification reimbursements.',
        ],
        companyOverview:
          'SecureNet Global is a leading cybersecurity firm dedicated to protecting businesses worldwide from digital threats...',
        contact: 'careers@securenetglobal.dz • 023-643-6753',
        images: [
          '/assets/details.png',
          '/assets/details.png',
          '/assets/details.png',
        ],
      },
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'PixelPerfect Studio',
      details: {
        name: 'UI/UX Designer',
        description:
          'Join our creative team to design clean and user-friendly digital experiences across web and mobile platforms...',
        qualifications: [
          'Bachelor’s in Design, HCI, or related field.',
          'Experience with Figma, Sketch, or Adobe XD.',
          'Strong UX research skills.',
        ],
        location: 'Remote',
        type: 'Contract',
        hours: 'Flexible',
        salary: '80,000DZD - 100,000DZD',
        benefits: ['Flexible schedule', 'Remote-friendly'],
        companyOverview: 'PixelPerfect Studio creates engaging user experiences for startups and enterprises.',
        contact: 'hello@pixelperfect.studio • 045-999-4422',
        images: [
          '/assets/details.png',
          '/assets/details.png',
          '/assets/details.png',
          '/assets/details.png',
        ],
      },
    },
  ];

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Application Status</h1>
      <hr className="border-gray-300" />

      <div className="space-y-6">
        {jobPosts.map((post) => (
          <div key={post.id} className="flex flex-col border-b pb-4 relative">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-900 flex items-center gap-2">
                <span className="text-[#16a34a] text-xl">•</span> {post.title}
              </p>

              <div className="hidden md:flex gap-2">
                <button
                  className="px-4 py-2 rounded-full bg-white text-sm font-medium hover:cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => router.push(`/hr-dashboard/status/applicants/${post.id}`)}
                >
                  Applicants
                </button>
                <button onClick={() => setSelectedJob(post)} className="px-4 py-2 rounded-full bg-white text-sm font-medium hover:cursor-pointer hover:bg-gray-100 transition">
                  Details
                </button>
                <button
                  className="px-4 py-2 rounded-full bg-[#468585] text-white text-sm font-medium hover:bg-[#386969] transition"
                  onClick={()=>router.push(`/hr-dashboard/status/post/${post.id}`)}
                >
                  Modify
                </button>
              </div>

              <div className="md:hidden relative" ref={menuRef}>
                <button
                  onClick={() => toggleMenu(post.id)}
                  aria-haspopup="true"
                  aria-expanded={openMenuId === post.id}
                  aria-controls={`menu-${post.id}`}
                >
                  <MoreVertical className="w-5 h-5 text-gray-700" />
                </button>

                {openMenuId === post.id && (
                  <div
                    id={`menu-${post.id}`}
                    className="absolute right-0 top-6 bg-white border rounded-md shadow-md z-10 text-sm min-w-[120px]"
                  >
                    <button
                      className="block px-4 bg-white py-2 hover:bg-gray-100 text-sm font-medium w-full text-left"
                      onClick={() => router.push(`/hr-dashboard/status/applicants/${post.id}`)}
                    >
                      Applicants
                    </button>
                    <button onClick={() => setSelectedJob(post)}
                     className="block w-full px-4 py-2 hover:bg-gray-100 text-left">
                      Details
                    </button>
                    <button
                      className="block w-full px-4 py-2 hover:bg-[#468585] hover:text-white text-left"
                      
                    >
                      Modify
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button className="text-xs text-red-600 mt-2 w-fit cursor-pointer hover:underline">
              I want to delete this post
            </button>
          </div>
        ))}
      </div>

      {/* ===== MODAL ===== */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-lg p-16 w-full max-w-5xl relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
                <p className="text-gray-700 font-semibold mb-4">{selectedJob.company}</p>

                <p><strong>Job Name:</strong> {selectedJob.details.name}</p>
                <p className="my-4"><strong>Job Description:</strong><br />{selectedJob.details.description}</p>

                <p className="font-semibold mt-4">Required Qualifications</p>
                <ul className="list-disc list-inside text-sm mb-4">
                  {selectedJob.details.qualifications.map((q, i) => <li key={i}>{q}</li>)}
                </ul>

                <p><strong>Location:</strong> {selectedJob.details.location}</p>
                <p><strong>Employment Type:</strong> {selectedJob.details.type}</p>
                <p><strong>Work Hours:</strong> {selectedJob.details.hours}</p>

                <p className="font-semibold mt-4">Salary and Benefits</p>
                <p>{selectedJob.details.salary}</p>
                <ul className="list-disc list-inside text-sm">
                  {selectedJob.details.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>

              <div>
                <img src={selectedJob.details.images[0]} alt="office" className="rounded-lg mb-3" />
                <div className="flex gap-2 mb-4">
                  {selectedJob.details.images.slice(1).map((img, i) => (
                    <img key={i} src={img} className="w-16 h-16 object-cover rounded-md" />
                  ))}
                </div>

                <p className="font-semibold">Company Overview</p>
                <p className="text-sm mb-4">{selectedJob.details.companyOverview}</p>

                <p className="font-semibold">Contact</p>
                <p className="text-sm">{selectedJob.details.contact}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
