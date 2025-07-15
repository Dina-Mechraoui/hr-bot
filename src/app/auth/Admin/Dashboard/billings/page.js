'use client';

import { useEffect, useState } from 'react';
import { fetchBillingPlans, deleteBillingPlan } from '@/api/admin';

export default function AllBillingsPage() {
  const [billings, setBillings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plans = await fetchBillingPlans();
        setBillings(plans || []);
      } catch (err) {
        console.error('Failed to fetch billing plans:', err);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (id) => {
    try {
      await deleteBillingPlan(id);
      setBillings((prev) => prev.filter((plan) => plan.id !== id));
    } catch (err) {
      console.error('Failed to delete billing plan:', err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">All Billing Plans</h1>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 font-semibold text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Monthly Job Offers</th>
              <th className="py-3 px-4 text-left">Custom Questions</th>
              <th className="py-3 px-4 text-left">Questions/Interview</th>
              <th className="py-3 px-4 text-left">Active</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {billings.map((plan) => (
              <tr key={plan.id} className="border-t border-gray-200">
                <td className="py-3 px-4">{plan.name}</td>
                <td className="py-3 px-4">{plan.monthly_job_offers}</td>
                <td className="py-3 px-4">{plan.custom_questions}</td>
                <td className="py-3 px-4">{plan.questions_per_interview}</td>
                <td className="py-3 px-4">
                  {plan.is_active ? 'Yes' : 'No'}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {billings.length === 0 && (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No billing plans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
