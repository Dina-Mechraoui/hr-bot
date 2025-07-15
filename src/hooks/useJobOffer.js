import { useEffect, useState } from "react";
import { getOneJobOffer } from "@/api/hr";

export function useJobOffer(jobId) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await getOneJobOffer(jobId);
        setJob(res.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching job offer:", err);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  return { job, loading, error };
}
