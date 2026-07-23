import { Link } from 'react-router-dom'

const ComingSoon = ({ title }) => (
  <main className="min-h-[60vh] flex items-center justify-center px-6 py-24 text-center">
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-500 mb-8">This page is coming soon. Check back later.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
      >
        Back to Home
      </Link>
    </div>
  </main>
)

export default ComingSoon
