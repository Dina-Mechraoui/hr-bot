export default function JobCard({ job }) {
    return (
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
        <img
          src={job.image}
          alt={job.title}
          className="rounded-md h-40 w-full object-cover mb-4"
        />
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="text-sm text-gray-500">{job.company}</p>
        <div className="mt-4 flex justify-between">
          <a
            href={`/jobs/${job.id}`}
            className="text-sm px-4 py-2 border rounded hover:bg-gray-100"
          >
            Details
          </a>
          <button className="text-sm px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
            Interview
          </button>
        </div>
      </div>
    )
  }
  