import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalGallery({ products, onImageClick }) {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useGSAP(() => {
    // Robust initialization: wait for React to mount and give DOM a moment to paint
    // Ensure all widths and heights are fully calculated before ScrollTrigger pins the section
    const timer = setTimeout(() => {
      setIsReady(true);

      const sections = gsap.utils.toArray(".gallery-item", scrollWrapperRef.current);

      if (!scrollWrapperRef.current || sections.length === 0) return;

      const totalWidth = scrollWrapperRef.current.scrollWidth;

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrubbing
          snap: 1 / (sections.length - 1),
          // Scroll length equivalent to the horizontal width for natural pacing
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true, // Re-calculates logic on resize events
        }
      });

      // Explicitly refresh ScrollTrigger to assure pinning bounds are pristine
      ScrollTrigger.refresh();

    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="overflow-hidden bg-stone-300 relative h-screen flex flex-col justify-center z-10">
      <div className="absolute top-16 left-0 w-full text-center z-10 px-6 pointer-events-none">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4 drop-shadow-md">
          Featured Collection
        </h2>

      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollWrapperRef}
        className={`flex flex-nowrap items-center h-full pt-20 pb-10 px-[10vw] w-max transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      >
        {products.map((product, idx) => (
          <div
            key={idx}
            className="gallery-item flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[70vh] px-4 cursor-pointer group"
            onClick={() => onImageClick(idx)}
          >
            <div className="w-full h-full relative overflow-hidden rounded-2xl shadow-2xl bg-stone-200">
              <img
                src={product.img}
                alt={product.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onLoad={() => ScrollTrigger.refresh()} // Fallback refresh when dynamic images render
              />
              <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-stone-900/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-2xl md:text-3xl font-serif text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {product.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
