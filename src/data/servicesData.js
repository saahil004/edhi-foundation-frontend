import service1 from '../assets/images/service1.png'
import service2 from '../assets/images/service2.png'
import service3 from '../assets/images/service3.png'
import service4 from '../assets/images/service4.png'
import service5 from '../assets/images/service5.jpeg'
import service6 from '../assets/images/service6.jpeg'
import service7 from '../assets/images/service7.jpeg'
import service8 from '../assets/images/service8.jpeg'
import service9 from '../assets/images/service9.jpeg'
import service10 from '../assets/images/service10.jpeg'
import service11 from '../assets/images/service11.jpeg'
import service12 from '../assets/images/service12.jpeg'
import service13 from '../assets/images/service13.jpeg'
import service14 from '../assets/images/service14.jpeg'
import service15 from '../assets/images/service15.jpeg'
import service16 from '../assets/images/service16.jpeg'
import service17 from '../assets/images/service17.jpeg'
import service18 from '../assets/images/service18.jpeg'
import service19 from '../assets/images/service19.jpeg'
import service20 from '../assets/images/service20.jpeg'
import service21 from '../assets/images/service21.jpeg'
import service22 from '../assets/images/service22.jpeg'


import {
  Building2,
  Baby,
  Home,
  BookOpen,
  Ambulance,
  Cross,
  Wrench,
  Search,
  Wheat,
  CookingPot,
  Croissant,
  UtensilsCrossed,
  Users,
  Tent,
  Syringe,
  HeartHandshake,
  Gem,
  Building,
  Landmark,
  Stethoscope,
  Car,
  PawPrint,
} from 'lucide-react'

export const iconMap = {
  hospital: Building2,
  child: Baby,
  home: Home,
  book: BookOpen,
  ambulance: Ambulance,
  grave: Cross,
  wrench: Wrench,
  search: Search,
  bread: Wheat,
  kitchen: CookingPot,
  bakery: Croissant,
  food: UtensilsCrossed,
  qurbani: Users,
  refugee: Tent,
  virus: Syringe,
  volunteer: HeartHandshake,
  ring: Gem,
  morgue: Building,
  center: Landmark,
  rehab: Stethoscope,
  rickshaw: Car,
  paw: PawPrint,
}

