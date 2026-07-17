import React from "react";
import { services } from "../data/servicesData.js"
import ServiceBanner from "../components/sections/ServicePageBanner.jsx";
import InfiniteMarquee from '../components/ui/InfiniteMarquee.jsx'
import ServicesGrid from "../components/sections/ServicesGrid.jsx";

const Services = () => {

    const servicedata = services

    return (
        <>
          <ServiceBanner />
          <div className="overflow-hidden">
          <InfiniteMarquee/>
          </div>
          <ServicesGrid />
        </>
    )
}

export default Services;