import ContactBanner from "../components/sections/ContactBanner.jsx";
import ContactForm from "../components/sections/ContactForm.jsx";
import ContactInfo from "../components/sections/ContactInfo.jsx";
import ContactMap from "../components/sections/ContactMap.jsx";
const ContactUs = () => {


    return (
        <>
          <main>
            <ContactBanner />
            <ContactInfo />
            <ContactForm />
            <ContactMap />
          </main>
        </>
    )
}

export default ContactUs;