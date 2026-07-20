import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const DropdownMenu = ({ columns, image, label, path }) => {
  const dropdownImage = image
  const totalTracks = columns.length + (dropdownImage ? 1 : 0)
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useLayoutEffect(() => {
    if (!ref.current) return
    const margin = 16
    const rect = ref.current.getBoundingClientRect()

    const naturalLeft = rect.left - offset
    const naturalRight = rect.right - offset

    let next = 0
    if (naturalRight > window.innerWidth - margin) {
      next = window.innerWidth - margin - naturalRight
    } else if (naturalLeft < margin) {
      next = margin - naturalLeft
    }
    setOffset(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, image])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0, x: offset }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full left-0 w-max max-w-[90vw] bg-white shadow-lg border-t border-gray-100 z-40"
    >
      <div
        className="px-6 py-4 grid grid-cols-1 gap-6"
        style={{ gridTemplateColumns: `repeat(${totalTracks}, minmax(140px, auto))` }}
      >
        {columns.map((col, i) => (
          <ul key={i} className="space-y-1.5">
            {col.map((item) => {
              const itemLabel = typeof item === 'string' ? item : item.label
              const slug = typeof item === 'string' ? null : item.slug
              const itemPath = typeof item === 'string' ? null : item.path
              const linkTo = slug ? `/services/${slug}` : itemPath

              return (
                <li key={itemLabel} className="border-b border-gray-200 pb-1">
                  {linkTo ? (
                    <Link
                      to={linkTo}
                      className="text-gray-700 hover:text-red-600 transition-colors text-sm"
                    >
                      {itemLabel}
                    </Link>
                  ) : (
                    <a href="#" className="text-gray-700 hover:text-red-600 transition-colors text-sm">
                      {itemLabel}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        ))}

        {dropdownImage && (
          <div className="flex flex-col items-center gap-2">
            <img src={dropdownImage} alt="" className="rounded-2xl w-full h-40 object-cover border" />
            <Link
              to={path}
              className="bg-green-800 hover:bg-green-900 text-white font-semibold px-5 py-1.5 rounded-md transition-colors text-sm text-center"
            >
              See All {label}
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default DropdownMenu