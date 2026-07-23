import React from "react";
import AboutBanner from "../components/sections/AboutBanner.jsx";
import OurStory from "../components/sections/OurStory.jsx";
import InfiniteMarquee from "../components/ui/InfiniteMarquee.jsx";
import MissionSection from "../components/sections/MissionSection.jsx";
import WhatWeDoSection from "../components/sections/WhatWeDo.jsx";
import OurCauses from "../components/sections/OurCauses.jsx";
// import TeamSection from "../components/sections/TeamSection.jsx";
import FAQ from "../components/sections/FAQ.jsx";
import FounderSection from "../components/sections/FounderSection.jsx";

const AboutUs = () => {
  return (
    <main className="overflow-hidden">
      <AboutBanner />
      <InfiniteMarquee />

      <div id="our-story">
        <OurStory />
      </div>

      <div id="mission-values">
        <MissionSection />
      </div>

<div id="impact-stats">
      <WhatWeDoSection />
      </div>
      <OurCauses />
      
      <FounderSection />
      <FAQ />

      {/* No section exists yet for "Annual Reports" (id="annual-reports"),
          linked from the Home nav dropdown — add one here once there's
          real annual report content to show. */}
    </main>
  )
}

export default AboutUs;