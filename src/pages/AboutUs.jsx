import React from "react";
import AboutBanner from "../components/sections/AboutBanner";
import OurStory from "../components/sections/OurStory";
import FounderProfile from "../components/sections/FounderProfile";
import MissionValues from "../components/sections/MissionValues";
import FounderSection from "../components/sections/FounderSection";
import StatsBar from "../components/sections/StatsBar";


const AboutUs = () => {


    return (
        <>
        {/* <main className=""> */}
          <div className="overflow-hidden">

          <AboutBanner />
          <div className="my-5">
          <OurStory />
          </div>
          <FounderProfile />
          <MissionValues />
          <div className="overflow-hidden">
          <FounderSection />
          <StatsBar />
          </div>
          </div>
          
{/* </main>           */}
        </>
    )
}

export default AboutUs;