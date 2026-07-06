import { Link } from 'react-router-dom'
import servicedd from '../../assets/images/servicedd.png'

const DropdownMenu = ({ columns, image }) => {
  const dropdownImage = servicedd

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col, i) => (
          <ul key={i} className="space-y-1.5">
            {col.map((item) => (
              <li key={item} className="border-b border-gray-200 pb-1">
                <a href="#" className="text-gray-700 hover:text-red-600 transition-colors text-sm">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        ))}

        {dropdownImage && (
          <div className="flex flex-col items-center gap-2">
            <img src={dropdownImage} alt="" className="rounded-2xl w-full h-40 object-cover border" />
            <button className="bg-green-800 hover:bg-green-900 text-white font-semibold px-5 py-1.5 rounded-md transition-colors text-sm">
              See All Services
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DropdownMenu