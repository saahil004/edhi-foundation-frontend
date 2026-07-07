import DonationBanner from "../components/sections/DonationBanner.jsx"
import DonationForm from '../components/sections/DonationForm.jsx'
import TopDonors from "../components/sections/TopDonors.jsx";

const Donation = () => {

    return (
        <>
            <DonationBanner />
            <DonationForm />
            <TopDonors />
        </>
    )
};

export default Donation;