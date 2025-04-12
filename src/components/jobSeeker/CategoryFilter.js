const categories = [
    'All Categories',
    'CS',
    'UI UX Design',
    'IA',
    'Syber Security',
    'BlockChain',
    'DevOps',
    'Graphic Design',
  ]
  
  export default function CategoryFilter() {
    return (
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className="px-3 py-1 text-sm bg-gray-200 rounded-full hover:bg-teal-200"
          >
            {cat}
          </button>
        ))}
      </div>
    )
  }
  