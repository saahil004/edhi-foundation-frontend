import React from "react";
import AboutBanner from "../components/sections/AboutBanner";
import OurStory from "../components/sections/OurStory";
import FounderProfile from "../components/sections/FounderProfile";
import MissionValues from "../components/sections/MissionValues";
import FounderSection from "../components/sections/FounderSection";
import StatsBar from "../components/sections/StatsBar";
import InfiniteMarquee from "../components/ui/InfiniteMarquee";

const AboutUs = () => {


    return (
        <>
        {/* <main className=""> */}
          {/* <div className="overflow-hidden"> */}
        <main className="overflow-hidden">
          <AboutBanner />
          <InfiniteMarquee />
          
          <OurStory />
        </main>
        </>
    )
}

export default AboutUs;