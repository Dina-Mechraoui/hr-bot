'use client';

import { useState } from 'react';

const applications = {
  accepted: [
    {
      id: 1,
      title: 'Cybersec Analyst',
      company: 'SecureNet Global',
      time: 'about 13 hours ago',
      details: {
        name: 'Cybersecurity Analyst',
        description:
          "As a Cybersecurity Analyst at SecureNet Global, you will be responsible for monitoring, analyzing, and responding to security events and incidents across our clients' networks...",
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
      time: 'about 2 days ago',
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
        companyOverview:
          'PixelPerfect Studio creates engaging user experiences for startups and enterprises.',
        contact: 'hello@pixelperfect.studio • 045-999-4422',
        images: [
          '/assets/details.png',
          '/assets/details.png',
          '/assets/details.png',
          '/assets/details.png',
        ],
      },
    },
  ],
  pending: [
    {
      id: 1,
      title: 'Cybersec Analyst',
      company: 'SecureNet Global',
      time: 'about 13 hours ago',
      details: {
        name: 'Cybersecurity Analyst',
        description:
          "As a Cybersecurity Analyst at SecureNet Global, you will be responsible for monitoring, analyzing, and responding to security events and incidents across our clients' networks...",
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
      time: 'about 2 days ago',
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
        companyOverview:
          'PixelPerfect Studio creates engaging user experiences for startups and enterprises.',
        contact: 'hello@pixelperfect.studio • 045-999-4422',
        images: [
          '/assets/details.png',
          '/assets/details.png',
          '/assets/details.png',
          '/assets/details.png',
        ],
      },
    },
  ],
  rejected: [
    {
      id: 1,
      title: 'Cybersec Analyst',
      company: 'SecureNet Global',
      time: 'about 13 hours ago',
      details: {
        name: 'Cybersecurity Analyst',
        description:
          "As a Cybersecurity Analyst at SecureNet Global, you will be responsible for monitoring, analyzing, and responding to security events and incidents across our clients' networks...",
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
      time: 'about 2 days ago',
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
        companyOverview:
          'PixelPerfect Studio creates engaging user experiences for startups and enterprises.',
        contact: 'hello@pixelperfect.studio • 045-999-4422',
        images: [
          '/assets/details.png',
          '/assets/details.png',
          '/assets/details.png',
          '/assets/details.png',
        ],
      },
    },
  ],
};

const tabs = ['Accepted', 'Pending', 'Rejected'];

const statusColors = {
  Accepted: 'border-[#16a34a] font-semibold',
  Pending: 'border-[#f97316] font-semibold',
  Rejected: 'border-[#dc2626] font-semibold',
};

const dotColors = {
  Accepted: '#16a34a',
  Pending: '#f97316',
  Rejected: '#dc2626',
};

export default function ApplicationStatus() {
  const [activeTab, setActiveTab] = useState('Accepted');
  const [selectedApp, setSelectedApp] = useState(null);

  const list = applications[activeTab.toLowerCase()];

  return (
    <div className="md:p-10 p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Application Status</h1>

      {/* Tabs */}
      <div className="flex gap-6 text-sm font-medium border-b mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? `${statusColors[tab]} border-b-2`
                : 'text-gray-500 hover:text-[#468585]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Application List */}
      <div className="space-y-6">
        {list.length > 0 ? (
          list.map((item) => (
            <div key={item.id} className="border-b pb-4 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-800 flex items-center gap-2">
                  <span
                    className="text-xl"
                    style={{ color: dotColors[activeTab] }}
                  >
                    •
                  </span>
                  {item.title}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  <span className="font-semibold">{item.company}</span> • {item.time}
                </p>
              </div>
              <button
                className="px-4 py-1 rounded-full bg-white text-sm font-medium border hover:bg-gray-100 transition"
                onClick={() => setSelectedApp(item)}
              >
                Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-6">
            No applications in this category yet.
          </p>
        )}
      </div>

      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs p-10">
          <div className="bg-white rounded-lg shadow-lg p-16 w-full max-w-5xl relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedApp.title}</h2>
                <p className="text-gray-700 font-semibold mb-4">{selectedApp.company}</p>

                <p className="font-semibold">Job Name:</p>
                <p className="text-sm">{selectedApp.details.name}</p>

                <p className="font-semibold mt-4">Job Description:</p>
                <p className="text-sm">{selectedApp.details.description}</p>

                <p className="font-semibold mt-4">Required Qualifications</p>
                <ul className="list-disc list-inside text-sm mb-4">
                  {selectedApp.details.qualifications.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>

                <p className="font-semibold">Location:</p>
                <p className="text-sm">{selectedApp.details.location}</p>

                <p className="font-semibold">Employment Type:</p>
                <p className="text-sm">{selectedApp.details.type}</p>

                <p className="font-semibold">Work Hours:</p>
                <p className="text-sm">{selectedApp.details.hours}</p>

                <p className="font-semibold mt-4">Salary and Benefits:</p>
                <p className="text-sm">{selectedApp.details.salary}</p>
                <ul className="list-disc list-inside text-sm">
                  {selectedApp.details.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div>
                <img
                  src={selectedApp.details.images[0]}
                  alt="office"
                  className="rounded-lg mb-3 w-full h-44 object-cover"
                />
                <div className="flex gap-2 mb-4">
                  {selectedApp.details.images.slice(1).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Office image ${i + 1}`}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ))}
                </div>

                <p className="font-semibold">Company Overview</p>
                <p className="text-sm mb-4">{selectedApp.details.companyOverview}</p>

                <p className="font-semibold">Contact:</p>
                <p className="text-sm">{selectedApp.details.contact}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
