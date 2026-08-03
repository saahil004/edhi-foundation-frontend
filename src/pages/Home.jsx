import AppealsCarousel from "../components/sections/AppealsCarousel.jsx";
import FundraiserProgress from "../components/sections/FundraiserProgress";
import Hero from "../components/sections/Hero.jsx";
import ServicesCarousel from "../components/sections/ServicesCarousel.jsx";
import StatsBar from "../components/sections/StatsBar.jsx";
import FounderSection from "../components/sections/FounderSection.jsx";
import DonationWidget from "../components/sections/DonationWidget.jsx";
import Honours from "../components/sections/Honours.jsx";
import TeamSection from "../components/sections/TeamSection.jsx";
import InfiniteMarquee from "../components/ui/InfiniteMarquee.jsx";
import Seo from "../components/ui/Seo.jsx";

// Tells search engines this page represents a real-world organization —
// shows up as a knowledge-panel-style card in search results and lets
// Google associate the verified social accounts with this site.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Abdul Sattar Edhi Foundation",
  alternateName: "Edhi Foundation",
  logo: "/ef_logo.png",
  foundingDate: "1951",
  description:
    "Pakistan's largest charity, providing free ambulance services, hospitals, orphan care, food distribution, and emergency relief regardless of religion, race, or background.",
  sameAs: [
    "https://www.facebook.com/EdhiFoundationUK/",
    "https://twitter.com/edhiorg",
    "https://www.instagram.com/edhi.foundation",
    "https://www.linkedin.com/in/edhi-foundation-a11b9195/",
  ],
}

const marqueeItems = [
  'Serving Humanity Since 1951',
  'No Cost, No Discrimination',
  "Pakistan's Largest Charity",
  'Every Donation Makes a Difference',
  'Trusted & Transparent',
]

const Home = () => {

    return (
        <>
            <Seo description="Abdul Sattar Edhi Foundation — Pakistan's largest charity, providing free ambulance services, hospitals, orphan care, and emergency relief since 1951." />
            <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>

            <Hero />
            <div className="overflow-hidden lg:hidden">
                <InfiniteMarquee items={marqueeItems} />
            </div>
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
        </>
    )
}

export default Home;