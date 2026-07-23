import React from "react";
import ServiceBanner from "../components/sections/ServicePageBanner.jsx";
import InfiniteMarquee from '../components/ui/InfiniteMarquee.jsx'
import ServicesGrid from "../components/sections/ServicesGrid.jsx";
import MobileServicesGrid from "../components/sections/MobileServicesGrid.jsx";
import BenefitsSection from "../components/sections/BenefitsSection.jsx";
import WhyChooseUsSection from "../components/sections/WhyChooseUsSection.jsx";
import ServicesFAQ from "../components/sections/ServicesFAQ.jsx";

const Services = () => {

    const maruqueeItems = [
  'Hospital',
  'Children Services',
  'Edhi Homes Orphanage',
  'Educational Services',
  'Ambulance',
  'Graveyard',
  'Workshop',
  'Missing Person',
  'Rooti Plant',
  'Kitchen',
  'In House Bakery',
  'Langer Service',
  'Online Qurbani Service',
  'Refugees Assistance',
  'Covid 19 Assistance',
  'Honorary & Voluntary',
  'Marriage Bureau',
  'Edhi Morgue',
  'Welfare Centers',
  'Rehabilitation Center',
  'Edhi Rikshaw Rozgar Scheme',
  'Edhi Animal Hostel',
]

    return (
        <>
        <main>
          <ServiceBanner />
          <div className="overflow-hidden">
          <InfiniteMarquee items={maruqueeItems}/>
          </div>

          <ServicesGrid />
          <MobileServicesGrid />
          <BenefitsSection />
          <WhyChooseUsSection/>
          <ServicesFAQ />
        </main>  
        </>
    )
}

export default Services;