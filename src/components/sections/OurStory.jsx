import { motion } from 'framer-motion'
import ourStory from '../../data/ourStoryData.js'

const OurStory = () => {
  const { image, heading, paragraphs } = ourStory

  return (
    <section className="w-full bg-white relative">
      <div className="relative w-full h-[28rem] sm:h-[32rem] md:h-[36rem] lg:h-[42rem] overflow-hidden">

        {/* Background image, full bleed */}
        <motion.img
          src={image}
          alt="Early days of Edhi Foundation"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Gradient overlay: dark on the left where text sits, fading out to the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent md:from-black/80 md:via-black/30 md:to-transparent" />

        {/* Extra bottom gradient for mobile readability when text sits lower */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />

        {/* Text content, positioned over the image */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-end md:items-center">
          <motion.div
            className="max-w-xl pb-10 md:pb-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          >
            <span className="text-red-500 text-sm font-semibold flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500" /> OUR HISTORY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {heading}
            </h2>

            {paragraphs.map((para, i) => (
              <p key={i} className="text-gray-200 mb-4 leading-relaxed text-sm sm:text-base">
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default OurStory