'use client';

import { useState } from 'react';

export default function CreateJobPost() {
  const [form, setForm] = useState({
    jobName: '',
    description: '',
    qualifications: '',
    location: '',
    workHours: '',
    benefits: '',
    employmentType: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted form:', form);
  };

  return (
    <div className="p-2 py-4 sm:p-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Create a post</h1>
      <p className="text-sm text-gray-600 max-w-2xl mb-10">
        Upload your resume and the job description to see how well your qualifications align with the job requirements.
        Our tool will provide insights and suggestions to help you tailor your resume for the best chance of landing the job.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div>
            <label className="font-semibold">Job name</label>
            <input
              type="text"
              name="jobName"
              placeholder="Describe the job you want to apply for ...."
              value={form.jobName}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 mt-1 text-sm"
            />
          </div>

          <div>
            <label className="font-semibold">Job description</label>
            <textarea
              name="description"
              placeholder="Describe the job you want to apply for ...."
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 mt-1 text-sm min-h-[100px]"
            />
          </div>

          <div>
            <label className="font-semibold">Required qualification</label>
            <textarea
              name="qualifications"
              placeholder="Describe the job you want to apply for ...."
              value={form.qualifications}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 mt-1 text-sm min-h-[100px]"
            />
          </div>

          <div>
            <label className="font-semibold">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Describe the job you want to apply for ...."
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 mt-1 text-sm"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="relative w-40 h-40 rounded-md bg-gray-200 flex items-center justify-center">
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-3xl text-white bg-[#468585] w-12 h-12 rounded-full flex items-center justify-center"
                  >
                    +
                  </label>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">Work hours</label>
              <input
                type="text"
                name="workHours"
                placeholder="Describe the job you want to apply for ...."
                value={form.workHours}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 mt-1 text-sm"
              />
            </div>

            <div>
              <label className="font-semibold">Salary and benefits</label>
              <textarea
                name="benefits"
                placeholder="Describe the job you want to apply for ...."
                value={form.benefits}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 mt-1 text-sm min-h-[100px]"
              />
            </div>

            <div>
              <label className="font-semibold">Employement type</label>
              <input
                type="text"
                name="employmentType"
                placeholder="Describe the job you want to apply for ...."
                value={form.employmentType}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 mt-1 text-sm"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-[#468585] text-white text-sm font-medium px-8 py-2 rounded-full hover:bg-[#386969] transition"
            >
              Publish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
