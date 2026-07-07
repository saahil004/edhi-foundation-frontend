import DonationStepper from "../ui/DonationStep"
import AmountSelector from "../ui/AmountSelectorCard"
import FrequencySelector from "../ui/FrequencySelector"
import DonorInfoForm from "../ui/DonorInfoForm"

const DonationForm = () => {


    return (
        <>
            <section className="max-w-6xl mx-auto px-6 py-16 space-y-6">
                <DonationStepper />
                <AmountSelector />
                <FrequencySelector />
                <DonorInfoForm />
            </section>
        </>
    )
}

export default DonationForm