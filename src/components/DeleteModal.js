'use client';

import React, { useState } from 'react';
import { deletePostById } from '@/api/hr';
import toast from 'react-hot-toast';

export default function DeleteModal({ post, onCancel, onDeleteSuccess }) {
  const [loading, setLoading] = useState(false);
  if (!post) return null;

  const { job_id, job_name } = post;

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePostById(job_id);
      if (onDeleteSuccess) onDeleteSuccess(job_id);
      window.location.reload(); 
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-3">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Post</h2>

        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the post{' '}
          <span className="font-semibold text-[#468585]">"{job_name}"</span>?
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