const rawServices = [
  {
    id: 1,
    slug: 'hospital',
    title: 'Hospital',
    desc: 'Providing free, quality healthcare services 24/7 to all, regardless of religion, race or background.',
    image: service1,
    icon: 'hospital',
    raised: 85000,
    goal: 100000,
  },
  {
    id: 2,
    slug: 'children-services',
    title: 'Children Services',
    desc: 'Supporting children in need with care, education, shelter and medical assistance for a better future.',
    image: service2,
    icon: 'child',
    raised: 80000,
    goal: 100000,
  },
  {
    id: 3,
    slug: 'edhi-homes-orphanage',
    title: 'Edhi Homes Orphanage',
    desc: 'Providing a safe, loving and nurturing environment for orphans and abandoned children.',
    image: service3,
    icon: 'home',
    raised: 90000,
    goal: 100000,
  },
  {
    id: 4,
    slug: 'educational-services',
    title: 'Educational Services',
    desc: 'Empowering minds through free education and skills training to build a brighter, self-reliant society.',
    image: service4,
    icon: 'book',
    raised: 75000,
    goal: 100000,
  },
  {
    id: 5,
    slug: 'ambulance',
    title: 'Ambulance',
    desc: "Operating the world's largest volunteer ambulance network, providing free emergency transport nationwide.",
    image: service5,
    icon: 'ambulance',
    raised: 60000,
    goal: 100000,
  },
  {
    id: 6,
    slug: 'graveyard',
    title: 'Graveyard',
    desc: 'Ensuring a dignified burial for the unclaimed and underprivileged, free of cost.',
    image: service6,
    icon: 'grave',
    raised: 40000,
    goal: 100000,
  },
  {
    id: 7,
    slug: 'workshop',
    title: 'Workshop',
    desc: 'Maintaining and repairing ambulances and equipment to keep our emergency services running.',
    image: service7,
    icon: 'wrench',
    raised: 30000,
    goal: 100000,
  },
  {
    id: 8,
    slug: 'missing-person',
    title: 'Missing Person',
    desc: 'Helping reunite missing persons with their families through search and identification services.',
    image: service8,
    icon: 'search',
    raised: 25000,
    goal: 100000,
  },
  {
    id: 9,
    slug: 'rooti-plant',
    title: 'Rooti Plant',
    desc: 'Baking and distributing free bread daily to feed the hungry and underprivileged.',
    image: service9,
    icon: 'bread',
    raised: 45000,
    goal: 100000,
  },
  {
    id: 10,
    slug: 'kitchen',
    title: 'Kitchen',
    desc: 'Preparing free meals daily to support families and individuals facing food insecurity.',
    image: service10,
    icon: 'kitchen',
    raised: 50000,
    goal: 100000,
  },
  {
    id: 11,
    slug: 'in-house-bakery',
    title: 'In House Bakery',
    desc: 'Producing fresh baked goods in-house to sustain our free food distribution programs.',
    image: service11,
    icon: 'bakery',
    raised: 35000,
    goal: 100000,
  },
  {
    id: 12,
    slug: 'langer-service',
    title: 'Langer Service (Free Kitchen)',
    desc: 'Serving free community meals to anyone in need, no questions asked.',
    image: service12,
    icon: 'food',
    raised: 55000,
    goal: 100000,
  },
  {
    id: 13,
    slug: 'online-qurbani-service',
    title: 'Online Qurbani Service',
    desc: 'Facilitating Qurbani on behalf of donors and distributing meat to the needy.',
    image: service13,
    icon: 'qurbani',
    raised: 70000,
    goal: 100000,
  },
  {
    id: 14,
    slug: 'refugees-assistance',
    title: 'Refugees Assistance',
    desc: 'Providing shelter, food and essential aid to refugees seeking safety and support.',
    image: service14,
    icon: 'refugee',
    raised: 42000,
    goal: 100000,
  },
  {
    id: 15,
    slug: 'covid-19-assistance',
    title: 'Covid 19 Assistance',
    desc: 'Delivering medical aid, PPE and relief support to communities affected by the pandemic.',
    image: service15,
    icon: 'virus',
    raised: 38000,
    goal: 100000,
  },
  {
    id: 16,
    slug: 'honorary-voluntary',
    title: 'Honorary & Voluntary',
    desc: 'Mobilizing dedicated volunteers who donate their time and skills to serve humanity.',
    image: service16,
    icon: 'volunteer',
    raised: 20000,
    goal: 100000,
  },
  {
    id: 17,
    slug: 'marriage-bureau',
    title: 'Marriage Bureau',
    desc: 'Assisting individuals and families in arranging simple, dignified marriages.',
    image: service17,
    icon: 'ring',
    raised: 15000,
    goal: 100000,
  },
  {
    id: 18,
    slug: 'edhi-morgue',
    title: 'Edhi Morgue',
    desc: 'Providing mortuary services and identification support for unclaimed bodies.',
    image: service18,
    icon: 'morgue',
    raised: 18000,
    goal: 100000,
  },
  {
    id: 19,
    slug: 'welfare-centers',
    title: 'Welfare Centers',
    desc: 'Running community centers offering shelter, support and resources for those in need.',
    image: service19,
    icon: 'center',
    raised: 48000,
    goal: 100000,
  },
  {
    id: 20,
    slug: 'rehabilitation-center',
    title: 'Rehabilitation Center',
    desc: 'Offering care and rehabilitation for individuals recovering from addiction or mental illness.',
    image: service20,
    icon: 'rehab',
    raised: 33000,
    goal: 100000,
  },
  {
    id: 21,
    slug: 'edhi-rikshaw-rozgar-scheme',
    title: 'Edhi Rikshaw Rozgar Scheme',
    desc: 'Providing rickshaws to underprivileged individuals to help them earn a sustainable livelihood.',
    image: service21,
    icon: 'rickshaw',
    raised: 27000,
    goal: 100000,
  },
  {
    id: 22,
    slug: 'edhi-animal-hostel',
    title: 'Edhi Animal Hostel',
    desc: 'Sheltering, feeding and caring for stray and injured animals with compassion.',
    image: service22,
    icon: 'paw',
    raised: 22000,
    goal: 100000,
  },
]

// Mirrors the backend: each service has one or more programs, and a program
// either offers fixed price options or a free-form amount (or both). Today
// every service only has a single default program with no fixed tiers yet —
// this shape just makes the donation flow ready for real per-service
// programs/tiers whenever they're defined, without changing behavior now.
export const services = rawServices.map((service) => ({
  ...service,
  programs: [
    {
      id: service.id,
      name: `${service.title} Fund`,
      allowOptionalPrice: true,
      priceOptions: [],
    },
  ],
}))