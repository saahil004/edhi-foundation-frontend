import React from "react";
import AboutBanner from "../components/sections/AboutBanner.jsx";
import OurStory from "../components/sections/OurStory.jsx";
import FounderProfile from "../components/sections/FounderProfile.jsx";
import FounderSection from "../components/sections/FounderSection.jsx";
import StatsBar from "../components/sections/StatsBar.jsx";
import InfiniteMarquee from "../components/ui/InfiniteMarquee.jsx";
import MissionSection from "../components/sections/MissionSection.jsx";
import WhatWeDoSection from "../components/sections/WhatWeDo.jsx";
import OurCauses from "../components/sections/OurCauses.jsx";
import TeamSection from "../components/sections/TeamSection.jsx";
import FAQ from "../components/sections/FAQ.jsx";

const AboutUs = () => {


    return (
        <>
        {/* <main className=""> */}
          {/* <div className="overflow-hidden"> */}
        <main className="overflow-hidden">
          <AboutBanner />
          <InfiniteMarquee />
           <OurStory />
          <MissionSection />
          <WhatWeDoSection/>
          <OurCauses />
          <TeamSection />
          <FAQ />
        </main>
        </>
    )
}

export default AboutUs;