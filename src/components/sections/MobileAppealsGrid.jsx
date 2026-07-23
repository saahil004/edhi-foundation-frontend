import { useAppeals } from '../../hooks/useAppeals.js'
import AppealCard from '../ui/AppealCard.jsx'

const MobileAppealsGrid = () => {
  const { appeals, loading } = useAppeals()

  if (loading) return null

  return (
    <section className="grid grid-cols-1 gap-6 px-6 py-20 md:px-12 lg:hidden">
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
    </section>
  )
}

export default MobileAppealsGrid
