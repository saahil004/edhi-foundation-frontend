// src/components/sections/MediaBanner.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { mediaBannerData } from "../../data/mediaData.js";

export default function MediaBanner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      bannerRef.current.querySelectorAll(".banner-anim"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative h-[70vh] md:h-[85vh] flex items-center justify-center text-center overflow-hidden"
    >
      <img
        src={mediaBannerData.image}
        alt={mediaBannerData.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 px-6">
        <h1 className="banner-anim text-white text-4xl md:text-6xl font-bold mb-4">
          {mediaBannerData.title}
        </h1>
        <p className="banner-anim text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
          {mediaBannerData.subtitle}
        </p>
      </div>
    </section>
  );
}