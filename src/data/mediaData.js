import bannerImage from '../assets/images/hero.png'
import ramadanImage from '../assets/images/ramadan.png'
import ramadan1 from '../assets/images/ramadan1.png'
import ramadan2 from '../assets/images/ramadan2.png'
import ramadan3 from '../assets/images/ramadan3.png'
import ramadan4 from '../assets/images/ramadan4.png'
import ramadan5 from '../assets/images/ramadan5.png'
import ramadan6 from '../assets/images/ramadan6.png'
import eidImage from '../assets/images/eid.JPG'
import eid1 from '../assets/images/eid1.JPG'
import eid2 from '../assets/images/eid2.JPG'
import eid3 from '../assets/images/eid3.JPG'
import eid4 from '../assets/images/eid4.JPG'
import eid5 from '../assets/images/eid5.JPG'
import eid6 from '../assets/images/eid6.JPG'
import marriageImage from '../assets/images/marriage.JPG'
import marriage1 from '../assets/images/marriage1.JPG'
import marriage2 from '../assets/images/marriage2.JPG'
import marriage3 from '../assets/images/marriage3.JPG'
import marriage4 from '../assets/images/marriage4.JPG'
import marriage5 from '../assets/images/marriage5.JPG'
import hospitalImage from '../assets/images/hospital.JPG'
import hospital1 from '../assets/images/hospital1.JPG'
import hospital2 from '../assets/images/hospital2.JPG'
import hospital3 from '../assets/images/hospital3.JPG'
import hospital4 from '../assets/images/hospital4.JPG'
import hospital5 from '../assets/images/hospital5.JPG'
import hospital6 from '../assets/images/hospital6.JPG'
import hospital7 from '../assets/images/hospital7.JPG'
import hospital8 from '../assets/images/hospital8.JPG'

// Shared placeholder pool for the sections below, until real photos exist for each — TODO: replace per section
import placeholderEmergency from '../assets/images/emergency.png'
import placeholderAmbulanceTeam from '../assets/images/edhi-ambulance-team.png'
import placeholderSea from '../assets/images/sea.JPG'
import placeholderHealthcare from '../assets/images/healthcare.JPG'
import placeholderVolunteers from '../assets/images/edhi-volunteers.png'
import placeholderReliefWorker from '../assets/images/edhi-relief-worker.png'
import placeholderMarch from '../assets/images/edhi-march.png'
import placeholderCollage from '../assets/images/collage1.jpg'

export const mediaBannerData = {
  heading: 'Our Media Gallery',
  subtext:
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
  gallery: [ramadanImage, ramadan1, ramadan2, ramadan3, ramadan4, ramadan5, ramadan6], // TODO: replace with real Ramadan-specific photos
}

export const eidSection = {
  id: 'eid',
  title: 'Eid Celebrations',
  description:
    'Eid should feel like Eid for every child, regardless of what their family can afford. Our Eid drive distributes new clothes, shoes, and sweets to orphanages, shelters, and low-income households in the days leading up to the festival. Volunteers organise shared meals, small gift hampers, and celebration events at our homes and care centres so that residents spend the day surrounded by company rather than alone. For many of the children we serve, this is the only new outfit they will receive all year, and the difference it makes to their morning is impossible to overstate.',
  image: eidImage,
  accent: '#b45309',
  reverse: true,
  gallery: [eidImage, eid1, eid2, eid3, eid4, eid5, eid6], // TODO: replace with real Eid-specific photos
}

// The five sections below use a shared pool of placeholder images (none of
// these events have dedicated photos yet) — TODO: replace each `image` and
// `gallery` with real photos specific to that section once available.
const placeholderGallery = [
  placeholderEmergency,
  placeholderAmbulanceTeam,
  placeholderSea,
  placeholderHealthcare,
  placeholderVolunteers,
  placeholderReliefWorker,
  placeholderMarch,
  placeholderCollage,
]

export const airAmbulanceSection = {
  id: 'air-ambulance',
  title: 'Air Ambulance',
  description:
    'For emergencies in remote or hard-to-reach areas, road ambulances aren\'t always fast enough. Our air ambulance service uses helicopter transport to move critically ill or injured patients to the nearest equipped hospital within the golden hour, coordinating with local authorities and hospital staff along the way. The service is reserved for genuine life-threatening emergencies — trauma, complicated births, and patients stranded by floods or landslides — where minutes decide the outcome. A paramedic or doctor stabilises the patient throughout the flight, and like the rest of our ambulance fleet, it remains free at the point of use.',
  image: placeholderEmergency,
  accent: '#0ea5e9',
  reverse: false,
  gallery: placeholderGallery, // TODO: replace with real Air Ambulance-specific photos
}

export const animalShelterSection = {
  id: 'animal-shelter',
  title: 'Animal Shelter',
  description:
    'Compassion at the Edhi Foundation has never been limited to people. Our animal shelters take in injured, sick, and abandoned animals found on the street — dogs, cats, and livestock — providing food, veterinary care, and a safe place to recover. Volunteers and a small team of vets treat everything from road accidents to malnutrition, and animals that recover are either returned to a safe environment or kept in long-term care if they can no longer fend for themselves. The shelters run on the same principle as everything else we do: an injured or hungry creature doesn\'t need to explain itself to receive help.',
  image: placeholderVolunteers,
  accent: '#7c3aed',
  reverse: true,
  gallery: [placeholderVolunteers, ...placeholderGallery.filter((img) => img !== placeholderVolunteers)], // TODO: replace with real Animal Shelter-specific photos
}

