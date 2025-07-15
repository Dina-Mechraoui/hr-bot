"use client";

import TrackerCircle from "@/components/TrackerCircle"; 
import { useState, useEffect } from "react";
import { getUsageTracker } from "@/api/hr";

export default function UsageTracker() {
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsageTracker();
        setUsage(data);
      } catch (error) {
        console.error("Error fetching usage tracker data:", error);
      }
    };

    fetchData();
  }, []);

  const parseUsage = (usageStr) => {
    if (!usageStr || !usageStr.includes("/")) return [0, 0];
    return usageStr.split("/").map((val) => parseInt(val, 10));
  };

  const [postsUsed, postsLimit] = parseUsage(usage?.posts_used);

  return (
    <div className="p-10">
      <h2 className="text-2xl max-sm:text-center font-bold mb-10 text-[#1f2937]">Usage tracker</h2>
      <div className="flex flex-wrap justify-center sm:justify-start gap-16">
        <TrackerCircle
          label="Posts Used"
          value={postsUsed}
          total={postsLimit}
        />
        <TrackerCircle
          label="Applicants"
          value={usage?.applicants_count ?? 0}
          total={'NA'}
          subtitle=""
        />
        <TrackerCircle
          label="Recruitments"
          value={usage?.recruitments_count ?? 0}
          total={'NA'} 
          subtitle=""
        />
      </div>
    </div>
  );
}
