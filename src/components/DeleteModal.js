'use client';

import React from 'react';

export default function DeleteModal({ post, onConfirm, onCancel }) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center p-3 justify-center bg-black/20">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Post</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the post{' '}
          <span className="font-semibold text-[#468585]">"{post.title}"</span>?
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:cursor-pointer hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-full hover:cursor-pointer hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
