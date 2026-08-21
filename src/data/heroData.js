import heroFallback from '../assets/images/hero-optimized.jpg'

export const hero = {
  headingLine1: 'A Little Kindness',
  headingLine2: 'Today, A Better',
  headingHighlight: 'Tomorrow.',
  subtext: 'Your support can bring hope, restore dignity and change lives.',
  image: heroFallback,
  // Served from public/ (not imported) so it has a stable URL that
  // index.html's <link rel="preload"> can reference at build time.
  imageWebp: '/hero.webp',
}