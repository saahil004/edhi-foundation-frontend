import { motion } from 'framer-motion'
import { DollarSign, Check, ArrowUpRight, Play } from 'lucide-react'
import ourStory from '../../data/ourStoryData.js'

const OurStory = () => {
  const {
    eyebrow, heading, headingHighlight, description,
    yearsExperience, mainImage, secondaryImage,
    calloutTitle, calloutText, calloutImage,
  } = ourStory

  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left: layered circular images */}
        <motion.div
          className="relative h-[420px] md:h-[520px]"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="absolute -top-2 left-0 w-3 h-3 rounded-full bg-green-800" />

          <div className="absolute top-8 left-0 w-[70%] h-[70%] rounded-full overflow-hidden shadow-lg">
            <img src={mainImage} alt="Edhi Foundation history" className="w-full h-full object-cover" />
          </div>

          <div className="absolute bottom-0 right-0 w-[62%] h-[62%] rounded-full overflow-hidden shadow-lg border-4 border-gray-50">
            <img src={secondaryImage} alt="Edhi Foundation service" className="w-full h-full object-cover" />
          </div>

          <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.5, delay: 0.5, type: 'spring', stiffness: 200 }}
  className="absolute bottom-6 left-[20%] bg-green-800 rounded-2xl px-7 py-5 text-center shadow-xl border-4 border-white"
>
  <p className="text-3xl font-extrabold text-yellow-400 leading-none mb-1">
    {yearsExperience}
  </p>
  <p className="text-xs font-semibold text-white uppercase tracking-wide leading-tight">
    Years Of<br />Service
  </p>
</motion.div>
        </motion.div>

        {/* Right: text content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-900 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-800" /> OUR HISTORY
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-green-950 leading-tight mb-4">
            Our Story
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            The Abdul Sattar Edhi Foundation was founded in 1951 with a single ambulance and an unwavering belief that no human being should suffer without help. What began as a small dispensary in Karachi has grown into one of the largest volunteer-run welfare organizations in the world.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            For over seven decades, the Foundation has provided emergency medical care, shelter for the homeless and orphaned, rehabilitation for the mentally ill, and dignity in death for the unclaimed — regardless of religion, race, or background.
          </p>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Today, that mission continues under the same principle Abdul Sattar Edhi lived by: service to humanity is service to God.
          </p>

          <div className="border-t border-gray-200 pt-6 flex items-center gap-6">
  <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-800">
            Contact Us
            <ArrowUpRight className="h-4 w-4" />
          </button>
</div>
        </motion.div>
      </div>
    </section>
  )
}

export default OurStory