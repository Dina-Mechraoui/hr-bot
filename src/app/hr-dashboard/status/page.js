'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical } from '@deemlol/next-icons';
import { useRouter } from 'next/navigation';
import JobDetailsModal from '@/components/JobDetailsModal';
import DeleteModal from '@/components/DeleteModal';

export default function Status() {
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const menuRefs = useRef({});
  const [postToDelete, setPostToDelete] = useState(null);

  const router = useRouter();

  const jobPosts = [
    {
      id: 1,
      title: 'dinaaaaa Analyst',
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
      id: 3,
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
  ];

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuElement = menuRefs.current[openMenu];
      if (menuElement && !menuElement.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);
  

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Application Status</h1>
      <hr className="border-gray-300" />

      <div className="space-y-6">
        {jobPosts.map((post) => (
          <div key={post.id} className="flex flex-col border-b pb-4 relative">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-900 flex items-center gap-2">
                <span className="text-[#468585] text-xl">•</span> {post.title}
              </p>

              <div className="hidden md:flex z-40 gap-2">
                <button
                  className="px-4 py-2 rounded-full bg-white text-sm font-medium hover:cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => {
                    router.push(`/hr-dashboard/status/applicants/${post.id}`);
                    setOpenMenu(null);
                  }}
                >
                  Applicants
                </button>
                <button onClick={() => setSelectedJob(post)} className="px-4 py-2 rounded-full bg-white text-sm font-medium hover:cursor-pointer hover:bg-gray-100 transition">
                  Details
                </button>
                <button
                  className="px-4 py-2 rounded-full bg-[#468585] text-white text-sm font-medium hover:bg-[#386969] hover:cursor-pointer transition"
                  onClick={()=>router.push(`/hr-dashboard/status/post/${post.id}`)}
                >
                  Modify
                </button>
              </div>

              <div className="md:hidden relative" ref={(el) => (menuRefs.current[post.id] = el)}>
                <button
                  onClick={() => toggleMenu(post.id)}
                >
                  <MoreVertical className="w-5 h-5 text-gray-700" />
                </button>

                {openMenu === post.id && (
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
                      onClick={()=>router.push(`/hr-dashboard/status/post/${post.id}`)}
                    >
                      Modify
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button className="text-xs text-red-600 mt-2 w-fit cursor-pointer hover:underline"
            onClick={() => setPostToDelete(post)}>
              I want to delete this post
            </button>
            <DeleteModal
              post={postToDelete}
              onCancel={() => setPostToDelete(null)}
              onConfirm={() => {
                setPostToDelete(null);
              }}
            />

          </div>
        ))}
      </div>
      {selectedJob && (
        <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}
