import benefitImage from '../assets/images/benefit-planting.jpg'
import benefitAvatar1 from '../assets/images/avatar1.jpg'
import benefitCollage1 from '../assets/images/collage1.jpg'
import benefitCollage2 from '../assets/images/collage2.jpg'

const benefits = {
  eyebrow: 'Our Benefits',
  heading: 'Thoughtful Actions with Measurable Impact',
  description: 'We plan and execute every initiative with care, clarity, and accountability. By setting clear goals and tracking outcomes, we ensure our actions deliver real change.',
  buttonLabel: 'Contact Us',
  buttonLink: '/contact',
  stat: {
    value: 12000,
    suffix: '+',
    label: 'Lives Impacted',
    description: 'Providing education, healthcare, and support programs that have positively affected communities.',
  },
  image: benefitImage,
  impactCard: {
    collageImages: [benefitCollage1, benefitCollage2],
    title: 'Real Community Impact',
    description: 'Every program we run is designed to address genuine community needs.',
    points: [
      'Ensuring that every initiative delivers',
      'We track outcomes & monitor progress',
    ],
  },
  closingText: "Let's make something great work together.",
  closingLinkLabel: 'Get in Touch',
  closingLinkPath: '/contact',
  closingAvatar: benefitAvatar1,
}

export default benefits