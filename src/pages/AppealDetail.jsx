import { useParams, Navigate } from 'react-router-dom'
import { useAppeals } from '../hooks/useAppeals.js'
import ServiceHero from '../components/sections/ServiceHero.jsx'
import ServiceAbout from '../components/sections/ServiceAbout.jsx'
import DonateCard from '../components/ui/DonateCard.jsx'
import RelatedServices from '../components/sections/RelatedServices.jsx'
import { sampleRandom } from '../utils/random.js'

const AppealDetail = () => {
  const { slug } = useParams()
  const { appeals, loading } = useAppeals()

  if (loading) return null

  const appeal = appeals.find((a) => a.slug === slug)

  if (!appeal) {
    return <Navigate to="/appeals" replace />
  }

  const { title, desc, image } = appeal

  const relatedAppeals = sampleRandom(appeals.filter((a) => a.slug !== slug), 3)

  return (
    <>
      <ServiceHero image={image} title={title} desc={desc} Icon={null} />

      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <ServiceAbout desc={desc} />
          <DonateCard title={title} />
        </div>

        <RelatedServices services={relatedAppeals} basePath="/appeals" title="Other Appeals You Can Support" />
      </section>
    </>
  )
}

export default AppealDetail