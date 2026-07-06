import AppealsCarousel from "../components/sections/AppealsCarousel.jsx";
import FundraiserProgress from "../components/sections/FundraiserProgress";
import Hero from "../components/sections/Hero.jsx";
import ServicesCarousel from "../components/sections/ServicesCarousel.jsx";
import StatsBar from "../components/sections/StatsBar.jsx";
import FounderSection from "../components/sections/FounderSection.jsx";
import DonationWidget from "../components/sections/DonationWidget.jsx";

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
            <FounderSection />
            <DonationWidget />

        </>
    )
}

export default Home;