import { Eye, HeartHandshake, Coins } from 'lucide-react'
import impactImg1 from '../assets/images/why-choose-1.jpg'
import impactImg2 from '../assets/images/why-choose-2.jpg'

export const whyChooseUsContent = {
  badge: 'Why Choose Us',
  heading: 'What Makes our Impact Strong',
  description:
    'We approach every initiative with compassion, operate with full transparency, and focus on creating sustainable impact that improves lives.',
  points: [
    {
      id: 1,
      icon: Eye,
      text: 'We operate with complete openness, clearly communicating',
    },
    {
      id: 2,
      icon: HeartHandshake,
      text: 'Ensuring every program is guided by empathy, dignity, & community',
    },
    {
      id: 3,
      icon: Coins,
      text: 'Our initiative focus on long-term solution that empower community',
    },
  ],
  images: {
    main: impactImg1,
    overlap: impactImg2,
  },
  callUs: {
    label: 'Call Us',
    number: '+92 (21) 32413232',
  },
}