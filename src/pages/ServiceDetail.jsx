import { useParams } from 'react-router-dom'
import { services } from '../data/servicesData.js' // your existing services array

const ServiceDetail = () => {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return <div className="max-w-3xl mx-auto px-6 py-24 text-center">Service not found.</div>
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h1>
      {/* rest of the detail layout, using service.image, service.description, etc. */}
    </section>
  )
}

export default ServiceDetail