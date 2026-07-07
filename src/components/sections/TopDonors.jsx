import { Heart, ArrowRight } from 'lucide-react'
import topDonors, { totalDonorsCount } from '../../data/topDonorsData'
import donationImpactImage from '../../assets/images/topdonors.PNG'

const TopDonors = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-lg">
          {/* Left: donor list on green background */}
          <div className="bg-green-800 text-white p-8 md:p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Heart size={24} />
                <h3 className="text-xl font-bold">Top Donors</h3>
              </div>
              <a href="#" className="flex items-center gap-1 text-sm font-medium hover:underline">
                View all <ArrowRight size={14} />
              </a>
            </div>

            <ul>
              {topDonors.map((donor, index) => (
                <li
                  key={donor.id}
                  className={`flex items-center justify-between py-4 ${
                    index < topDonors.length - 1 ? 'border-b border-white/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-7 h-7 rounded-full bg-white text-green-800 font-bold text-sm flex items-center justify-center shrink-0">
                      {donor.id}
                    </span>
                    <span className="font-medium">{donor.name}</span>
                  </div>
                  <span className="font-bold">${donor.amount.toLocaleString()}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="text-4xl font-extrabold">{totalDonorsCount.toLocaleString()}+</p>
              <p className="text-sm font-semibold tracking-wide uppercase text-green-100 mt-1">
                Amazing Donors
              </p>
            </div>
          </div>

          {/* Right: image + heading */}
          <div className="relative min-h-[320px] md:min-h-full">
            <img
              src={donationImpactImage}
              alt="A simple donation, a lasting impact"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            <div className="absolute top-8 left-8 md:top-10 md:left-10">
              {/* <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                A Simple <span className="text-red-600">Donation</span><br />
                A Lasting Impact.
              </h2> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopDonors