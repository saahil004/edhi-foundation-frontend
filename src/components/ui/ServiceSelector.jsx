const ServiceSelector = ({ services = [], selectedService, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <label htmlFor="service-select" className="block font-bold text-gray-900 text-lg mb-4">
        Choose a service to donate to
      </label>
      <select
        id="service-select"
        value={selectedService ?? ''}
        onChange={(e) => onSelect(Number(e.target.value))}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
      >
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ServiceSelector