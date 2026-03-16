import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";
import Newsletter from "./components/Newsletter/Newsletter";
import QuoteDrawer from "./components/Quote/QuoteDrawer";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/Effects/PageTransition";



import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import ContactPage from "./pages/ContactPage";
import LocationPage from "./pages/LocationPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import OffersPage from "./pages/OffersPage";
import BlogPage from "./pages/BlogPage/BlogPage";

import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const location = useLocation();

  /* =========================
     SEO HANDLING (URL BASED)
  ========================= */
  useEffect(() => {
    const seoMap = {
      "/": {
        title: "Saifi Furniture | Luxury Custom Furniture",
        desc: "Luxury custom furniture, modular kitchens & interiors crafted with precision."
      },
      "/about": {
        title: "About Us | Saifi Furniture",
        desc: "Learn about Saifi Furniture’s craftsmanship, values, and design philosophy."
      },
      "/services": {
        title: "Services | Custom Furniture & Interiors",
        desc: "Custom furniture design, modular kitchens, restoration & interior consultation."
      },
      "/gallery": {
        title: "Gallery | Saifi Furniture Projects",
        desc: "Explore our luxury furniture and interior design projects."
      },
      "/blog": {
        title: "Ideas & Insights | Saifi Furniture Blog",
        desc: "Design ideas, furniture tips, and interior inspiration."
      },
      "/contact": {
        title: "Contact Us | Saifi Furniture Haldwani",
        desc: "Get in touch with Saifi Furniture for custom furniture & interiors."
      },
      "/testimonials": {
        title: "Client Reviews | Saifi Furniture",
        desc: "Read reviews and experiences shared by our valued clients."
      },
      "/offers": {
        title: "Offers | Saifi Furniture",
        desc: "Explore special offers and deals from Saifi Furniture."
      },
      "/location": {
        title: "Our Location | Saifi Furniture",
        desc: "Visit Saifi Furniture showroom and experience craftsmanship firsthand."
      }
    };

    const seo = seoMap[location.pathname] || seoMap["/"];

    document.title = seo.title;

    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = seo.desc;
  }, [location.pathname]);

  return (
    <div className="font-sans text-gray-800 bg-stone-50">
      <Navbar />

      <main className="min-h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
            <Route path="/gallery" element={<PageTransition><GalleryPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="/location" element={<PageTransition><LocationPage /></PageTransition>} />
            <Route path="/testimonials" element={<PageTransition><TestimonialsPage /></PageTransition>} />
            <Route path="/offers" element={<PageTransition><OffersPage /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Newsletter />
      <Footer />
      <Chatbot />
      <QuoteDrawer />
      <Analytics />
    </div>
  );
}
