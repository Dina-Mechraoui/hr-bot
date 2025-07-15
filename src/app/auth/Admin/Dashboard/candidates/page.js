'use client';

import { useEffect, useState } from 'react';
import { fetchCandidates } from '@/api/admin';

export default function CandidateList() {
  const [usageData, setUsageData] = useState([]);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const data = await fetchCandidates();
        setUsageData(data.data || []);
      } catch (error) {
        console.error("Error loading billing report:", error);
      }
    };

    loadReport();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Candidate Report</h1>

      {usageData.length === 0 ? (
        <p className="text-gray-500">No data available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border-b">Candidate ID</th>
                <th className="px-4 py-2 border-b">Candidate Name</th>
                <th className="px-4 py-2 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {usageData.map((item, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{item.candidate_id}</td>
                  <td className="px-4 py-2">{item.first_name + ' ' + item.last_name}</td>
                  <td className="px-4 py-2">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
