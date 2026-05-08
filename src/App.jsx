import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";
import Newsletter from "./components/Newsletter/Newsletter";
import QuoteDrawer from "./components/Quote/QuoteDrawer";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/Effects/PageTransition";



import { Analytics } from "@vercel/analytics/react";
import CataloguePage from "./pages/CataloguePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import ContactPage from "./pages/ContactPage";
import LocationPage from "./pages/LocationPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import OffersPage from "./pages/OffersPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import HomePage from "./pages/HomePage/HomePage";

export default function App() {
  const location = useLocation();

  /* =========================
     SEO HANDLING (URL BASED)
  ========================= */
  useEffect(() => {
    const seoMap = {
      "/": {
        title: "Saifi Furniture | Best Luxury Furniture in Haldwani",
        desc: "Saifi Furniture offers the best luxury custom furniture and modular kitchens in Haldwani. Find premium furniture near me for your home & office.",
        keywords: "saifi furniture, saifi furniture Haldwani, best furniture, best furniture in haldwani, luxury furniture, luxury furniture haldwani, furniture near me"
      },
      "/catalogue": {
        title: "Exclusive Catalogue | Best Furniture in Haldwani",
        desc: "Explore the Saifi Furniture Catalogue featuring premium luxury furniture. Find the best furniture near me with top-notch modular layouts.",
        keywords: "saifi furniture catalogue, luxury furniture haldwani, best furniture, furniture near me"
      },
      "/about": {
        title: "About Us | Saifi Furniture Haldwani",
        desc: "Learn about Saifi Furniture’s craftsmanship. We are known for providing the best luxury furniture in Haldwani.",
        keywords: "about saifi furniture, saifi furniture Haldwani, luxury furniture, best furniture in haldwani"
      },
      "/services": {
        title: "Services | Custom & Luxury Furniture Haldwani",
        desc: "Custom furniture design and modular kitchens by Saifi Furniture. Delivering the best furniture in Haldwani and nearby locations.",
        keywords: "furniture services, best furniture in haldwani, custom luxury furniture, furniture near me"
      },
      "/gallery": {
        title: "Gallery | Best Furniture Projects in Haldwani",
        desc: "Explore our luxury furniture and interior design projects at Saifi Furniture Haldwani. See why we offer the best furniture near me.",
        keywords: "saifi furniture gallery, best furniture, luxury furniture haldwani, furniture near me"
      },
      "/blog": {
        title: "Blog | Luxury Furniture Ideas by Saifi Furniture",
        desc: "Design ideas and tips for the best luxury furniture in Haldwani. Stay updated with Saifi Furniture.",
        keywords: "furniture blog, best furniture in haldwani, luxury furniture ideas, saifi furniture Haldwani"
      },
      "/contact": {
        title: "Contact Saifi Furniture | Best Furniture in Haldwani",
        desc: "Get in touch with Saifi Furniture. We offer the best luxury custom furniture in Haldwani. Visit our showroom near you.",
        keywords: "contact saifi furniture, saifi furniture Haldwani, furniture near me, best furniture in haldwani"
      },
      "/testimonials": {
        title: "Reviews | Saifi Furniture Haldwani",
        desc: "Read client reviews and see why we are rated as the best luxury furniture store in Haldwani.",
        keywords: "saifi furniture reviews, best furniture in haldwani, luxury furniture haldwani"
      },
      "/offers": {
        title: "Offers & Deals | Luxury Furniture in Haldwani",
        desc: "Explore special deals on the best luxury furniture in Haldwani at Saifi Furniture.",
        keywords: "furniture offers, saifi furniture Haldwani, best furniture deals, luxury furniture discounts"
      },
      "/location": {
        title: "Location | Saifi Furniture Showroom Haldwani",
        desc: "Visit the Saifi Furniture showroom. Find the best luxury furniture near me in Haldwani.",
        keywords: "saifi furniture location, furniture near me, saifi furniture Haldwani, best furniture showroom"
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
            <Route path="/catalogue" element={<PageTransition><CataloguePage /></PageTransition>} />
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
