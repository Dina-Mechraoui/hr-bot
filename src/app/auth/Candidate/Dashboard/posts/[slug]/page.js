"use client";

import { getJobOffer, getOneJobOffer } from "@/api/candidate";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function JobPage() {
  const [job, setJob] = useState(null);
  const [interaction_id, setId] = useState(null);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const link = params.slug;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res1 = await getJobOffer(link);
        if (res1?.interviewCompleted) {
          setAlreadyCompleted(res1.interviewCompleted);
          const jobData = await getOneJobOffer(res1.job_id);
          setJob(jobData);
        } else {
          setJob(res1.jobData);
          setId(res1.interaction_id);
        }
      } catch (err) {
        console.error("Error fetching job:", err);
      }
    };

    if (link) fetchJob();
  }, [link]);

  const handleInterviewClick = () => {
    if (interaction_id) {
      router.push(`/auth/Candidate/Dashboard/posts/${link}/${interaction_id}`);
    }
  };

  if (!job) {
    return <div className="p-8 text-center text-gray-500">Loading job offer...</div>;
  }

  return (
    <div className="w-full px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">{job.job_name}</h1>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="font-semibold text-gray-800">Job Name</h2>
          <p>{job.job_name}</p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-800">Job Description</h2>
          <p>{job.job_description}</p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-800">Required Qualifications</h2>
          <p className="whitespace-pre-line">{job.required_qualification}</p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-800">Location</h2>
          <p>{job.location}</p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-800">Employment Type</h2>
          <p>{job.employment_type.replace("_", " ")}</p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-800">Work Hours</h2>
          <p>{job.work_hours}</p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-800">Salary and Benefits</h2>
          <p className="whitespace-pre-line">{job.salary_and_benefits}</p>
        </section>
      </div>

      <div className="mt-10">
        <button
          onClick={handleInterviewClick}
          disabled={alreadyCompleted}
          className={`font-semibold px-6 py-2 rounded text-white ${
            alreadyCompleted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 rounded-sm"
          }`}
        >
          {alreadyCompleted ? "Interview Already Completed" : "Interview"}
        </button>
      </div>
    </div>
  );
}
