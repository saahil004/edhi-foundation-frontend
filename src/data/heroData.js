import heroDesktopFallback from '../assets/images/hero-desktop.jpg'

export const hero = {
  headingLine1: 'A Little Kindness',
  headingLine2: 'Today, A Better',
  headingHighlight: 'Tomorrow.',
  subtext: 'Your support can bring hope, restore dignity and change lives.',
  // Desktop/large screens: the full-bleed banner graphic (photo collage with
  // its own blank left panel for the text overlay). Served from public/ (not
  // imported) so it has a stable URL that index.html's <link rel="preload">
  // can reference at build time.
  desktopImage: heroDesktopFallback,
  desktopImageWebp: '/hero-desktop.webp',
  desktopImageRatio: 1983 / 793,
  // Mobile/tablet gets its own dedicated banner image.
  mobileImageWebp: '/hero-mobile.webp',
}
