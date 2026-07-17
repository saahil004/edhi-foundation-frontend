import volunteersImg from '../assets/images/edhi-volunteers.png'
import marchImg from '../assets/images/edhi-march.png'
import ambulanceTeamImg from '../assets/images/edhi-ambulance-team.png'
import reliefWorkerImg from '../assets/images/edhi-relief-worker.png'

export const whatWeDoStats = {
  volunteers: {
    value: 3500,
    suffix: '+',
    label: 'Active Volunteers',
    avatars: [
      // add avatar image paths later
    ],
  },
  projects: {
    value: 250,
    suffix: '+',
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