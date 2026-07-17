import React from "react";
import AboutBanner from "../components/sections/AboutBanner.jsx";
import OurStory from "../components/sections/OurStory.jsx";
import InfiniteMarquee from "../components/ui/InfiniteMarquee.jsx";
import MissionSection from "../components/sections/MissionSection.jsx";
import WhatWeDoSection from "../components/sections/WhatWeDo.jsx";
import OurCauses from "../components/sections/OurCauses.jsx";
import TeamSection from "../components/sections/TeamSection.jsx";
import FAQ from "../components/sections/FAQ.jsx";

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
      <TeamSection />
      <FAQ />

      {/* No section currently exists for "Impact" (id="impact-stats")
          or "Annual Reports" (id="annual-reports") — add StatsBar or
          a dedicated section here once built, wrapped with the matching id */}
    </main>
  )
}

export default AboutUs;