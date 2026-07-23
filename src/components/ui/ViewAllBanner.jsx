import { HeartHandshake, ArrowRight } from 'lucide-react'

const ViewAllBanner = ({ text, buttonLabel, linkTo = '#' }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-100 rounded-xl px-6 py-5 mt-8">
      <p className="flex items-center gap-3 text-gray-700 text-sm md:text-base">
        <HeartHandshake className="text-green-700 shrink-0" size={22} />
        {text}
      </p>
      <a 
        href={linkTo}
        className="flex items-center gap-2 bg-green-800 hover:bg-green-950 text-white font-semibold px-5 py-2.5 rounded-full whitespace-nowrap transition-colors"
      >
        {buttonLabel} <ArrowRight size={16} />
      </a>
    </div>
  )
}

export default ViewAllBanner