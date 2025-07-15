"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import ConfirmActionModal from "@/components/hr/ConfirmActionModal";
import { useApplicants } from "@/hooks/useApplicants";
import { updateApplicantStatus } from "@/api/hr";

export default function ApplicantsPage() {
  const params = useParams();
  const jobId = params.job_id;
  const { applicants, loading } = useApplicants(jobId);

  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [confirmReject, setConfirmReject] = useState(null);
  const [confirmHire, setConfirmHire] = useState(null);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading applicants...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
      <p className="text-sm text-gray-600">{applicants.length} applicants</p>

      <hr className="border-gray-300" />

      {applicants.length > 0 ? (
       [...applicants].reverse().map((applicant) => (
          <div key={applicant.id} className="border-b py-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="flex items-center gap-1 text-sm text-gray-800">
                  <span className="text-[#16a34a] text-xl">•</span>
                  {applicant.candidate?.name}
                </p>
                <p className="text-xs text-gray-600 font-semibold capitalize">
                  {applicant.status} •{" "}
                  <span className="font-normal">{new Date(applicant.applied_at).toLocaleString()}</span>
                </p>
                <button
                  onClick={() => setConfirmReject(applicant)}
                  disabled={applicant.status !== "pending"}
                  className={`text-xs mt-2 ${
                    applicant.status !== "pending"
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-600 hover:cursor-pointer hover:underline"
                  }`}
                >
                  {applicant.status === "rejected"
                    ? "Already Rejected"
                    : applicant.status === "hired"
                    ? "Already Hired"
                    : "I want to reject this applicant"}
                </button>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setSelectedApplicant(applicant)}
                  className="px-4 py-2 rounded-full bg-white text-sm font-medium hover:bg-gray-100 transition"
                >
                  Details
                </button>
                <button
                  onClick={() => setConfirmHire(applicant)}
                  disabled={applicant.status !== "pending"}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    applicant.status === "hired"
                      ? "bg-[#468585] text-white cursor-not-allowed"
                      : applicant.status === "rejected"
                      ? "bg-gray-300 text-white cursor-not-allowed"
                      : "bg-[#468585] text-white hover:bg-[#386969]"
                  }`}
                >
                  {applicant.status === "hired"
                    ? "Already Hired"
                    : applicant.status === "rejected"
                    ? "Rejected"
                    : "Hire"}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-8">No applicants remaining for this job.</p>
      )}

      {confirmReject && (
        <ConfirmActionModal
          onClose={() => setConfirmReject(null)}
          onConfirm={async () => {
            await updateApplicantStatus(confirmReject.id, { status: "rejected" });
            window.location.reload()
            setConfirmReject(null);
            setSelectedApplicant(null);
          }}
          title="Reject Applicant"
          message={`Are you sure you want to reject "${confirmReject.candidate?.name}"?`}
          type="reject"
        />
      )}

      {confirmHire && (
        <ConfirmActionModal
          onClose={() => setConfirmHire(null)}
          onConfirm={async () => {
            await updateApplicantStatus(confirmHire.id, { status: "hired" });
            window.location.reload()
            setConfirmHire(null);
            setSelectedApplicant(null);
          }}
          title="Hire Applicant"
          message={`Are you sure you want to hire "${confirmHire.candidate?.name}"?`}
          type="hire"
        />
      )}

      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl w-[90vw] max-w-6xl h-[90vh] flex overflow-hidden animate-fadeIn">
            <div className="w-1/3 bg-gray-50 p-6 border-r overflow-y-auto">
              <button
                onClick={() => setSelectedApplicant(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Candidate Info</h2>
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <p className="font-semibold">Name</p>
                  <p>{selectedApplicant.candidate?.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Interview Status</p>
                  <p className="capitalize">{selectedApplicant.status}</p>
                </div>
                <div>
                  <p className="font-semibold">Applied At</p>
                  <p>{new Date(selectedApplicant.applied_at).toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-semibold">Resume</p>
                  <a
                    href={selectedApplicant.candidate?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#468585] hover:underline flex items-center gap-2 mt-1"
                  >
                    <img src="/assets/resume_.svg" className="w-4 h-4" alt="resume" />
                    View Resume PDF
                  </a>
                </div>
              </div>
            </div>

            <div className="w-2/3 p-8 overflow-y-auto space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Interview Review</h2>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Feedback</h3>
                <p className="text-sm whitespace-pre-line text-gray-600 border rounded p-4 bg-gray-50">
                  {selectedApplicant.feedback || "No feedback provided."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Questions & Answers</h3>
                <div className="space-y-4 text-sm">
                  {(selectedApplicant.questions || []).map((q, i) => (
                    <div key={i}>
                      <p className="font-semibold">Q{i + 1}. {q}</p>
                      <p className="text-gray-700 mt-1">A: {selectedApplicant.answers?.[i] || "No answer"}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 flex justify-between items-center border-t mt-8">
                <button
                  onClick={() => setConfirmReject(selectedApplicant)}
                  disabled={selectedApplicant.status !== "pending"}
                  className={`text-sm ${
                    selectedApplicant.status !== "pending"
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-600 hover:underline"
                  }`}
                >
                  {selectedApplicant.status === "rejected"
                    ? "Already Rejected"
                    : selectedApplicant.status === "hired"
                    ? "Already Hired"
                    : "Reject this applicant"}
                </button>
                <button
                  onClick={() => setConfirmHire(selectedApplicant)}
                  disabled={selectedApplicant.status !== "pending"}
                  className={`px-6 py-2 rounded text-sm font-medium ${
                    selectedApplicant.status === "hired"
                      ? "bg-[#468585] text-white cursor-not-allowed"
                      : "bg-[#468585] text-white hover:bg-[#386969]"
                  }`}
                >
                  {selectedApplicant.status === "hired"
                    ? "Already Hired"
                    : "Hire this applicant"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
