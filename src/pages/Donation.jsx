import DonationBanner from "../components/sections/DonationBanner.jsx"
import DonationForm from '../components/sections/DonationForm.jsx'
import TopDonors from "../components/sections/TopDonors.jsx";
import InfiniteMarquee from "../components/ui/InfiniteMarquee.jsx";

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
            <DonationBanner />
            <div className="overflow-hidden">
                <InfiniteMarquee items={marqueeItems}/>
            </div>
            <DonationForm />
            <TopDonors />
        </>
    )
};

export default Donation;