export const graveyardSection = {
  id: 'graveyard',
  title: 'Graveyard Services',
  description:
    'Every year, unidentified and unclaimed bodies are brought into our care — victims of accidents, violence, or simple poverty with no family able to arrange a burial. Our teams carry out the ritual bathing and burial rites according to the deceased\'s faith wherever it can be determined, and maintain dedicated graveyards where these individuals are laid to rest with dignity rather than left unmarked. Volunteers keep records of every burial in case a family comes searching later, and the graveyards remain open to families who cannot otherwise afford burial costs for a loved one. No one is turned away for lack of money or a name.',
  image: placeholderReliefWorker,
  accent: '#475569',
  reverse: false,
  gallery: [placeholderReliefWorker, ...placeholderGallery.filter((img) => img !== placeholderReliefWorker)], // TODO: replace with real Graveyard Services-specific photos
}

export const seaRescueSection = {
  id: 'sea-rescue',
  title: 'Sea Rescue',
  description:
    'Along the coastline, our sea rescue teams respond to drowning incidents, capsized boats, and swimmers caught in dangerous currents. Trained divers and lifeguards operate rescue boats stationed at key points on the coast, working closely with fishing communities and local authorities to reach people in trouble as quickly as possible. Beyond emergency response, the teams run water-safety awareness sessions for coastal communities and beachgoers, and recover the bodies of drowning victims when a rescue comes too late so families aren\'t left without answers. The service operates year-round, with activity peaking during the busy summer season.',
  image: placeholderSea,
  accent: '#0e7490',
  reverse: true,
  gallery: [placeholderSea, ...placeholderGallery.filter((img) => img !== placeholderSea)], // TODO: replace with real Sea Rescue-specific photos
}

export const villageServiceSection = {
  id: 'village-service',
  title: 'Village Service',
  description:
    'Our work doesn\'t stop at city limits. Mobile teams carry ambulance coverage, free medical camps, and ration distribution into villages that are otherwise hours from the nearest hospital or relief centre, particularly in areas cut off during floods or heavy snowfall. Local volunteers are trained to run first-response services between visits, and mobile dispensaries hold regular clinic days so chronic conditions don\'t go untreated simply because of distance. The goal is the same one that shaped the very first Edhi ambulance: no family should be beyond reach just because they live far from the city.',
  image: placeholderAmbulanceTeam,
  accent: '#ca8a04',
  reverse: false,
  gallery: [placeholderAmbulanceTeam, ...placeholderGallery.filter((img) => img !== placeholderAmbulanceTeam)], // TODO: replace with real Village Service-specific photos
}

export const marriageSection = {
  id: 'marriage',
  title: 'Mass Marriage Program',
  description:
    'For many families, the cost of a wedding is a burden that takes years to recover from, and for some it delays marriage indefinitely. Our mass marriage program hosts dignified collective ceremonies where couples are married without their families taking on debt. Each couple receives essential household items to begin their life together, including bedding, kitchenware, and basic furniture, along with a proper ceremony, a shared meal for guests, and photographs to remember the day. The program is open to families across communities, with arrangements made in consultation with the couples and their relatives.',
  image: marriageImage,
  accent: '#be185d',
  reverse: false,
  gallery: [marriageImage, marriage1, marriage2, marriage3, marriage4, marriage5], // TODO: replace with real Marriage-specific photos
}

export const hospitalSection = {
  id: 'hospital',
  title: 'Edhi Hospitals',
  description:
    'Our network of hospitals, clinics, and free dispensaries provides care to patients who would otherwise go without it. Services include emergency and trauma treatment, maternity and neonatal care, diagnostics, minor surgery, and free medicine dispensed on site. Facilities operate around the clock and are supported by our ambulance fleet, which brings patients in from accidents, remote areas, and homes across the city. Care is provided regardless of a patient\'s ability to pay, and our staff work to ensure that no one is turned away at the door for want of a fee.',
  image: hospitalImage,
  accent: '#047857',
  reverse: true,
  gallery: [hospitalImage, hospital1, hospital2,hospital3,hospital4,hospital5,hospital6,hospital7,hospital8,], // TODO: replace with real Hospital-specific photos
}

// kept for backward compatibility if anything else still imports the array form
export const mediaSections = [
  ramadanSection,
  eidSection,
  airAmbulanceSection,
  animalShelterSection,
  graveyardSection,
  seaRescueSection,
  villageServiceSection,
  marriageSection,
  hospitalSection,
]

export const galleryImages = [
  { src: ramadanImage, caption: 'Ramadan Drive' },
  { src: eidImage, caption: 'Eid Celebrations' },
  { src: placeholderEmergency, caption: 'Air Ambulance' },
  { src: placeholderVolunteers, caption: 'Animal Shelter' },
  { src: placeholderReliefWorker, caption: 'Graveyard Services' },
  { src: placeholderSea, caption: 'Sea Rescue' },
  { src: placeholderAmbulanceTeam, caption: 'Village Service' },
  { src: marriageImage, caption: 'Mass Marriage Program' },
  { src: hospitalImage, caption: 'Edhi Hospitals' },
]