'use client';

import { useState } from 'react';
import { ResumeConsultation } from '@/api/candidate';

export default function ResumeConsulter() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    }
  };

  const handleConsult = async () => {
    if (!resumeFile || !jobDescription) return;
  
    setLoading(true);
    try {
      const data = await ResumeConsultation({ jobDescription, resumeFile });
      setResultData(data);
      setShowResult(true);
    } catch (error) {
      alert("Failed to process resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-10 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Resume Consulter</h1>
      <p className="text-sm text-gray-600 mb-10 max-w-2xl">
        Upload your resume and the job description to see how well your qualifications align with the job requirements.
        Our tool will provide insights and suggestions to help you tailor your resume for the best chance of landing the job.
      </p>

      {!showResult && (
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-semibold mb-2">Job description</p>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Describe the job you want to apply for ...."
              className="w-full min-h-[150px] border rounded-md p-3 text-sm resize-none"
            />
          </div>

          <div>
            <p className="font-semibold mb-2">Resume</p>
            <label
              htmlFor="fileUpload"
              className="block w-full border-dashed border-2 border-gray-300 rounded-md p-4 cursor-pointer text-center"
            >
              <input
                id="fileUpload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              {resumeFile ? (
                <p className="text-sm text-gray-800 font-medium">{resumeFile.name}</p>
              ) : (
                <>
                  <p className="text-sm text-gray-600">Select a file or drag and drop here</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, file size no more than 10MB</p>
                </>
              )}
            </label>
          </div>

          <div className="md:col-span-2 flex justify-center">
            <button
              onClick={handleConsult}
              disabled={!resumeFile || !jobDescription || loading}
              className="bg-[#468585] hover:cursor-pointer hover:bg-[#386969] text-white px-10 py-2 rounded-full font-medium transition disabled:opacity-50"
            >
              {loading ? 'Consulting...' : 'Consult'}
            </button>
          </div>
        </div>
      )}

      {showResult && resultData && (
        <div className="space-y-10 mt-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-semibold mb-2">Job description</p>
              <div className="border p-4 rounded-md text-sm text-gray-700 whitespace-pre-wrap bg-white">
                {jobDescription}
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Resume</p>
              <div className="flex items-center nu gap-2 text-sm">
                📄 {resumeFile?.name}{' '}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div>
                <p className="font-bold">Matching Percentage</p>
                <p className="text-sm text-gray-700 mt-1">
                  Our resume matches <strong>{resultData.match_percentage
                  }</strong> of the job description.
                </p>
              </div>

              <div>
                <p className="font-bold">Final Thoughts</p>
                <p className="text-sm text-gray-700 mt-1">{resultData.feedback}</p>
              </div>

              <div>
                <p className="font-bold">Strengths</p>
                <ul className="text-sm text-gray-700 list-disc list-inside">
                  {resultData.strengths.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold">Improvement Tips</p>
                <ul className="text-sm text-gray-700 list-disc list-inside">
                  {resultData.areas_for_improvement.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-bold">Missing Skills</p>
                <ul className="text-sm text-gray-700 list-disc list-inside">
                  {resultData.missing_skills.map((kw, i) => (
                    <li key={i}>{kw}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold">Recommendations</p>
                <ul className="text-sm text-gray-700 list-disc list-inside">
                  {resultData.recommendations.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
