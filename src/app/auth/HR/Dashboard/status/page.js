'use client';

import { useJobStatus } from "@/hooks/useJobStatus";
import DeleteModal from '@/components/DeleteModal';
import { MoreVertical } from '@deemlol/next-icons';

export default function Status() {
  const {
    jobs,
    postToDelete,
    setPostToDelete,
    openMenu,
    toggleMenu,
    copiedJobId,
    handleCopyLink,
    menuRefs,
    router,
  } = useJobStatus();
  console.log(jobs)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Application Status</h1>
      <hr className="border-gray-300" />

      <div className="space-y-6 flex flex-col-reverse">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            No job offers created yet.
          </p>
        ) : (
          jobs.map(({ job_id, job_name, unique_link }) => {
            const isCopied = copiedJobId === job_id;
            const isMenuOpen = openMenu === job_id;

            return (
              <div key={job_id} className="flex flex-col  border-b pb-4 pt-4 relative">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-900 flex items-center gap-2">
                    <span className="text-[#468585] text-xl">•</span> {job_name}
                  </p>

                  <div className="hidden md:flex gap-2">
                    <button
                      className="px-4 py-2 rounded-full bg-white text-sm font-medium hover:bg-gray-100 transition"
                      onClick={() => router.push(`/auth/HR/Dashboard/status/${job_id}`)}
                    >
                      Applicants
                    </button>
                    <button
                      onClick={() => router.push(`/auth/HR/Dashboard/status/job/${job_id}`)}
                      className="px-4 py-2 rounded-full bg-white text-sm font-medium hover:bg-gray-100 transition"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleCopyLink(job_id, unique_link)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        isCopied
                          ? 'bg-[#468585] text-white'
                          : 'bg-[#468585] text-white hover:bg-[#386969]'
                      }`}
                    >
                      {isCopied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>

                  <div className="md:hidden relative" ref={(el) => (menuRefs.current[job_id] = el)}>
                    <button onClick={() => toggleMenu(job_id)}>
                      <MoreVertical className="w-5 h-5 text-gray-700" />
                    </button>
                    {isMenuOpen && (
                      <div className="absolute right-0 top-6 bg-white border rounded-md shadow-md z-10 text-sm min-w-[120px]">
                        <button
                          className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                          onClick={() => router.push(`/auth/HR/Dashboard/status/${job_id}`)}
                        >
                          Applicants
                        </button>
                        <button
                          className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                          onClick={() => router.push(`/auth/HR/Dashboard/status/job/${job_id}`)}
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleCopyLink(job_id, unique_link)}
                          className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                        >
                          {isCopied ? 'Copied!' : 'Copy Link'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className="text-xs text-red-600 mt-2 w-fit cursor-pointer hover:underline"
                  onClick={() => setPostToDelete({ job_id, job_name })}
                >
                  I want to delete this post
                </button>
              </div>
            );
          })
        )}
      </div>

      <DeleteModal
        post={postToDelete}
        onCancel={() => setPostToDelete(null)}
        onConfirm={() => {
          setPostToDelete(null);
        }}
      />
    </div>
  );
}
