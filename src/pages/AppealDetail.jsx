import { useParams, Navigate } from 'react-router-dom'
import { appeals } from '../data/appealsData.js'
import ServiceHero from '../components/sections/ServiceHero.jsx'
import ServiceAbout from '../components/sections/ServiceAbout.jsx'
import DonateCard from '../components/ui/DonateCard.jsx'
import RelatedServices from '../components/sections/RelatedServices.jsx'

const AppealDetail = () => {
  const { slug } = useParams()
  const appeal = appeals.find((a) => a.slug === slug)

  if (!appeal) {
    return <Navigate to="/appeals" replace />
  }

  const { title, desc, image } = appeal

  const relatedAppeals = appeals
    .filter((a) => a.slug !== slug)
    .slice(0, 3)

  return (
    <>
      <ServiceHero image={image} title={title} desc={desc} Icon={null} />

      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <ServiceAbout desc={desc} />
          <DonateCard title={title} />
        </div>

        <RelatedServices services={relatedAppeals} />
      </section>
    </>
  )
}

export default AppealDetail