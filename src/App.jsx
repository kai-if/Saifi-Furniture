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
    </div>
  );
}
