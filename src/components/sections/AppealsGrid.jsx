import { useAppeals } from '../../hooks/useAppeals.js'
import AppealCard from '../ui/AppealCard.jsx'

const AppealsGrid = () => {
  const { appeals, loading } = useAppeals()

  if (loading) return null

  return (
    <section className="hidden px-6 py-20 md:px-12 lg:block lg:px-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {appeals.map((appeal, i) => (
          <AppealCard
            key={appeal.id}
            slug={appeal.slug}
            title={appeal.title}
            desc={appeal.desc}
            image={appeal.image}
            delay={(i % 3) * 0.1}
            className="h-72"
          />
        ))}
      </div>
    </section>
  )
}

export default AppealsGrid
