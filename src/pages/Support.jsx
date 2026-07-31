import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SupportBanner from '../components/sections/SupportBanner.jsx'
import SupportQuickNav from '../components/sections/SupportQuickNav.jsx'
import PolicySection from '../components/ui/PolicySection.jsx'
import InfiniteMarquee from '../components/ui/InfiniteMarquee.jsx'
import Seo from '../components/ui/Seo.jsx'
import { supportSections } from '../data/supportData.js'

const marqueeItems = [
  "We're Here to Help",
  'Transparent Policies',
  'Your Questions Answered',
  'Trusted Since 1951',
  'Secure & Confidential',
]

const Support = () => {
  const location = useLocation()
  const [activeId, setActiveId] = useState(supportSections[0].id)
  const [openFaqId, setOpenFaqId] = useState(0)
  const sectionRefs = useRef({})

  // Scroll-spy — on every scroll (including the programmatic smooth-scroll
  // from clicking a sidebar/footer link), pick the last section whose top
  // has already crossed the offset. Driven by one scroll listener rather
  // than IntersectionObserver so it can't race with a manual click.
  useEffect(() => {
    const OFFSET = 160

    const handleScroll = () => {
      let current = supportSections[0].id
      for (const section of supportSections) {
        const el = sectionRefs.current[section.id]
        if (el && el.getBoundingClientRect().top <= OFFSET) {
          current = section.id
        }
      }
      setActiveId(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Deep links from the footer (e.g. /support#privacy) scroll straight to
  // that section on load instead of leaving the reader at the top.
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const el = sectionRefs.current[id]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  const handleNavigate = (id) => {
    const el = sectionRefs.current[id]
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
    setActiveId(id)
  }

  return (
    <main className="min-h-screen bg-white">
      <Seo
        title="Support & Policies"
        description="Help Center, Terms & Conditions, Privacy Policy, Donation Policy, and Disclaimer for the Edhi Foundation website."
      />
      <SupportBanner />

      <div className="overflow-hidden">
        <InfiniteMarquee items={marqueeItems} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-[280px_1fr] gap-10">
        <aside>
          <SupportQuickNav sections={supportSections} activeId={activeId} onNavigate={handleNavigate} />
        </aside>

        <div className="flex flex-col gap-16">
          {supportSections.map((section) => (
            <div key={section.id} ref={(el) => (sectionRefs.current[section.id] = el)}>
              <PolicySection
                section={section}
                openFaqId={section.id === 'help-center' ? openFaqId : null}
                onToggleFaq={(i) => setOpenFaqId((prev) => (prev === i ? null : i))}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Support
