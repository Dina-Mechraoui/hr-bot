'use client'

import { useEffect, useRef, useState } from 'react'
import { Send } from "@deemlol/next-icons";

export default function InterviewPage() {
  const job = {
    id: '1',
    title: 'Cybersec analyst',
    company: 'SecureNet Global',
    details: {
      name: 'Cybersecurity Analyst',
      description:
        'As a Cybersecurity Analyst at SecureNet Global, you will be responsible for monitoring, analyzing, and responding to security events and incidents across our clients’ networks...',
      qualifications: [
        'Bachelor’s degree in Computer Science, Information Security or a related field.',
        '3+ years of experience in cybersecurity or a similar role.',
        'Proficiency in network security tools and technologies.',
        'Strong knowledge of security protocols, cryptography, and risk management.',
        'Experience with incident response and threat analysis.',
      ],
      location: 'Hybrid – Bab Ezzouar, Algiers',
      type: 'Full-time',
      hours: 'Monday to Friday, 9 AM to 5 PM',
      companyOverview:
        'SecureNet Global is a leading cybersecurity firm dedicated to protecting businesses worldwide from digital threats...',
      contact: 'careers@securenetglobal.dz\n023–643–6753',
    },
  }

  const chat = [
    {
      sender: 'bot',
      text: `Hi Lilia,\nIt’s great to see your application for the Cybersecurity Analyst position at SecureNet Global! We're really excited to learn more about your skills and experience. Looking forward to connecting with you!\nLet’s begin with the first question. How do you prioritize and respond to security incidents in a high-pressure environment?`,
      time: 'Today 11:51',
    },
    {
      sender: 'user',
      text: `I prioritize incidents based on their severity and potential impact on the network. I use established protocols to quickly assess the situation, contain the threat, and implement corrective measures while maintaining clear communication with the team and stakeholders.`,
      time: 'Today 11:52',
    },
    {
      sender: 'bot',
      text: `Your response shows a strong understanding of incident prioritization and clear communication, which is crucial in high-pressure environments. It’s great that you mentioned protocols and teamwork. Can you describe a time when you identified a critical vulnerability? How did you address it?`,
      time: 'Today 11:52',
    },
    {
      sender: 'user',
      text: `I once identified a critical vulnerability in our network that could have led to a data breach. I immediately reported it to the team, and we conducted a thorough risk assessment. I then helped implement a patch and strengthened our monitoring to prevent future occurrences.`,
      time: 'Today 11:53',
    },
  ]

  const chatContainerRef = useRef(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [])

  return (
    <div className="p-4 md:p-10">
     <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 items-start">
        <div className="text-sm space-y-4 leading-relaxed">
          <h1 className="text-2xl font-bold">Job Interview</h1>
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-700">{job.company}</p>

          <div>
            <h3 className="font-semibold">Job Description</h3>
            <p>{job.details.description}</p>
          </div>

          <div>
            <h3 className="font-semibold">Required Qualifications</h3>
            <ul className="list-disc list-inside">
              {job.details.qualifications.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>

          <p>
            <span className="font-semibold">Location:</span> {job.details.location}
          </p>
          <p>
            <span className="font-semibold">Employment Type:</span> {job.details.type}
          </p>
          <p>
            <span className="font-semibold">Work Hours:</span> {job.details.hours}
          </p>

          <div>
            <h3 className="font-semibold">Company Overview</h3>
            <p className="whitespace-pre-line">{job.details.companyOverview}</p>
          </div>

          <div>
            <h3 className="font-semibold">Contact Information</h3>
            <p className="whitespace-pre-line">{job.details.contact}</p>
          </div>
        </div>

        <div className="flex flex-col h-[80vh] border rounded-lg shadow overflow-hidden bg-[#f8f9fa]">
          <div className="bg-white px-6 py-5 border-b">
            <div className="flex items-center gap-3">
              <div className="text-xl">🤖</div>
              <div>
                <h2 className="text-base font-semibold">Welcome to HR Bot</h2>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {job.company}
                </div>
              </div>
            </div>
            <p className="text-xs mt-2 text-gray-500">
              Get ready for a quick and efficient interview experience. HR Bot will guide you through the process, asking questions just like a human interviewer.
            </p>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 px-6 py-4 overflow-y-auto space-y-4"
          >
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] rounded-lg px-4 py-3 text-sm shadow ${
                  msg.sender === 'bot'
                    ? 'bg-[#2c2d30] text-white'
                    : 'ml-auto bg-[#36847c] text-white'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <p className="text-xs mt-1 text-right text-gray-300">{msg.time}</p>
              </div>
            ))}
          </div>

          <div className="bg-white px-4 py-3 border-t flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
              <img src="/avatar.png" alt="You" className="w-6 h-6 rounded-full" />
            </div>
            <input
              placeholder="Type your message"
              className="flex-1 text-sm px-4 py-2 border rounded-full focus:outline-none"
            />
            <button className="bg-[#36847c] text-white p-2 rounded-full ">
              <Send/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}