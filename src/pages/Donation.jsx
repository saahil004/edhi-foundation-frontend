import DonationBanner from "../components/sections/DonationBanner.jsx"
import DonationForm from '../components/sections/DonationForm.jsx'
import TopDonations from "../components/sections/TopDonations.jsx";
import InfiniteMarquee from "../components/ui/InfiniteMarquee.jsx";
import Seo from "../components/ui/Seo.jsx";

const Donation = () => {

    const marqueeItems = [
  '100% Goes to Those in Need',
  'Trusted Since 1951',
  'Every Donation Saves Lives',
  'Transparent & Accountable',
  'No Religion, No Race, No Bias',
  'Your Zakat, Delivered Directly',
  'Emergency Relief, Instantly',
  'Join Millions of Donors',
]
    return (
        <>
            <Seo
                title="Donate"
                description="Make a one-time or recurring donation to the Edhi Foundation. Every donation directly supports free ambulances, hospitals, orphan care, and emergency relief."
            />
            <DonationBanner />
            <div className="overflow-hidden">
                <InfiniteMarquee items={marqueeItems}/>
            </div>
            <DonationForm />
            <TopDonations />
        </>
    )
};

export default Donation;