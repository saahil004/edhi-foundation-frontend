import ContactBanner from "../components/sections/ContactBanner.jsx";
import ContactForm from "../components/sections/ContactForm.jsx";
import ContactInfo from "../components/sections/ContactInfo.jsx";
import ContactMap from "../components/sections/ContactMap.jsx";
import InfiniteMarquee from "../components/ui/InfiniteMarquee.jsx";
import Seo from "../components/ui/Seo.jsx";

const ContactUs = () => {
    const marqueeItems = [
  '24/7 Emergency Response',
  'Free Ambulance Service',
  'Nationwide Coverage',
  'Always Here to Help',
  'Transparent & Trusted',
  'Serving Since 1951',
  'No Cost, No Discrimination',
  'Your Call Matters',
]

    return (
        <>
          <main>
            <Seo
              title="Contact Us"
              description="Get in touch with the Edhi Foundation — reach our emergency ambulance service, ask a question, or find our office locations."
            />
            <ContactBanner />
            <div className="overflow-hidden">
              
            <InfiniteMarquee items={marqueeItems}/>
            </div>
            <ContactInfo />
            <ContactForm />
            <ContactMap />
          </main>
        </>
    )
}

export default ContactUs;