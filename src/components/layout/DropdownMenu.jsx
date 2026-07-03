import { Link } from 'react-router-dom'

const DropdownMenu = ({ columns, image }) => {
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 z-40">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {columns.map((col, i) => (
          <ul key={i} className="space-y-4">
            {col.map((item) => (
              <li key={item} className="border-b border-gray-200 pb-1">
                <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        ))}

        {image && (
          <div className="flex flex-col items-center gap-4">
            <img src={image} alt="" className="rounded-2xl w-full h-64 object-cover border" />
            <button className="bg-green-800 hover:bg-green-900 text-white font-semibold px-6 py-2 rounded-md transition-colors">
              See All Services
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DropdownMenu