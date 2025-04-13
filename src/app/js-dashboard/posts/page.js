'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X } from '@deemlol/next-icons'

const jobs = [
  {
    id: '1',
    title: 'Cybersec analyst',
    company: 'SecureNet Global',
    image: '/assets/details.png',
    details: {
      name: 'Cybersecurity Analyst',
      description: `As a Cybersecurity Analyst at SecureNet Global, you will be responsible for monitoring, analyzing, and responding to security events and incidents across our clients’ networks. You will collaborate with a team of experts to identify vulnerabilities, implement security measures, and ensure compliance with industry standards.`,
      qualifications: [
        'Bachelor’s degree in Computer Science, Information Security or a related field.',
        '3+ years of experience in cybersecurity or a similar role.',
        'Proficiency in network security tools (e.g., firewalls, IDS/IPS, SIEM).',
        'Strong knowledge of security protocols, cryptography, and risk management.',
        'Experience with incident response and threat analysis.'
      ],
      location: 'Hybrid – Bab Ezzouar, Algiers',
      type: 'Full-time',
      hours: 'Monday to Friday, 9 AM to 5 PM (occasional on-call duties required)',
      salary: 'Competitive salary ranging from 90,000DZD to 120,000DZD monthly.',
      benefits: [
        'Comprehensive health, dental, and vision insurance.',
        'Professional development opportunities and certification reimbursements.'
      ],
      images: [
        '/assets/details.png',
        '/assets/details.png'
      ],
      companyOverview: `SecureNet Global is a leading cybersecurity firm dedicated to protecting 
        businesses worldwide from digital threats. With a focus on innovative 
        security solutions and a commitment to excellence, we help our clients
        navigate the complex landscape of cybersecurity. Our team is passionate 
        about staying ahead of emerging threats and delivering top-tier services that 
        ensure our clients' data and networks remain secure.`,
      contact: `For any inquiries, please contact our HR department at careers@securenetglobal.dz\n023–643–6753.`
    }
  }
]

export default function JobsPage() {
  const [selectedApp, setSelectedApp] = useState(null)
  const router = useRouter()

  return (
    <div className="p-4 md:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow p-4">
            <img src={job.image} alt={job.title} className="rounded-md h-40 w-full object-cover mb-4" />
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.company}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setSelectedApp(job)}
                className="text-sm px-4 py-2 hover:cursor-pointer border rounded hover:bg-gray-100"
              >
                Details
              </button>
              <button
                onClick={() => router.push(`/js-dashboard/posts/${job.id}/interview`)}
                className="text-sm px-4 hover:cursor-pointer  py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
              >
                Interview
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-10 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-6xl relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute hover:cursor-pointer top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              <X/>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-1">{selectedApp.title}</h2>
                <p className="text-gray-600 font-medium mb-6">{selectedApp.company}</p>

                <p className="font-semibold mb-1">Job Name</p>
                <p className="text-sm mb-4">{selectedApp.details.name}</p>

                <p className="font-semibold mb-1">Job Description</p>
                <p className="text-sm whitespace-pre-line mb-4">{selectedApp.details.description}</p>

                <p className="font-semibold mb-1">Required Qualifications</p>
                <ul className="list-disc list-inside text-sm mb-4">
                  {selectedApp.details.qualifications.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>

                <p className="font-semibold">Location</p>
                <p className="text-sm mb-2">{selectedApp.details.location}</p>

                <p className="font-semibold">Employment Type</p>
                <p className="text-sm mb-2">{selectedApp.details.type}</p>

                <p className="font-semibold">Work Hours</p>
                <p className="text-sm mb-4">{selectedApp.details.hours}</p>

                <p className="font-semibold mb-1">Salary and Benefits</p>
                <ul className="list-disc list-inside text-sm mb-4">
                  <li>{selectedApp.details.salary}</li>
                  {selectedApp.details.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div>
                <img
                  src={selectedApp.details.images[0]}
                  className="rounded-lg w-full h-44 object-cover mb-4"
                />

                <div className="flex gap-2 mb-4">
                  {selectedApp.details.images.slice(1).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ))}
                </div>

                <p className="font-semibold mb-1">Company Name</p>
                <p className="text-sm mb-4">{selectedApp.company}</p>

                <p className="font-semibold mb-1">Company Overview</p>
                <p className="text-sm whitespace-pre-line mb-4">{selectedApp.details.companyOverview}</p>

                <p className="font-semibold">Contact Information</p>
                <p className="text-sm whitespace-pre-line">{selectedApp.details.contact}</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setSelectedApp(null)
                  router.push(`/js-dashboard/posts/${selectedApp.id}/interview`)
                }}
                className="bg-teal-600 text-white hover:cursor-pointer text-sm px-8 py-3 rounded-md hover:bg-teal-700"
              >
                Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
