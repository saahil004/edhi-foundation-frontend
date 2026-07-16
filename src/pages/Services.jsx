import React from "react";
import { services } from "../data/servicesData.js"

const Services = () => {

    const servicedata = services

    return (
        <>
          {
            servicedata.map((service, index) => (
                <div key={index}>
                    <h1>{service.title}</h1>
                </div>
            ))
          }
        </>
    )
}

export default Services;