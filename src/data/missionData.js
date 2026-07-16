import { Globe2, Compass, HeartHandshake } from 'lucide-react'
import missionBg1 from '../assets/images/mission-bg-1.png'
import missionBg2 from '../assets/images/mission-bg-2.png'
import missionBg3 from '../assets/images/mission-bg-3.png'

export const missionData = [
  {
    id: 1,
    title: 'Our Mission',
    description: 'Our mission is to improve the quality of life in underserved communities by delivering accessible healthcare, food, and shelter to all in need.',
    point: 'To empower communities by addressing real social challenges.',
    icon: Globe2,
    image: missionBg1,
  },
  {
    id: 2,
    title: 'Our Vision',
    description: 'A world where every community has equal opportunities, dignity, and the power to build a better future together.',
    point: 'A world where empowered communities thrive with opportunity.',
    icon: Compass,
    image: missionBg2,
  },
  {
    id: 3,
    title: 'Our Values',
    description: 'We work with honesty, transparency, and accountability, building trust with the communities we serve and our partners.',
    point: 'Guiding every action we take to create meaningful & lasting social impact.',
    icon: HeartHandshake,
    image: missionBg3,
  },
]