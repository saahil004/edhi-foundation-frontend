import MediaBanner from '../components/sections/MediaBanner.jsx'
import MediaHighlights from '../components/sections/MediaHighlights.jsx'
import MediaGallery from '../components/sections/MediaGallery.jsx'
import InfiniteMarquee from '../components/ui/InfiniteMarquee.jsx'
import EventGallery from '../components/sections/EventGallery.jsx'
import MobileEventCarousel from '../components/sections/MobileEventGallery.jsx'
import MobileEventGallery from '../components/sections/MobileEventGallery.jsx'

const Media = () => {

  const marqueeItems = [
  'Moments of Hope',
  'Stories from the Field',
  'Faces We Serve',
  'Every Photo Tells a Story',
  'Documenting Our Mission',
  'Compassion in Action',
  'Real People, Real Impact',
  'Witness Our Work',
]

  return (
    <main>
      <MediaBanner />
      <div className="overflow-hidden">
        <InfiniteMarquee />
      </div>
      <MediaHighlights />
      <MobileEventGallery/>
      <EventGallery />
    </main>
  )
}

export default Media
