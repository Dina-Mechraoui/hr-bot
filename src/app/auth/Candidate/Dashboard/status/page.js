'use client';

import { getApplicationsJsStatus } from '@/api/candidate';
import { useEffect, useState } from 'react';

const tabs = ['Accepted', 'Pending', 'Rejected'];

const statusColors = {
  Accepted: 'border-[#16a34a] font-semibold',
  Pending: 'border-[#f97316] font-semibold',
  Rejected: 'border-[#dc2626] font-semibold',
};

const dotColors = {
  Accepted: '#16a34a',
  Pending: '#f97316',
  Rejected: '#dc2626',
};

export default function ApplicationStatus() {
  const [activeTab, setActiveTab] = useState('Accepted');
  const [applications, setApplications] = useState({
    Accepted: [],
    Pending: [],
    Rejected: [],
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplicationsJsStatus();
        const all = response.applications || [];

        const categorized = {
          Accepted: [],
          Pending: [],
          Rejected: [],
        };

        all.forEach(app => {
          const status = app.status?.toLowerCase();
          if (status === 'hired') categorized.Accepted.push(app);
          else if (status === 'pending') categorized.Pending.push(app);
          else if (status === 'rejected') categorized.Rejected.push(app);
        });

        setApplications(categorized);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    fetchApplications();
  }, []);

  const list = applications[activeTab];

  return (
    <div className="md:p-10 p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Application Status</h1>

      <div className="flex gap-6 text-sm font-medium border-b mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? `${statusColors[tab]} border-b-2`
                : 'text-gray-500 hover:text-[#468585] hover:cursor-pointer'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {list.length > 0 ? (
          list.map((item) => (
            <div key={item.id} className="border-b pb-4 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-800 flex items-center gap-2">
                  <span
                    className="text-xl"
                    style={{ color: dotColors[activeTab] }}
                  >
                    •
                  </span>
                  {item.job_title}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  <span className="font-semibold">{item.company || 'Company Name'}</span> • {item.applied_at}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-6">
            No applications in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
