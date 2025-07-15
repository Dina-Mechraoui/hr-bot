import { useEffect, useState } from 'react';
import { getApplicantsById } from '@/api/hr';

export function useApplicants(jobId) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplicantsById(jobId);
        const all = response;
        console.log('appli',all)
        setApplicants(all);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchApplications();
  }, [jobId]);

  return { applicants, loading, error };
}
