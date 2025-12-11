import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Twitter, ChevronUp, Mail, MapPin, Phone, Copy } from "lucide-react";

const Footer = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const promoCode = "SAIFI";

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email to subscribe 😊");
      return;
    }
    setSubscribed(true);
    setEmail("");
    // in a real app: call API here
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
    { q: "Custom sizes?", a: "Absolutely. We specialize in bespoke pieces tailored to your space." },
    { q: "Warranty?", a: "A lifetime frame warranty on most wooden pieces + 1 year on upholstery." }
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

            <div className="flex items-center gap-3">
              <button aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center">
                <Facebook size={16} />
              </button>
              <button aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center">
                <Instagram size={16} />
              </button>
              <button aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center">
                <Twitter size={16} />
              </button>
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
            <p className="text-sm text-gray-200 mb-3">Subscribe for design tips, early access & a surprise code 🎁</p>

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

            <div className="mt-4 flex items-center gap-3">
              <div className="bg-white/6 px-3 py-2 rounded-md text-sm text-black-100 select-all">
                Promo: <strong className="ml-2">{promoCode}</strong>
              </div>
              <button onClick={handleCopy} aria-label="Copy code" className="p-2 bg-white/10 rounded-md hover:bg-white/20 transition flex items-center gap-2">
                <Copy size={16} />
                <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            <div className="mt-3 text-xs text-gray-300">Tip: use promo at checkout. Valid for first 100 customers!</div>
          </div>

          {/* Contact + FAQ */}
          <div>
            <h4 className="text-lg font-semibold text-amber-50 mb-3">Contact & Help</h4>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-blue-200" />
                <div>
                  <div className="font-medium text-gray-50">Saifi Furnitures,</div>
                  <div className="text-gray-300 text-xs">Mangal Parao,<br></br> Haldwani, Uttarakhand - 263139</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-1 text-blue-200" />
                <div>
                  <div className="font-medium text-gray-50">Call</div>
                  <div className="text-gray-300 text-xs">+91 8077441194<br></br>+91 8474986781</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-1 text-blue-200" />
                <div>
                  <div className="font-medium text-gray-50">Email</div>
                  <div className="text-gray-300 text-xs">info@Saifi-Furniture.com</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
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
            </div>
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











