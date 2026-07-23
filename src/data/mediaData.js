import bannerImage from '../assets/images/hero.png'
import ramadanImage from '../assets/images/ramadan.png'
import eidImage from '../assets/images/collage1.jpg'
import muharramImage from '../assets/images/edhi-march.png'
import winterImage from '../assets/images/edhi-relief-worker.png'
import marriageImage from '../assets/images/collage2.jpg'
import hospitalImage from '../assets/images/hospital-donation.png'

export const mediaBannerData = {
  title: 'Our Media Gallery',
  subtitle:
    'A visual record of the drives, relief efforts, and moments that define our work across the year.',
  image: bannerImage,
}

export const ramadanSection = {
  id: 'ramadan',
  title: 'Ramadan Drive',
  description:
    'Every Ramadan, our teams work through the month to deliver ration packages and hot iftar meals to thousands of families across the country. Each package is assembled to last a household several weeks, containing flour, rice, lentils, cooking oil, dates, and other essentials. Volunteers coordinate with local community leaders to identify the families most in need, including widows, daily-wage workers, and households supporting elderly or disabled members. Alongside home deliveries, our centres run open iftar tables where anyone can sit and eat with dignity, no questions asked.',
  image: ramadanImage,
  accent: '#0f766e',
  reverse: false,
  gallery: [ramadanImage, eidImage, winterImage, hospitalImage, muharramImage, marriageImage], // TODO: replace with real Ramadan-specific photos
}

export const eidSection = {
  id: 'eid',
  title: 'Eid Celebrations',
  description:
    'Eid should feel like Eid for every child, regardless of what their family can afford. Our Eid drive distributes new clothes, shoes, and sweets to orphanages, shelters, and low-income households in the days leading up to the festival. Volunteers organise shared meals, small gift hampers, and celebration events at our homes and care centres so that residents spend the day surrounded by company rather than alone. For many of the children we serve, this is the only new outfit they will receive all year, and the difference it makes to their morning is impossible to overstate.',
  image: eidImage,
  accent: '#b45309',
  reverse: true,
  gallery: [eidImage, marriageImage, ramadanImage, winterImage, hospitalImage], // TODO: replace with real Eid-specific photos
}

export const muharramSection = {
  id: 'muharram',
  title: 'Muharram Relief',
  description:
    'Muharram brings large gatherings to cities across the country, and our teams mobilise well in advance to support them safely. We set up sabeels offering water and refreshments along procession routes, run free medical camps staffed by doctors and paramedics, and station ambulances at key points to respond to emergencies within minutes. Our volunteers assist with crowd management, first aid, and lost-and-found services for children separated from their families. The work runs day and night through the first ten days, coordinated closely with local administrations and organisers.',
  image: muharramImage,
  accent: '#374151',
  reverse: false,
  gallery: [muharramImage, hospitalImage, winterImage, ramadanImage, eidImage], // TODO: replace with real Muharram-specific photos
}

export const winterSection = {
  id: 'winter',
  title: 'Winter Drive',
  description:
    'Winter in the northern belt and the interior is dangerous for anyone without shelter or heating. Each year our winter drive distributes blankets, quilts, sweaters, jackets, socks, and gas heaters to families in the coldest regions, prioritising mountain villages cut off by snowfall and settlements on the edges of major cities. Street outreach teams work through the night distributing blankets and hot drinks to people sleeping rough. We also supply warm bedding to our own shelters and care homes, which see their highest occupancy during these months.',
  image: winterImage,
  accent: '#1d4ed8',
  reverse: true,
  gallery: [winterImage, muharramImage, ramadanImage, marriageImage, hospitalImage, eidImage], // TODO: replace with real Winter-specific photos
}

export const marriageSection = {
  id: 'marriage',
  title: 'Mass Marriage Program',
  description:
    'For many families, the cost of a wedding is a burden that takes years to recover from, and for some it delays marriage indefinitely. Our mass marriage program hosts dignified collective ceremonies where couples are married without their families taking on debt. Each couple receives essential household items to begin their life together, including bedding, kitchenware, and basic furniture, along with a proper ceremony, a shared meal for guests, and photographs to remember the day. The program is open to families across communities, with arrangements made in consultation with the couples and their relatives.',
  image: marriageImage,
  accent: '#be185d',
  reverse: false,
  gallery: [marriageImage, eidImage, hospitalImage, ramadanImage, winterImage], // TODO: replace with real Marriage-specific photos
}

export const hospitalSection = {
  id: 'hospital',
  title: 'Edhi Hospitals',
  description:
    'Our network of hospitals, clinics, and free dispensaries provides care to patients who would otherwise go without it. Services include emergency and trauma treatment, maternity and neonatal care, diagnostics, minor surgery, and free medicine dispensed on site. Facilities operate around the clock and are supported by our ambulance fleet, which brings patients in from accidents, remote areas, and homes across the city. Care is provided regardless of a patient\'s ability to pay, and our staff work to ensure that no one is turned away at the door for want of a fee.',
  image: hospitalImage,
  accent: '#047857',
  reverse: true,
  gallery: [hospitalImage, muharramImage, eidImage, marriageImage, ramadanImage, winterImage], // TODO: replace with real Hospital-specific photos
}

// kept for backward compatibility if anything else still imports the array form
export const mediaSections = [
  ramadanSection,
  eidSection,
  muharramSection,
  winterSection,
  marriageSection,
  hospitalSection,
]

export const galleryImages = [
  { src: ramadanImage, caption: 'Ramadan Drive' },
  { src: eidImage, caption: 'Eid Celebrations' },
  { src: muharramImage, caption: 'Muharram Relief' },
  { src: winterImage, caption: 'Winter Drive' },
  { src: marriageImage, caption: 'Mass Marriage Program' },
  { src: hospitalImage, caption: 'Edhi Hospitals' },
]