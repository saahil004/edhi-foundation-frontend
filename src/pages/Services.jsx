import React from "react";
import { services } from "../data/servicesData.js"
import ServiceBanner from "../components/sections/ServicePageBanner.jsx";
import InfiniteMarquee from '../components/ui/InfiniteMarquee.jsx'
import ServicesGrid from "../components/sections/ServicesGrid.jsx";
import MobileServicesGrid from "../components/sections/MobileServicesGrid.jsx";

const Services = () => {

    const servicedata = services

    return (
        <>
        <main>
          <ServiceBanner />
          <div className="overflow-hidden">
          <InfiniteMarquee/>
          </div>

          <ServicesGrid />
          <MobileServicesGrid />
        </main>  
        </>
    )
}

export default Services;