import React from "react";
import AboutBanner from "../components/sections/AboutBanner";
import OurStory from "../components/sections/OurStory";
import FounderProfile from "../components/sections/FounderProfile";
import FounderSection from "../components/sections/FounderSection";
import StatsBar from "../components/sections/StatsBar";
import InfiniteMarquee from "../components/ui/InfiniteMarquee";
import MissionSection from "../components/sections/MissionSection";

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
        </main>
        </>
    )
}

export default AboutUs;