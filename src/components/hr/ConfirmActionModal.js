'use client';

import React from 'react';

export default function ConfirmActionModal({
  onClose,
  onConfirm,
  title,
  message,
  type = 'default',
}) {

  const isReject = type === 'reject';
  const isHire = type === 'hire';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center h-full bg-black/30">
      <div className="bg-white rounded-lg text-center p-6 w-full max-w-sm relative"
      >
        <h2 className={`text-lg font-bold  mb-2 ${isReject ? 'text-red-600' : isHire ? 'text-green-600' : 'text-gray-800'}`}>
          {title}
        </h2>
        <p className="text-sm text-gray-700 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded-full hover:cursor-pointer hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm rounded-full hover:cursor-pointer text-white ${
              isReject ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
