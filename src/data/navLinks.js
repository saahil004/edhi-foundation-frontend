import servicedd from '../assets/images/servicedd.png'

export const navLinks = [
  {
    label: 'Home', path: '/', dropdown: false
  },
  { label: 'About Us', path: '/about', dropdown: true,
    columns: [
      [
        { label: 'Our Story', path: '/about#our-story' },
        { label: 'Mission & Vision', path: '/about#mission-values' },
        { label: 'Impact', path: '/about#impact-stats' },
        { label: 'Annual Reports', path: '/about#annual-reports' },
      ],
    ],
    image: servicedd,
   },
  {
    label: 'Our Services', path: '/services', dropdown: true, basePath: '/services',
    columns: [
      [
        { label: 'Hospital', slug: 'hospital' },
        { label: 'Children Services', slug: 'children-services' },
        { label: 'Edhi Homes Orphanage', slug: 'edhi-homes-orphanage' },
        { label: 'Educational Services', slug: 'educational-services' },
        { label: 'Ambulance', slug: 'ambulance' },
        { label: 'Graveyard', slug: 'graveyard' },
        { label: 'Workshop', slug: 'workshop' },
        { label: 'Missing Person', slug: 'missing-person' },
        { label: 'Rooti Plant', slug: 'rooti-plant' },
        { label: 'Kitchen', slug: 'kitchen' },
        { label: 'In House Bakery', slug: 'in-house-bakery' },
        { label: 'Langer Service (Free Kitchen)', slug: 'langer-service' },
      ],
      [
        { label: 'Online Qurbani Service', slug: 'online-qurbani-service' },
        { label: 'Refugees Assistance', slug: 'refugees-assistance' },
        { label: 'Covid 19 Assistance', slug: 'covid-19-assistance' },
        { label: 'Honorary & Voulantry', slug: 'honorary-voluntary' },
        { label: 'Marriage Bureau', slug: 'marriage-bureau' },
        { label: 'Edhi Mourge', slug: 'edhi-morgue' },
        { label: 'Welfare Centers', slug: 'welfare-centers' },
        { label: 'Rehabilitation Center', slug: 'rehabilitation-center' },
        { label: 'Edhi Rikshaw Rozgar Scheme', slug: 'edhi-rikshaw-rozgar-scheme' },
        { label: 'Edhi Animal Hostel', slug: 'edhi-animal-hostel' },
      ],
    ],
    image: servicedd,
  },
  {
    label: 'Appeals', path: '/appeals', dropdown: true, basePath: '/appeals',
    columns: [
      [
        { label: 'Bilqees Edhi Hospital', slug: 'bilqees-edhi-hospital' },
        { label: 'Sadaqah Program', slug: 'sadaqah' },
        { label: 'Zakat Program', slug: 'zakat' },
        { label: 'Aqeeqa Program', slug: 'aqeeqa' },
        { label: 'Food Bank Program', slug: 'food-bank' },
        { label: 'Lillah Program', slug: 'lillah' },
        { label: 'Emergency Services Program', slug: 'emergency-services' },
      ],
    ],
    image: servicedd,
  },
  {
    label: 'Media', path: '/media'
  },
  { label: 'Get Involved', path: '/get-involved'},
  { label: 'Contact Us', path: '/contact' },
]