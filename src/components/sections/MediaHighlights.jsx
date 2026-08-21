import RamadanSection from './RamadanSection.jsx'
import EidSection from './EidSection.jsx'
import AirAmbulanceSection from './AirAmbulanceSection.jsx'
import AnimalShelterSection from './AnimalShelterSection.jsx'
import GraveyardSection from './GraveyardSection.jsx'
import SeaRescueSection from './SeaRescueSection.jsx'
import VillageServiceSection from './VillageServiceSection.jsx'
import MarriageSection from './MarriageSection.jsx'
import HospitalSection from './HospitalSection.jsx'

const MediaHighlights = () => {
  return (
    <section className="w-full bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-20 px-6 py-16 md:space-y-28 md:py-20">
        <RamadanSection />
        <EidSection />
        <AirAmbulanceSection />
        <AnimalShelterSection />
        <GraveyardSection />
        <SeaRescueSection />
        <VillageServiceSection />
        <MarriageSection />
        <HospitalSection />
      </div>
    </section>
  )
}

export default MediaHighlights