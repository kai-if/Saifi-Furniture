import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";
import Newsletter from "./components/Newsletter/Newsletter";

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
        <div key={location.pathname} className="animate-fadeInUp">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/blog" element={<BlogPage />} />
          </Routes>
        </div>
      </main>

      <Newsletter />
      <Footer />
      <Chatbot />
      <Analytics />
    </div>
  );
}
