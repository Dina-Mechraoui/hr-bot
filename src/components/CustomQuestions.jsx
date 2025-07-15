'use client';
import React from 'react';

export default function CustomQuestions({ questions, onChange, onAdd, onRemove }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="font-semibold">Custom Questions</label>
        <button
          type="button"
          onClick={onAdd}
          className="text-sm underline text-[#468585] hover:text-[#386969] transition"
        >
          + Add a question
        </button>
      </div>

      <div className="space-y-3">
        {questions.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={item.question}
              onChange={(e) => onChange(index, e.target.value)}
              placeholder="Enter a custom question..."
              className="w-full border rounded px-4 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
