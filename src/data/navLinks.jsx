export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  {
    label: 'Our Services', path: '/services', dropdown: true,
    columns: [
      ['Ambulance', 'Hospital', 'Children', 'Educational', 'Graveyard', 'Workshop', 'Missing Person', 'Rooti Plant', 'Kitchen', 'In House Bakery', 'Langer Service (Free Kitchen)'],
      ['Online Qurbani Service', 'Refugees Assistance', 'Covid 19 Assistance', 'Honorary & Voulantry', 'Marriage Bureau', 'Edhi Mourge', 'Welfare Centers', 'Rehabilitation Center', 'Edhi Rikshaw Rozgar Scheme', 'Edhi Animal Hostel'],
    ],
    image: '/src/assets/images/hero-children.png',
  },
  { label: 'Appeals', path: '/appeals', dropdown: true, columns: [['Sadaqah Program', 'Lillah Program', 'Emergency Services', 'Food Bank Program']] },
  { label: 'Media', path: '/media', dropdown: true, columns: [['Gallery', 'Press', 'Videos']] },
  { label: 'Get Involved', path: '/get-involved', dropdown: true, columns: [['Volunteer', 'Careers', 'Partnerships']] },
  { label: 'Contact Us', path: '/contact' },
]