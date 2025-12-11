import React, { useEffect, useState, useRef } from "react";
import { Menu, X, Sun, Moon, ShoppingCart, Search, ChevronDown } from "lucide-react";
import useScroll from "../../hooks/useScroll";


const Navbar = ({ currentPage, setCurrentPage }) => {
  const isScrolled = useScroll(48);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cartCount, setCartCount] = useState(2); // example: dynamic in real app
  const [theme, setTheme] = useState("light");
  const searchRef = useRef(null);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" }, // services has dropdown
    { id: "gallery", label: "Gallery" },
    { id: "blog", label: "Ideas" },
    { id: "contact", label: "Contact" },
    { id: "about", label: "About Us" },
    { id: "testimonials", label: "Testimonials" }
  ];

  // sample services for dropdown
  const services = [
    { id: "custom", label: "Custom Design" },
    { id: "delivery", label: "Delivery & Installation" },
    { id: "restoration", label: "Restoration" },
    { id: "consult", label: "Interior Consultation" }
  ];

  // sample search suggestions (local, playful)
  const sampleSuggestions = [
    "sofa ideas",
    "dining table sets",
    "bedroom suites",
    "office furniture",
    "LED Panel",
    "small space furniture"
  ];

  useEffect(() => {
    const saved = localStorage.getItem("site-theme");
    if (saved) setTheme(saved);
    applyTheme(saved || theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyTheme(t) {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
      localStorage.setItem("site-theme", "dark");
      setTheme("dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("site-theme", "light");
      setTheme("light");
    }
  }

  const handleNavigate = (id) => {
    setCurrentPage(id);
    setIsMenuOpen(false);
    setServicesOpen(false);
    // small playful confetti? (left as comment — integrate library in future)
  };

  // close suggestions when clicking outside
  useEffect(() => {
    const onDoc = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 shadow-lg py-3" : "bg-white/75 backdrop-blur-sm py-6"
        } dark:bg-gray-900/90`}
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => handleNavigate("home")}
            title="Saifi — click to go home"
          >
            <div className="relative">
              <div className="text-2xl md:text-3xl font-serif font-bold text-amber-900 dark:text-amber-300 transform transition-transform duration-300 hover:-translate-y-1">
                SAIFI
              </div>
              <div className="absolute -right-5 -top-3 animate-bounce">🛋️</div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Furniture</div>
            <div className="ml-3 hidden md:inline-block px-2 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-medium animate-pulse">New Arrivals</div>
          </div>

          {/* Search + Suggestions */}
          <div className="flex-1 max-w-lg mx-4 hidden md:flex items-center">
            <div ref={searchRef} className="relative w-full">
              <div className="flex items-center bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-full px-3 py-2 shadow-sm">
                <Search className="text-gray-400" size={16} />
                <input
                  aria-label="Search products"
                  placeholder="Search furniture, ideas, collections..."
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  className="ml-2 w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200"
                />
                <button
                  onClick={() => {
                    // simulate search navigation
                    setShowSuggestions(false);
                    if (query.trim()) {
                      setCurrentPage("gallery");
                      setQuery("");
                    }
                  }}
                  className="ml-2 bg-amber-900 text-white px-3 py-1 rounded-full text-sm hover:bg-amber-800 transition"
                  aria-label="Search"
                >
                  Search
                </button>
              </div>

              {/* Suggestions dropdown */}
              {showSuggestions && query.trim().length >= 0 && (
                <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden z-40">
                  <div className="p-2 text-xs text-gray-500">Try these:</div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {sampleSuggestions
                      .filter(s => s.toLowerCase().includes(query.toLowerCase()))
                      .slice(0, 6)
                      .map((s, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setQuery("");
                            setShowSuggestions(false);
                            setCurrentPage("gallery");
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-amber-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
                        >
                          <span className="text-sm">🔎</span>
                          <span className="text-sm text-gray-700 dark:text-gray-200">{s}</span>
                        </button>
                      ))}
                    <div className="p-3 text-center text-xs text-gray-400">Press Enter to search</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-4">
              {navLinks.map((link) => {
                if (link.id === "services") {
                  return (
                    <li key={link.id} className="relative">
                      <button
                        onClick={() => setServicesOpen(open => !open)}
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                        className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-md transition ${
                          currentPage === "services" ? "text-amber-900" : "text-gray-600 dark:text-gray-300"
                        } hover:text-amber-800`}
                        aria-haspopup="menu"
                        aria-expanded={servicesOpen}
                      >
                        {link.label} <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                      </button>

                      {/* Services dropdown */}
                      {servicesOpen && (
                        <div
                          onMouseEnter={() => setServicesOpen(true)}
                          onMouseLeave={() => setServicesOpen(false)}
                          className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md shadow-lg overflow-hidden z-50"
                        >
                          {services.map((s, i) => (
                            <button
                              key={s.id}
                              onClick={() => handleServiceNavigate(s.id)}
                              className="w-full text-left px-4 py-3 hover:bg-amber-50 dark:hover:bg-gray-700 transition flex items-center gap-3"
                            >
                              <span className="text-amber-500">•</span>
                              <div>
                                <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{s.label}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Learn more</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={link.id}>
                    <button
                      onClick={() => handleNavigate(link.id)}
                      className={`text-sm relative px-2 py-1 font-medium transition ${
                        currentPage === link.id ? "text-amber-900" : "text-gray-600 dark:text-gray-300"
                      } hover:text-amber-800`}
                    >
                      {link.label}
                      {/* active underline */}
                      <span
                        className={`block h-0.5 bg-amber-900 rounded-full mt-1 transition-all duration-300 ${
                          currentPage === link.id ? "w-full" : "w-0"
                        }`}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Cart */}
            <button
              onClick={() => { /* open cart drawer in full app */ alert("Opening cart 🛒 (demo)"); }}
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Open cart"
            >
              <ShoppingCart size={18} />
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full animate-pulse">{cartCount}</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => applyTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="Toggle theme mobile">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile slide-in menu */}
        {isMenuOpen && (
          <MobilePanel
            navLinks={navLinks}
            services={services}
            onNavigate={(id) => handleNavigate(id)}
            onClose={() => setIsMenuOpen(false)}
            onSetServicesOpen={(v) => setServicesOpen(v)}
          />
        )}
      </nav>
    </>
  );

  // local helpers
  function handleServiceNavigate(serviceId) {
    // navigate to services page, optionally with anchor or subsection state
    setCurrentPage("services");
    setServicesOpen(false);
    setIsMenuOpen(false);
    // add a small playful toast in real app
  }
};

// MobilePanel: slide-in mobile menu
function MobilePanel({ navLinks, services, onNavigate, onClose, onSetServicesOpen }) {
  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-[85vw] max-w-xs bg-white dark:bg-gray-900 shadow-2xl p-6 overflow-auto transform transition-transform animate-fadeInUp">
        <div className="flex items-center justify-between mb-6">
          <div className="font-serif font-bold text-amber-900 text-lg">Saifi</div>
          <button onClick={onClose} aria-label="Close mobile menu" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-4">
          {navLinks.map((link, idx) => {
            if (link.id === "services") {
              return (
                <details key={link.id} className="bg-gray-50 dark:bg-gray-800 rounded-md overflow-hidden" onToggle={(e) => onSetServicesOpen(e.target.open)}>
                  <summary className="px-4 py-3 cursor-pointer flex items-center justify-between">
                    <span className="font-medium">{link.label}</span>
                    <ChevronDown size={14} />
                  </summary>
                  <div className="px-2 pb-2">
                    {services.map((s) => (
                      <button key={s.id} onClick={() => onNavigate("services")} className="w-full text-left px-3 py-2 rounded-md hover:bg-amber-50 dark:hover:bg-gray-700 transition">
                        {s.label}
                      </button>
                    ))}
                  </div>
                </details>
              );
            }

            return (
              <button key={link.id} onClick={() => onNavigate(link.id)} className="w-full text-left px-4 py-3 rounded-md hover:bg-amber-50 dark:hover:bg-gray-700 transition">
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-4">
          <button onClick={() => { alert("Cart (demo)"); }} className="w-full flex items-center justify-between px-4 py-3 rounded-md bg-amber-900 text-white">
            <span>View Cart</span>
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
