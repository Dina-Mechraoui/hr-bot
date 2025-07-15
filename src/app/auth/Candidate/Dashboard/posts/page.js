'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getJobOffers } from '@/api/candidate';


export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getJobOffer = async () => {
      try {
        const res = await getJobOffers();
        console.log(res)
        setJobs(res);
      } catch (error) {
        console.error('Failed to fetch job offers:', error);
      }
    };

    getJobOffer();
  }, []);

  return (
    <div className="p-4 md:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {jobs.map((job) => (
          <div
            key={job.job_id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full"
          >
            <img
              src={job.pictures ||'/assets/pic1.png'}
              alt={job.job_name}
              className="rounded-md h-40 w-full object-cover mb-4"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-1">{job.job_name}</h3>
              <p className="text-sm text-gray-500">{job.location || 'No location specified'}</p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => router.push(`/auth/Candidate/Dashboard/posts/${job.unique_link}`)}
                className="text-sm px-4 py-2 border rounded hover:bg-gray-100 transition"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
