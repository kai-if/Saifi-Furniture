import React, { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "../../components/Lightbox/Lightbox";
import TestimonialsCarousel from "../../components/TestimonialsCarousel";
import PremiumCTA from "../../components/PremiumCTA";
import useReveal from "../../hooks/useReveal";
import { useNavigate } from "react-router-dom";
import HorizontalGallery from "../../components/Showcase/HorizontalGallery";

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
  },
  {
    name: "Modern Living Room",
    img: "/assets/images/IMG_2905.JPG",
    alt: "Modern Living Room"
  },
  {
    name: "Classic Wooden Bed",
    img: "/assets/images/bed.JPG",
    alt: "Classic Wooden Bed"
  },
  {
    name: "Elegant Dressing Table",
    img: "/assets/images/dressing.PNG",
    alt: "Elegant Dressing Table"
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
    <div className="overflow-x-hidden w-full">

      {/* HERO SECTION */}
      <div className="w-full h-[100dvh] flex items-center justify-center bg-stone-900">
        <section className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center group">
          <video
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            controls={false}
            className="absolute inset-0 w-full h-full object-cover object-[75%_center] md:object-center z-0 pointer-events-none"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4"
          />
          <div className="absolute inset-0 bg-stone-900/30 z-0 pointer-events-none" />

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

      {/* FEATURED COLLECTION - STICKY HORIZONTAL SCROLL */}
      <HorizontalGallery
        products={featuredProducts}
        onImageClick={(idx) => {
          setStartIdx(idx);
          setLightboxOpen(true);
        }}
      />

      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          startIndex={startIdx}
          onClose={() => setLightboxOpen(false)}
        />
      )}

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
