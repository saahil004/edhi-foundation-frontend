import { HandHeart, HeartPulse, GraduationCap, Sprout } from 'lucide-react'
import cause1 from '../assets/images/women.JPG'
import cause2 from '../assets/images/healthcare.JPG'
import cause3 from '../assets/images/education.JPG'
import cause4 from '../assets/images/cause4.png'

export const causesData = [
  {
    id: 1,
    title: 'Women Empowerment',
    description: 'Gender equality and independence by supporting women leadership.',
    icon: HandHeart,
    image: cause1,
  },
  {
    id: 2,
    title: 'Healthcare & Wellbeing',
    description: 'Improving community health through medical outreach and wellness.',
    icon: HeartPulse,
    image: cause2,
  },
  {
    id: 3,
    title: 'Education for All',
    description: 'Providing access to quality education for children & adults in underserved communities.',
    icon: GraduationCap,
    image: cause3,
  },
  {
    id: 4,
    title: 'Environmental Protection',
    description: 'Supporting environmental sustainability through tree plantations.',
    icon: Sprout,
    image: cause4,
  },
]