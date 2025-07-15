'use client';

import { useEffect, useState } from 'react';
import {
  fetchPendingUsers,
  fetchBillingPlans,
  approveHrAccount,
} from '@/api/admin';

export default function PendingUsersPage() {
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedUsers, fetchedPlans] = await Promise.all([
          fetchPendingUsers(),
          fetchBillingPlans(),
        ]);
        setUsers(fetchedUsers || []);
        setPlans(fetchedPlans || []);
      } catch (err) {
        console.error('Error fetching users or plans:', err);
      }
    };

    fetchData();
  }, []);

  const handlePlanChange = (userId, planId) => {
    setSelectedPlans((prev) => ({ ...prev, [userId]: planId }));
  };

  const handleAssignPlan = async (userId) => {
    const selectedPlanId = selectedPlans[userId];
    if (!selectedPlanId) return;

    try {
      await approveHrAccount({
        user_id: userId,
        status: 'approved',
        id_plan: selectedPlanId,
      });

      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      console.error('Error approving HR account:', err);
    }
  };

  return (
    <div className="p-6 space-y-6 ">
      <h1 className="text-2xl font-bold text-gray-900">Pending Users</h1>
      <p className="text-sm text-gray-600">{users.length} pending accounts</p>

      {users.length === 0 ? (
        <p className="text-gray-500 mt-6">No pending users.</p>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Select Plan</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800 max-h-[200px] overflow-y-auto">
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-200">
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <select
                      value={selectedPlans[user.id] || ''}
                      onChange={(e) => handlePlanChange(user.id, e.target.value)}
                      className="border rounded px-3 py-1 text-sm w-full"
                    >
                      <option value="">Select a billing plan</option>
                      {plans.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleAssignPlan(user.id)}
                      className="bg-[#468585] text-white px-4 py-1.5 rounded-full hover:bg-[#386969] transition text-sm"
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
