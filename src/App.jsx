import React, { useState } from "react";
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
import { useEffect } from "react";



export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const pages = {
    home: <HomePage setPage={setCurrentPage} />,
    about: <AboutPage />,
    services: <ServicesPage setCurrentPage={setCurrentPage} />,
    gallery: <GalleryPage />,
    contact: <ContactPage />,
    location: <LocationPage />,
    testimonials: <TestimonialsPage />,
    offers: <OffersPage />,
    blog: <BlogPage />
  };

  useEffect(() => {
  const seoMap = {
    home: {
      title: "Saifi Furniture | Luxury Custom Furniture",
      desc: "Luxury custom furniture, modular kitchens & interiors crafted with precision."
    },
    about: {
      title: "About Us | Saifi Furniture",
      desc: "Learn about Saifi Furniture’s craftsmanship, values, and design philosophy."
    },
    services: {
      title: "Services | Custom Furniture & Interiors",
      desc: "Custom furniture design, modular kitchens, restoration & interior consultation."
    },
    gallery: {
      title: "Gallery | Saifi Furniture Projects",
      desc: "Explore our luxury furniture and interior design projects."
    },
    blog: {
      title: "Ideas & Insights | Saifi Furniture Blog",
      desc: "Design ideas, furniture tips, and interior inspiration."
    },
    contact: {
      title: "Contact Us | Saifi Furniture Haldwani",
      desc: "Get in touch with Saifi Furniture for custom furniture & interiors."
    },
    testimonials: {
      title: "Client Reviews | Saifi Furniture",
      desc: "Read reviews and experiences shared by our valued clients."
    }
  };

  document.title = seoMap[currentPage]?.title || "Saifi Furniture";

  let metaDesc = document.querySelector("meta[name='description']");
  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = seoMap[currentPage]?.desc || "";
}, [currentPage]);


  return (
    <div className="font-sans text-gray-800 bg-stone-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="min-h-screen overflow-hidden">
          <div key={currentPage} className="animate-fadeInUp">
             {pages[currentPage]}
          </div>
        </main>
      <Newsletter />
      <Footer setCurrentPage={setCurrentPage} />
      <Chatbot />
      <Analytics />
    </div>
  );
}
