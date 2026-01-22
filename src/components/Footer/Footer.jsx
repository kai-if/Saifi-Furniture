import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Twitter, ChevronUp, Mail, MapPin, Phone, Copy, Motorbike, MessageCircle} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwPPP72wABOChyBmpR-scy1RWzt-kec10y5iRrHtNplPTfZm7njq8xk9H6p9Ml8JHF6/exec";

const Footer = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // helper to navigate and then scroll if an anchor is present
  const navigateAndScroll = (pageId, anchorId = null) => {
    // navigate first
    if (typeof setCurrentPage === "function") setCurrentPage(pageId);

    // allow page to render/settle, then attempt to scroll to anchor
    setTimeout(() => {
      if (anchorId) {
        const el = document.getElementById(anchorId) || document.querySelector(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          // little wiggle to draw attention
          el.animate([{ transform: "translateY(-4px)" }, { transform: "translateY(0)" }], { duration: 400 });
          return;
        }
      }
      // fallback: scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 120);
  };

const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter an email address");
      return;
    }

    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // REQUIRED for Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "footer",
        }),
      });

      alert("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      alert("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallback: select + prompt
      prompt("Copy this code:", promoCode);
    }
  };

  const quickLinks = [
    { page: "home", label: "Home" },
    { page: "about", label: "Our Story", anchor: "our-story" }, // anchor optional
    { page: "services", label: "Services", anchor: "services" },
    { page: "gallery", label: "Gallery" },
    { page: "blog", label: "Ideas" },
    { page: "testimonials", label: "Testimonials" },
    { page: "contact", label: "Contact" }
  ];

  const faqs = [
    { q: "Free delivery?", a: "Yes — across our local region for orders above ₹50,000." },
    { q: "Custom sizes?", a: "Absolutely. We specialize in tailored pices for your space." },
    { q: "Warranty?", a: "A lifetime frame warranty on most wooden pieces." }
  ];

  return (
    <footer className="bg-gradient-to-tr from-zinc-950 via-sky-950 to-gray-800 text-gray-100 relative mt-16">
      <div className="container mx-auto py-12 px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand + playful tagline */}
          <div className="space-y-4">
          <button
              onClick={() => navigateAndScroll("home")}
              className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition bg-transparent border-none p-0 m-0 focus:outline-none"
              style={{ background: "none", border: "none" }}
              >
              <div className="text-3xl md:text-4xl font-serif font-bold text-blue-200 select-none">
                  SAIFI
              </div>

              <div className="text-sm text-amber-100 font-semibold">
                  Furniture
                </div>

              <div className="ml-2 px-2 py-1 bg-amber-50 text-amber-900 rounded-full text-xs animate-pulse">
                  ✨ New
              </div>
          </button>

            <p className="text-sm text-gray-200">
              Crafted with love. Built for stories. Tap the buttons below to explore — we’ll take you there, smooth as butter.
            </p>

             {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.instagram.com/saififurnitures/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://wa.me/918077441194"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:text-white transition text-sm font-semibold"
              >
                <FaWhatsapp size={18} />
              </a>

              <a
                href="mailto:Saifi.furn@gmail.com"
                aria-label="Email"
                className="hover:text-white transition"
              >
                <Mail size={18} />
              </a>
            </div>

            <div className="mt-4 text-xs text-gray-300">© {new Date().getFullYear()} Saifi Furniture — built with care ❤️</div>
          </div>

          {/* Quick links */}
        <div>
            <h4 className="text-lg font-semibold text-amber-50 mb-3">Quick Links</h4>

  {/* Two-column layout */}
             <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
  {quickLinks.map((l, idx) => (
    <li key={l.page} className="relative">
      <button
        onClick={() => navigateAndScroll(l.page, l.anchor)}
        className={`
          link-anim
          group
          w-full
          text-sm
          text-gray-200
          text-left
          p-0
          m-0
          bg-transparent
          border-none
          cursor-pointer
          focus:outline-none
        `}
        style={{ background: "none", border: "none" }}
        aria-label={`Go to ${l.label}`}
      >
        <span className="relative inline-block overflow-hidden">
          {/* main text — gradient on hover */}
          <span className="inline-block transform transition-transform duration-300 group-hover:-translate-y-0.5">
            {l.label}
          </span>

          {/* sparkle sweep */}
          <span className="sparkle absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-white/40 via-white/20 to-white/0 opacity-0 group-hover:opacity-100"></span>
        </span>

        {/* animated underline */}
        <span
          className="absolute left-0 -bottom-0.5 h-0.5 w-0 rounded-full bg-gray-300 transition-all duration-350 group-hover:w-full"
          style={{ transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)" }}
        />
      </button>
    </li>
  ))}
</ul>
</div>


          {/* Newsletter & promo */}
          <div>
            <h4 className="text-lg font-semibold text-amber-50 mb-3">Join the Club</h4>
            <p className="text-sm text-gray-200 mb-3">Subscribe for design tips, early access & best offers</p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                aria-label="newsletter email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-md bg-white/10 border border-white/10 focus:border-blue-300 outline-none text-white placeholder:text-gray-300"
              />
              <button type="submit" className="px-3 py-2 rounded-md bg-blue-50 text-blue-900 font-semibold hover:scale-105 transition">
                {subscribed ? "Thanks!" : "Subscribe"}
              </button>
            </form>

          </div>

          {/* Contact + FAQ */}
          <div>
            <h4 className="text-lg font-semibold text-amber-50 mb-3">
              Contact
            </h4>

            <div className="space-y-3 text-sm">
              {/* ADDRESS */}
              <div className="flex items-start gap-3">
                <MapPin size={18} />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Saifi+Furniture+Mangal+Parao+Haldwani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Mangal Parao, Haldwani<br />
                  Uttarakhand
                </a>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-3">
                <Phone size={18} />
                <a
                  href="tel:+918077441194"
                  className="hover:text-white transition"
                >
                  +91 8077441194
                </a>
              </div>
                <div className="flex items-start gap-3">
                <Phone size={18} />
                <a
                  href="tel:+918474986781"
                  className="hover:text-white transition"
                >
                  +91 8474986781
                </a>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-3">
                <Mail size={18} />
                <a
                  href="mailto:Saifi.furn@gmail.com"
                  className="hover:text-white transition"
                >
                  Saifi.furn@gmail.com
                </a>
              </div>
            </div>
            {/* <div className="mt-6">
              <h5 className="text-sm text-blue-100 mb-2">Quick FAQs</h5>
              <div className="space-y-2">
                {faqs.map((f, i) => (
                  <details key={i} className="bg-white/5 rounded-md overflow-hidden">
                    <summary className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center">
                      <span>{f.q}</span>
                      <span className="text-blue-200 text-xs">?</span>
                    </summary>
                    <div className="px-3 py-2 text-gray-300 text-sm">{f.a}</div>
                  </details>
                ))}
              </div>
            </div> */}
          </div>

        </div>
      </div>

      {/* decorative playful wave and floating back-to-top button */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <svg className="w-full h-8 md:h-12" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.06)" />
        </svg>
      </div>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed right-6 bottom-16 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <ChevronUp size={18} />
        </button>
      )}
    </footer>
  );
};

export default Footer;











