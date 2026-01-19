import React, { useState } from "react";
import Lightbox from "../../components/Lightbox/Lightbox";
import TestimonialsCarousel from "../../components/TestimonialsCarousel";
import PremiumCTA from "../../components/PremiumCTA";
import useReveal from "../../hooks/useReveal";

/* ===============================
   FEATURED PRODUCTS
================================ */
const featuredProducts = [
  {
    name: "L-Shaped Sofa With Swing Chair",
    img: "/assets/images/sofa2.PNG",
    alt: "L-Shaped Sofa"
  },
  {
    name: "Wall Art",
    img: "/assets/images/wallart.PNG",
    alt: "Wall Art"
  },
  {
    name: "Wooden Doors",
    img: "/assets/images/door.JPG",
    alt: "Wooden Doors"
  }
];

export default function HomePage({ setPage }) {
  /* ===============================
     LIGHTBOX STATE
  ================================ */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [startIdx, setStartIdx] = useState(0);

  const lightboxImages = featuredProducts.map(p => ({
    src: p.img,
    alt: p.alt,
    caption: p.name
  }));

  /* ===============================
     REVEAL HOOKS
  ================================ */
  const heroRef = useReveal();
  const featureRef = useReveal();
  const testimonialRef = useReveal();

  return (
    <div className="overflow-hidden">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center slow-zoom"
          style={{ backgroundImage: "url('/assets/images/IMG_2905.JPG')" }}
        />
        <div className="absolute inset-0 bg-stone-900/45" />

        {/* Content */}
        <div
          ref={heroRef}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-100 mb-6">
            Crafted Elegance
            <br />
            for Your Home
          </h1>

          <p className="text-xl md:text-2xl text-stone-200 mb-10">
            Handcrafted furniture blending comfort, quality, and timeless design.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => setPage("gallery")}
              className="
                bg-stone-100 text-stone-900
                px-10 py-4 rounded-md
                font-medium
                hover:bg-stone-200
                transition-all duration-300
              "
            >
              Explore Collection
            </button>

            <button
              onClick={() => setPage("contact")}
              className="
                border border-stone-200 text-stone-100
                px-10 py-4 rounded-md
                hover:bg-stone-100/10
                transition-all duration-300
              "
            >
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED COLLECTION
      ====================================================== */}
      <section
        ref={featureRef}
        className="bg-stone-300 py-24 px-6"
      >
        <div className="container mx-auto">

          {/* Heading */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-stone-700 text-lg">
              Handpicked pieces that define luxury living
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-10">
            {featuredProducts.map((product, idx) => (
              <div
                key={idx}
                className="group cursor-pointer fade-up"
                style={{ animationDelay: `${idx * 150}ms` }}
                onClick={() => {
                  setStartIdx(idx);
                  setLightboxOpen(true);
                }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={product.img}
                    alt={product.alt}
                    className="
                      w-full h-full object-cover
                      transition-transform duration-700
                      group-hover:scale-110
                    "
                  />

                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-black/50 via-black/20 to-transparent
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity duration-500
                    "
                  />
                </div>

                {/* Text */}
                <h3 className="mt-6 text-xl font-serif font-semibold text-stone-900">
                  {product.name}
                </h3>

                <div
                  className="
                    mt-2 h-[2px] w-12 bg-stone-800
                    transition-all duration-500
                    group-hover:w-24
                  "
                />
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <Lightbox
            images={lightboxImages}
            startIndex={startIdx}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </section>

      {/* =====================================================
          TESTIMONIALS
      ====================================================== */}
      <section
        ref={testimonialRef}
        className="bg-stone-100 py-28 px-6"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-stone-900 mb-16">
          Trusted by Our Clients
        </h2>

        <TestimonialsCarousel />
      </section>

      {/* =====================================================
          PREMIUM CTA
      ====================================================== */}
      <PremiumCTA onContact={() => setPage("contact")} />

    </div>
  );
}
