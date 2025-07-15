'use client';

import { useForm } from '@/hooks/useForm';
import { usePricingFormSubmit } from '@/hooks/usePricingFormSubmit';
import { Toaster } from 'react-hot-toast';

export default function CreateBilling() {
  const { formValues, handleChange } = useForm({
    name: 'STARTER',
    monthly_job_offers: '',
    custom_questions: '',
    questions_per_interview: '',
    is_active: true,
  });
  const handleSubmit = usePricingFormSubmit();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formValues);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Create Pricing Plan</h1>
      <form onSubmit={onSubmit} className="space-y-6">

        <div>
          <label className="block font-semibold mb-1">Name *</label>
          <select
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          >
            <option value="STARTER">STARTER</option>
            <option value="PRO">PRO</option>
            <option value="ENTERPRISE">ENTERPRISE</option>
          </select>
        </div>

        {['monthly_job_offers', 'custom_questions', 'questions_per_interview'].map((field) => (
          <div key={field}>
            <label className="block font-semibold mb-1 capitalize">
              {field.replaceAll('_', ' ')}
            </label>
            <input
              type="number"
              name={field}
              placeholder="0"
              min="0"
              value={formValues[field]}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            />
          </div>
        ))}

        <div>
          <label className="block font-semibold mb-1">Is Active</label>
          <select
            name="is_active"
            value={formValues.is_active.toString()}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-[#468585] text-white px-6 py-2 rounded-full hover:bg-[#386969] transition"
          >
            Submit Plan
          </button>
        </div>
      </form>
    </div>
  );
}
