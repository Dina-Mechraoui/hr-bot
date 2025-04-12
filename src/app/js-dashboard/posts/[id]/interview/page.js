'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const jobs = [
  {
    id: '1',
    title: 'Cybersec analyst',
    company: 'SecureNet Global',
    details: {
      name: 'Cybersecurity Analyst',
      description: `As a Cybersecurity Analyst at SecureNet Global, you will be responsible for monitoring, analyzing, and responding to security events and incidents across our clients’ networks. You will collaborate with a team of experts to identify vulnerabilities, implement security measures, and ensure compliance with industry standards. This role requires a proactive approach to threat detection and the ability to quickly adapt to evolving cyber threats.`,
      qualifications: [
        'Bachelor’s degree in Computer Science, Information Security or a related field.',
        '3+ years of experience in cybersecurity or a similar role.',
        'Proficiency in network security tools and technologies (e.g., firewalls, IDS/IPS, SIEM).',
        'Strong knowledge of security protocols, cryptography, and risk management.',
        'Experience with incident response and threat analysis.'
      ],
      location: 'Hybrid – Bab Ezzouar, Algiers',
      type: 'Full-time',
      hours: 'Monday to Friday, 9 AM to 5 PM (occasional on-call duties required)',
      companyOverview: `SecureNet Global is a leading cybersecurity firm dedicated to protecting businesses worldwide from digital threats. With a focus on innovative security solutions and a commitment to excellence, we help our clients navigate the complex landscape of cybersecurity. Our team is passionate about staying ahead of emerging threats and delivering top-tier services that ensure our clients' data and networks remain secure.`,
      contact: `For any inquiries, please contact our HR department at careers@securenetglobal.dz\n023–643–6753.`
    }
  }
]

export default function InterviewPage() {
  const { id } = useParams()
  const job = jobs.find(j => j.id === id)

  const [chat, setChat] = useState([])
  const [input, setInput] = useState('')
  const [step, setStep] = useState(0)

  const questions = [
    `Hi Lilia.\nIt’s great to see your application for the Cybersecurity Analyst position at SecureNet Global! We’re really excited to learn more about your skills and experience. Looking forward to connecting with you!\nLet’s begin with the first question. How do you prioritize and respond to security incidents in a high-pressure environment?`,
    `Your response shows a strong understanding of incident prioritization and clear communication, which is crucial in high-pressure environments. It’s great that you mentioned established protocols and teamwork. For an even stronger answer, can you describe a time when you identified a critical vulnerability? How did you address it?`
  ]

  useEffect(() => {
    if (job) {
      setChat([
        { sender: 'bot', text: questions[0], time: 'Today 11:51' }
      ])
    }
  }, [job])

  const handleSend = () => {
    if (!input.trim()) return

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const updated = [...chat, { sender: 'user', text: input.trim(), time: `Today ${now}` }]
    setChat(updated)
    setInput('')

    setTimeout(() => {
      if (step + 1 < questions.length) {
        setChat(prev => [
          ...prev,
          { sender: 'bot', text: questions[step + 1], time: `Today ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` }
        ])
        setStep(step + 1)
      }
    }, 1200)
  }

  if (!job) return <div className="p-10 text-center">Job not found</div>

  return (
    <div className="p-4 md:p-10 ">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* LEFT PANEL */}
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

          <p><span className="font-semibold">Location:</span> {job.details.location}</p>
          <p><span className="font-semibold">Employment Type:</span> {job.details.type}</p>
          <p><span className="font-semibold">Work Hours:</span> {job.details.hours}</p>

          <div>
            <h3 className="font-semibold">Company Overview</h3>
            <p className="whitespace-pre-line">{job.details.companyOverview}</p>
          </div>

          <div>
            <h3 className="font-semibold">Contact Information</h3>
            <p className="whitespace-pre-line">{job.details.contact}</p>
          </div>
        </div>

        {/* RIGHT PANEL: HR Bot Chat */}
        <div className="flex flex-col h-[80vh] border rounded-lg shadow overflow-hidden bg-[#f8f9fa]">
          {/* HEADER */}
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
              Get ready for a quick and efficient interview experience. HR Bot will guide you through the process, asking questions just like a human interviewer. Answer at your own pace, and let HR Bot handle the rest!
            </p>
          </div>

          {/* CHAT BODY */}
          <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4">
            {chat.map((msg, i) => (
              <div key={i} className={`max-w-[80%] rounded-lg px-4 py-3 text-sm shadow ${msg.sender === 'bot' ? 'bg-[#2c2d30] text-white' : 'ml-auto bg-[#36847c] text-white'}`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <p className="text-xs mt-1 text-right text-gray-300">{msg.time}</p>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="bg-white px-4 py-3 border-t flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
              <img src="/avatar.png" alt="You" className="w-6 h-6 rounded-full" />
            </div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message"
              className="flex-1 text-sm px-4 py-2 border rounded-full focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-[#36847c] hover:bg-[#2f6f68] text-white p-2 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
