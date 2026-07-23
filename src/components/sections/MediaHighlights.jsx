import RamadanSection from './RamadanSection.jsx'
import EidSection from './EidSection.jsx'
import MuharramSection from './MuharramSection.jsx'
import WinterSection from './WinterSection.jsx'
import MarriageSection from './MarriageSection.jsx'
import HospitalSection from './HospitalSection.jsx'

const MediaHighlights = () => {
  return (
    <section className="w-full bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-20 px-6 py-16 md:space-y-28 md:py-20">
        <RamadanSection />
        <EidSection />
        <MuharramSection />
        <WinterSection />
        <MarriageSection />
        <HospitalSection />
      </div>
    </section>
  )
}

export default MediaHighlights