import AppealBanner from "../components/sections/AppealBanner.jsx"
import InfiniteMarquee from '../components/ui/InfiniteMarquee.jsx'
// import { appealsMarqueeItems } from "../data/appealsMarqueeData.js"
import AppealsGrid from "../components/sections/AppealsGrid.jsx"
import MobileAppealsGrid from "../components/sections/MobileAppealsGrid.jsx"
import BenefitsSection from "../components/sections/BenefitsSection.jsx"
import WhyChooseUsSection from "../components/sections/WhyChooseUsSection.jsx"
import ServicesFAQ from "../components/sections/ServicesFAQ.jsx"
import Seo from "../components/ui/Seo.jsx"

const Appeals = () => {
  const marqueeItems = [
  'Bilqees Edhi Hospital',
  'Sadaqah Program',
  'Zakat Program',
  'Aqeeqa Program',
  'Food Bank Program',
  'Lillah Program',
  'Emergency Services Program',
]

  return (
    <main>
      <Seo
        title="Appeals"
        description="Support an active Edhi Foundation appeal — Sadaqah, Zakat, Aqeeqa, food banks, and emergency relief programs you can contribute to directly."
      />
      <AppealBanner />
      <div className="overflow-hidden">
        <InfiniteMarquee items={marqueeItems} />
      </div>

      <AppealsGrid />
      <MobileAppealsGrid />
      <BenefitsSection />
      <WhyChooseUsSection />
      <ServicesFAQ />
    </main>
  )
}

export default Appeals