import servicedd from '../assets/images/servicedd.png'

export const navLinks = [
  {
    label: 'Home', path: '/', dropdown: true,
    columns: [
      ['Our Story', 'Mission & Vision', 'Impact', 'Annual Reports'],
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
        { label: 'Ambulance', slug: null },
        { label: 'Graveyard', slug: null },
        { label: 'Workshop', slug: null },
        { label: 'Missing Person', slug: null },
        { label: 'Rooti Plant', slug: null },
        { label: 'Kitchen', slug: null },
        { label: 'In House Bakery', slug: null },
        { label: 'Langer Service (Free Kitchen)', slug: null },
      ],
      [
        { label: 'Online Qurbani Service', slug: null },
        { label: 'Refugees Assistance', slug: null },
        { label: 'Covid 19 Assistance', slug: null },
        { label: 'Honorary & Voulantry', slug: null },
        { label: 'Marriage Bureau', slug: null },
        { label: 'Edhi Mourge', slug: null },
        { label: 'Welfare Centers', slug: null },
        { label: 'Rehabilitation Center', slug: null },
        { label: 'Edhi Rikshaw Rozgar Scheme', slug: null },
        { label: 'Edhi Animal Hostel', slug: null },
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