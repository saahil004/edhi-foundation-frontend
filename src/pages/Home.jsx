import AppealsCarousel from "../components/sections/AppealsCarousel.jsx";
import FundraiserProgress from "../components/sections/FundraiserProgress";
import Hero from "../components/sections/Hero.jsx";
import ServicesCarousel from "../components/sections/ServicesCarousel.jsx";
import StatsBar from "../components/sections/StatsBar.jsx";
import FounderSection from "../components/sections/FounderSection.jsx";
import DonationWidget from "../components/sections/DonationWidget.jsx";
import FloatingDonateButton from "../components/ui/DonateNow.jsx";
import Honours from "../components/sections/Honours.jsx";
import TeamSection from "../components/sections/TeamSection.jsx";

const Home = () => {

    return (
        <>

            <Hero />
            <FundraiserProgress />
            <ServicesCarousel />
            <AppealsCarousel />
            <div className="overflow-x-hidden w-full"> 
                <StatsBar />
            </div>
            {/* <FounderSection /> */}
            
      <TeamSection />
            {/* <DonationWidget /> */}
            <Honours />
            <FloatingDonateButton/>
        </>
    )
}

export default Home;