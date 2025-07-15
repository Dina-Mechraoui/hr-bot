'use client';

import { createJobOffer } from '@/api/hr';
import InputField from '@/components/common/InputField';
import TextAreaField from '@/components/common/TextAreaField';
import { useForm } from '@/hooks/useForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateJobPost() {
  const {
    formValues: form,
    handleChange,
    updateField,
  } = useForm({
    job_name: '',
    job_description: '',
    required_qualification: '',
    location: '',
    work_hours: '',
    salary_and_benefits: '',
    employment_type: '',
    pictures: null,
    custom_questions: [],
  });
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      updateField('pictures', file);
    }
  };
  const handleCustomQuestionChange = (index, value) => {
    const updatedQuestions = [...form.custom_questions];
    updatedQuestions[index] = { question: value };
    updateField('custom_questions', updatedQuestions);
  };

  const addCustomQuestion = () => {
    updateField('custom_questions', [...form.custom_questions, { question: '' }]);
  };

  const removeCustomQuestion = (index) => {
    const updatedQuestions = [...form.custom_questions];
    updatedQuestions.splice(index, 1);
    updateField('custom_questions', updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createJobOffer(form);
      router.push(`/auth/HR/Dashboard/status/job/${response.data.job_id}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again later.');
    }
  };

  return (
    <div className="p-2 py-4 sm:p-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Create a post</h1>
      <p className="text-sm text-gray-600 max-w-2xl mb-10">
        Upload your resume and the job description to see how well your qualifications align with the job requirements.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <InputField label="Job name" name="job_name" value={form.job_name} onChange={handleChange} />
          <TextAreaField label="Job description" name="job_description" value={form.job_description} onChange={handleChange} />
          <TextAreaField label="Required qualification" name="required_qualification" value={form.required_qualification} onChange={handleChange} />
          <InputField label="Location" name="location" value={form.location} onChange={handleChange} />

          <div>
            <span className="flex items-center justify-between">
              <label className="font-semibold">Custom Questions</label>
              <button type="button" onClick={addCustomQuestion} className="text-sm underline text-[#468585] hover:text-[#386969] transition">
                + Add a question
              </button>
            </span>
            <div className="space-y-3">
              {form.custom_questions.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => handleCustomQuestionChange(index, e.target.value)}
                    placeholder="Enter a custom question..."
                    className="w-full border rounded px-4 py-2 mt-1 text-sm"
                  />
                  <button type="button" onClick={() => removeCustomQuestion(index)} className="text-sm">remove</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="relative w-40 h-40 rounded-md bg-gray-200 flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-md" />
              ) : (
                <label htmlFor="image-upload" className="cursor-pointer text-3xl text-white bg-[#468585] w-12 h-12 rounded-full flex items-center justify-center">
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

            <InputField label="Work hours" name="work_hours" value={form.work_hours} onChange={handleChange} />
            <TextAreaField label="Salary and benefits" name="salary_and_benefits" value={form.salary_and_benefits} onChange={handleChange} />
            <div>
              <label className="font-semibold">Employment Type</label>
              <select name="employment_type" value={form.employment_type} onChange={handleChange} className="w-full border rounded px-4 py-2 mt-1 text-sm">
                <option value="">Select employment type</option>
                <option value="full_time">Full-time</option>
                <option value="part_time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>

            <div className="pt-4">
              <button type="submit" className="bg-[#468585] text-white text-sm font-medium px-8 py-2 rounded-full hover:bg-[#386969] transition">
                Publish
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}