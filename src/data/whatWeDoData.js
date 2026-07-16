import volunteersImg from '../assets/images/edhi-volunteers.png'
import marchImg from '../assets/images/edhi-march.png'
import ambulanceTeamImg from '../assets/images/edhi-ambulance-team.png'
import reliefWorkerImg from '../assets/images/edhi-relief-worker.png'

export const whatWeDoStats = {
  volunteers: {
    count: '3,500+',
    label: 'Active Volunteers',
    avatars: [
      // add avatar image paths later, or pull from a team/testimonials data file
    ],
  },
  projects: {
    count: '250+',
    label: 'Projects Completed',
  },
}

export const whatWeDoImages = {
  volunteers: volunteersImg,
  march: marchImg,
  ambulanceTeam: ambulanceTeamImg,
  reliefWorker: reliefWorkerImg,
}

export const whatWeDoTabs = [
  { id: 1, label: 'Relief Work' },
  { id: 2, label: 'Healthcare' },
  { id: 3, label: 'Community Support' },
]

export const whatWeDoContent = {
  badge: 'What We Do',
  heading: 'Focused Actions That Deliver Impact',
  description:
    'Through decades of dedicated service, we deliver free healthcare, emergency response, shelter, and food to those who need it most — one initiative at a time.',
  feature: {
    title: 'Empowering Communities',
    description:
      'We design and run programs that address real community needs — from free ambulance services and hospitals to orphan care and disaster relief.',
  },
}