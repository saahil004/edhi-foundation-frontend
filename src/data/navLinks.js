import servicedd from '../assets/images/servicedd.png'

export const navLinks = [
  {
    label: 'Home', path: '/', dropdown: true,
    columns: [
      [
        { label: 'Our Story', path: '/about#our-story' },
        { label: 'Mission & Vision', path: '/about#mission-values' },
        { label: 'Impact', path: '/about#impact-stats' },
        { label: 'Annual Reports', path: '/about#annual-reports' },
      ],
    ],
    image: servicedd
  },
  { label: 'About Us', path: '/about' },
  {
    label: 'Our Services', path: '/services', dropdown: true,
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
  { label: 'Appeals', path: '/appeals', dropdown: true, columns: [['Sadaqah Program', 'Lillah Program', 'Emergency Services', 'Food Bank Program']] },
  {
    label: 'Media', path: '/media', dropdown: true, columns: [['Gallery', 'Press', 'Videos']],
    image: servicedd,
  },
  { label: 'Get Involved', path: '/get-involved', dropdown: true, columns: [['Volunteer', 'Careers', 'Partnerships']] },
  { label: 'Contact Us', path: '/contact' },
]