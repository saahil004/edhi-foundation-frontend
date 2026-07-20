import { useParams, Navigate } from 'react-router-dom'
import { services, iconMap } from '../data/servicesData.js'
import ServiceHero from '../components/sections/ServiceHero.jsx'
import ServiceAbout from '../components/sections/ServiceAbout.jsx'
import DonationProgressCard from '../components/ui/DonationProgressCard.jsx'
import RelatedServices from '../components/sections/RelatedServices.jsx'

const ServiceDetail = () => {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return <Navigate to="/services" replace />
  }

  const { title, desc, image, icon, raised, goal } = service
  const Icon = iconMap[icon]

  const relatedServices = services
    .filter((s) => s.slug !== slug)
    .slice(0, 3)

  return (
    <>
      <main>
        <div className="overflow-hidden"><ServiceHero image={image} title={title} desc={desc} Icon={Icon} />
        </div>
        <section className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <ServiceAbout desc={desc} />
            <DonationProgressCard raised={raised} goal={goal} />
          </div>

          <RelatedServices services={relatedServices} />
        </section>
      </main>
    </>
  )
}

export default ServiceDetail