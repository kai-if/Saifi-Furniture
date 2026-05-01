import React, { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "../../components/Lightbox/Lightbox";
import TestimonialsCarousel from "../../components/TestimonialsCarousel";
import PremiumCTA from "../../components/PremiumCTA";
import useReveal from "../../hooks/useReveal";
import { useNavigate } from "react-router-dom";

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

export default function HomePage() {
  const navigate = useNavigate();

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

      {/* HERO SECTION */}
      <div className="w-full h-screen flex items-center justify-center p-3 md:p-5 bg-stone-50">
        <section className="relative w-full max-w-[1536px] h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-none flex flex-col items-center justify-center group">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4"
          />
          <div className="absolute inset-0 bg-stone-900/30 z-0" />

          <div ref={heroRef} className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6 max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif font-bold text-stone-100 mb-6"
            >
              Crafted Elegance
              <br />
              for Your Home
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-stone-200 mb-10 drop-shadow-md"
            >
              Handcrafted furniture blending comfort, quality, and timeless design.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <button
                onClick={() => navigate("/gallery")}
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-medium hover:bg-white/30 transition-all duration-300 shadow-lg"
              >
                Explore Collection
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="bg-stone-900/40 backdrop-blur-md border border-stone-700/50 text-stone-100 px-10 py-4 rounded-full hover:bg-stone-900/60 transition-all duration-300 shadow-lg"
              >
                Get a Quote
              </button>
            </motion.div>
          </div>
        </section>
      </div>

      {/* FEATURED COLLECTION */}
      <section ref={featureRef} className="bg-stone-300 py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-stone-700 text-lg">
              Handpicked pieces that define luxury living
            </p>
          </div>

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
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={product.img}
                    alt={product.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <h3 className="mt-6 text-xl font-serif font-semibold text-stone-900">
                  {product.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {lightboxOpen && (
          <Lightbox
            images={lightboxImages}
            startIndex={startIdx}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </section>

      {/* TESTIMONIALS */}
      <section ref={testimonialRef} className="bg-stone-100 py-28 px-6">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-stone-900 mb-16">
          Trusted by Our Clients
        </h2>
        <TestimonialsCarousel />
      </section>

      {/* PREMIUM CTA */}
      <PremiumCTA
        onContact={() => {
          navigate("/contact");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}
