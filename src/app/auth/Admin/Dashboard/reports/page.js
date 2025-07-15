'use client';

import { useEffect, useState } from 'react';
import { fetchHrBillingReport } from '@/api/admin';

export default function BillingUsagePage() {
  const [usageData, setUsageData] = useState([]);
useEffect(() => {
  const loadReport = async () => {
    try {
      const data = await fetchHrBillingReport();
      setUsageData(data || []); 
    } catch (error) {
      console.error("Error loading billing report:", error);
    }
  };

  loadReport();
}, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">HR Billing Report</h1>

      {usageData.length === 0 ? (
        <p className="text-gray-500">No report data available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border-b">HR Email</th>
                <th className="px-4 py-2 border-b">Plan Name</th>
                <th className="px-4 py-2 border-b">Job Offers Used</th>
                <th className="px-4 py-2 border-b">Questions Created</th>
                {/* <th className="px-4 py-2 border-b">Job Offer Details</th> */}
              </tr>
            </thead>
            <tbody>
              {usageData.map((item, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{item.hr_email}</td>
                  <td className="px-4 py-2">{item.plan_name}</td>
                  <td className="px-4 py-2">{item.job_offers_used}</td>
                  <td className="px-4 py-2">{item.questions_created}</td>
                  {/* <td className="px-4 py-2">
                    {item.job_offers_details?.length === 0 ? (
                      <span className="text-gray-400 italic">None</span>
                    ) : (
                      <ul className="list-disc list-inside space-y-1">
                        {item.job_offers_details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
