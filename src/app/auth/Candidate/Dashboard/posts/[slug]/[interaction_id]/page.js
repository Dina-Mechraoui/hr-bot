'use client';

import { useEffect, useRef, useState } from 'react';
import { Send } from "@deemlol/next-icons";
import { useParams } from "next/navigation";
import { getJobOffer, submitInterviewAnswers } from "@/api/candidate";

export default function InterviewChatOnly() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [job, setJob] = useState(null);
  const [interactionId, setInteractionId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const chatContainerRef = useRef(null);
  const params = useParams();
  const link = params.slug;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res1 = await getJobOffer(link);
        const { jobData, interaction_id, questions } = res1;
        setJob(jobData);
        setInteractionId(interaction_id);
        setQuestions(questions);

        const time = () => new Date().toLocaleTimeString();
        setChat([
          {
            sender: 'bot',
            text: generateBotPrompt(questions[0], 0),
            time: time()
          }
        ]);
      } catch (err) {
        console.error("Error fetching job:", err);
      }
    };

    if (link) fetchJob();
  }, [link]);

  const handleSend = async () => {
    if (!message.trim() || isSubmitted) return;

    const time = () => new Date().toLocaleTimeString();
    const userMsg = {
      sender: 'user',
      text: message.trim(),
      time: time()
    };

    const newAnswers = [...answers, message.trim()];
    setAnswers(newAnswers);
    setMessage('');
    setChat(prev => [...prev, userMsg]);
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    if (nextIndex < questions.length) {
      setChat(prev => [
        ...prev,
        {
          sender: 'bot',
          text: generateBotPrompt(questions[nextIndex], nextIndex),
          time: time()
        }
      ]);
    } else {
      setChat(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "That's all for now, thank you for your responses. We'll be reviewing everything and you'll hear back from us shortly!",
          time: time()
        }
      ]);

      try {
        await submitInterviewAnswers(interactionId, newAnswers);
        setIsSubmitted(true);
        setTimeout(() => {
          router.back();
        }, 3000);
      } catch (err) {
        console.error("Error submitting answers:", err);
      }
    }
  };

  const generateBotPrompt = (question) => {
    return `${question}`;
  };

  return (
    <div className="p-4 md:p-10">
      <div className="max-w-3xl mx-auto flex flex-col h-[85vh] border rounded-lg shadow overflow-hidden bg-[#f8f9fa]">
        <div className="bg-white px-6 py-5 border-b">
          <div className="flex items-center gap-3">
            <div className="text-xl">🤖</div>
            <div>
              <h2 className="text-base font-semibold">HR Interview Bot</h2>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {job?.company_name || "Loading..."}
              </div>
            </div>
          </div>
          <p className="text-xs mt-2 text-gray-500">
            HR Bot will guide you through the interview step by step. Please answer each question carefully.
          </p>
        </div>

        <div ref={chatContainerRef} className="flex-1 px-6 py-4 overflow-y-auto space-y-4">
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
            <img src="/assets/avatar.png" alt="You" className="w-6 h-6 rounded-full" />
          </div>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your answer here..."
            className="flex-1 text-sm px-4 py-2 border rounded-full focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isSubmitted}
          />
          <button
            onClick={handleSend}
            disabled={isSubmitted}
            className={`p-2 rounded-full transition ${
              isSubmitted
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#36847c] hover:bg-[#2d6f69] text-white'
            }`}
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
