"use client";

import { useParams, useRouter } from "next/navigation";
import { useJobStatus } from "@/hooks/useJobStatus";
import { useJobOffer } from "@/hooks/useJobOffer";

export default function Invite() {
  const params = useParams();
  const router = useRouter();
  const link = params.id;

  const { job, loading } = useJobOffer(link);
  const { copiedJobId, handleCopyLink } = useJobStatus();

  if (loading || !job) {
    return <div className="p-8 text-center text-gray-500">Loading job offer...</div>;
  }
const isCopied = copiedJobId === job.job_id;


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
          <p>{job.employment_type}</p>
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
      <div className="mt-8 justify-self-end space-x-4">
      <button
        className="px-4 py-2 rounded-full bg-[#468585] text-white text-sm font-medium hover:bg-[#386969] transition"
        onClick={() => router.push(`/auth/HR/Dashboard/status/${job.job_id}`)}
      >
        Applicants
      </button>
        <button
          onClick={() => handleCopyLink(job.job_id, job.unique_link)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          isCopied
            ? 'bg-[#468585] text-white'
            : 'bg-[#468585] text-white hover:bg-[#386969]'
        }`}
        >
          {isCopied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
