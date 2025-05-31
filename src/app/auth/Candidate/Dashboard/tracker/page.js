"use client";
import { getUsageTracker } from "@/api/candidate";
import TrackerCircle from "@/components/TrackerCircle";
import { useState, useEffect } from "react";

export default function CandidateUsageTracker() {
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsageTracker();
        setUsage(data);
        console.log(data);
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

  const [appsUsed, appsLimit] = parseUsage(usage?.applications);
  const [resumesUsed, resumesLimit] = parseUsage(usage?.resume_consults);

  console.log(usage);

  return (
    <div className="p-4 md:p-10">
      <h2 className="text-2xl max-sm:text-center font-bold mb-10 text-gray-800">Usage Tracker</h2>
      <div className="flex flex-wrap justify-center sm:justify-start gap-16">
      <TrackerCircle
          label="Applications"
          value={appsUsed}
          total={appsLimit}
          subtitle="Days Left: Unknown"
        />
        <TrackerCircle
          label="Resume consulter"
          value={resumesLimit}
          total={resumesUsed}
          subtitle="Days Left: Unknown"
        />
      </div>
    </div>
  );
}
