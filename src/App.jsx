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
        title: "Saifi Furniture | Luxury Custom Furniture in Haldwani",
        desc: "Luxury custom furniture, modular kitchens & interiors crafted with precision. Best furniture showroom in Haldwani.",
        keywords: "furniture in haldwani, luxury furniture, custom furniture, modular kitchen, saifi furniture"
      },
      "/about": {
        title: "About Us | Saifi Furniture",
        desc: "Learn about Saifi Furniture’s craftsmanship, values, and design philosophy.",
        keywords: "wood craftsmanship, custom design philosophy, saifi furniture history"
      },
      "/services": {
        title: "Services | Custom Furniture & Interiors",
        desc: "Custom furniture design, modular kitchens, restoration & interior consultation.",
        keywords: "interior design services, modular kitchen installation, furniture restoration"
      },
      "/gallery": {
        title: "Gallery | Saifi Furniture Projects",
        desc: "Explore our luxury furniture and interior design projects.",
        keywords: "furniture ideas, design portfolio, luxury interior concepts"
      },
      "/blog": {
        title: "Ideas & Insights | Saifi Furniture Blog",
        desc: "Design ideas, furniture tips, and interior inspiration.",
        keywords: "interior tips, wood maintenance, home decor blogs"
      },
      "/contact": {
        title: "Contact Us | Saifi Furniture Haldwani",
        desc: "Get in touch with Saifi Furniture for custom furniture & interiors.",
        keywords: "saifi furniture contact, showroom number, haldwani details"
      },
      "/testimonials": {
        title: "Client Reviews | Saifi Furniture Ratings",
        desc: "Read reviews and experiences shared by our valued clients.",
        keywords: "saifi furniture reviews, client testimonials, customer feedback"
      },
      "/offers": {
        title: "Offers & Deals | Saifi Furniture",
        desc: "Explore special offers and deals from Saifi Furniture.",
        keywords: "furniture discounts, sales, seasonal node deals"
      },
      "/location": {
        title: "Our Location | Saifi Furniture Showroom",
        desc: "Visit Saifi Furniture showroom and experience craftsmanship firsthand.",
        keywords: "saifi location, furniture map showroom, address route"
      }
    };

    const seo = seoMap[location.pathname] || seoMap["/"];
    
    // 1. Update Title
    document.title = seo.title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = seo.desc;

    // 3. Update Meta Keywords
    let metaKeywords = document.querySelector("meta[name='keywords']");
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = seo.keywords || seoMap["/"].keywords;

    // 4. Update OpenGraph Tags
    const updateOrCreateMetaProperty = (property, content) => {
      let meta = document.querySelector(`meta[property='${property}']`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    updateOrCreateMetaProperty("og:title", seo.title);
    updateOrCreateMetaProperty("og:description", seo.desc);
    updateOrCreateMetaProperty("og:type", "website");
    updateOrCreateMetaProperty("og:url", window.location.href);

    // 5. Update Canonical Link
    let linkCanonical = document.querySelector("link[rel='canonical']");
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.rel = "canonical";
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = window.location.href;

    // 6. Local Business Structured Data (JSON-LD) for Google Maps linking
    let scriptSchema = document.getElementById("structured-data-schema");
    if (!scriptSchema) {
      scriptSchema = document.createElement("script");
      scriptSchema.id = "structured-data-schema";
      scriptSchema.type = "application/ld+json";
      document.head.appendChild(scriptSchema);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FurnitureStore",
      "name": "Saifi Furniture",
      "description": "Best luxury and custom furniture showroom in Haldwani. Modular Kitchens & Interiors.",
      "url": window.location.origin,
      "telephone": "+91 8077441194",
      "priceRange": "₹₹-₹₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Mangal Parao",
        "addressLocality": "Haldwani",
        "addressRegion": "Uttarakhand",
        "postalCode": "263139",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "29.2195", 
        "longitude": "79.5115"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "09:00",
        "closes": "21:00"
      }
    };

    scriptSchema.innerHTML = JSON.stringify(schemaData);

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
