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

export const mediaSections = [
  {
    id: 'ramadan',
    title: 'Ramadan Drive',
    description:
      'Every Ramadan, we deliver food packages and iftar meals to thousands of families across the country, ensuring no household goes without during the holy month.',
    image: ramadanImage,
    accent: '#0f766e',
    reverse: false,
  },
  {
    id: 'eid',
    title: 'Eid Celebrations',
    description:
      'From new clothes to shared meals, our Eid drive brings joy to orphanages, shelters, and low-income families during the celebration.',
    image: eidImage,
    accent: '#b45309',
    reverse: true,
  },
  {
    id: 'muharram',
    title: 'Muharram Relief',
    description:
      'During Muharram, our teams organize sabeels, medical camps, and security support at majalis and processions across major cities.',
    image: muharramImage,
    accent: '#374151',
    reverse: false,
  },
  {
    id: 'winter',
    title: 'Winter Drive',
    description:
      'Blankets, warm clothing, and heaters are distributed to vulnerable communities in the coldest regions of the country each winter.',
    image: winterImage,
    accent: '#1d4ed8',
    reverse: true,
  },
  {
    id: 'marriage',
    title: 'Mass Marriage Program',
    description:
      'We facilitate dignified mass wedding ceremonies for couples who cannot otherwise afford one, easing a significant financial burden for families.',
    image: marriageImage,
    accent: '#be185d',
    reverse: false,
  },
  {
    id: 'hospital',
    title: 'Edhi Hospitals',
    description:
      'Our network of hospitals and free dispensaries provides emergency care, maternity services, and free medicine to underserved communities.',
    image: hospitalImage,
    accent: '#047857',
    reverse: true,
  },
]

export const galleryImages = [
  { src: ramadanImage, caption: 'Ramadan Drive' },
  { src: eidImage, caption: 'Eid Celebrations' },
  { src: muharramImage, caption: 'Muharram Relief' },
  { src: winterImage, caption: 'Winter Drive' },
  { src: marriageImage, caption: 'Mass Marriage Program' },
  { src: hospitalImage, caption: 'Edhi Hospitals' },
]
