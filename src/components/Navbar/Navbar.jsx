import React, { useEffect, useState, useRef } from "react";
import { Menu, X, Sun, Moon, ShoppingCart, Search, ChevronDown } from "lucide-react";
import useScroll from "../../hooks/useScroll";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const isScrolled = useScroll(48);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [theme, setTheme] = useState("light");
  const searchRef = useRef(null);

  // hover/focus state for the navbar area -> used to expand when collapsed
  const [isHovered, setIsHovered] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "blog", label: "Ideas" },
    { id: "contact", label: "Contact" },
    { id: "about", label: "About Us" },
    { id: "testimonials", label: "Testimonials" }
  ];

  const services = [
    { id: "custom", label: "Custom Design" },
    { id: "delivery", label: "Delivery & Installation" },
    { id: "restoration", label: "Restoration" },
    { id: "consult", label: "Interior Consultation" }
  ];

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

  // collapsed when scrolled & not hovered & menu closed
  const isCollapsed = isScrolled && !isHovered && !isMenuOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm ${
          isCollapsed ? "bg-white/95 dark:bg-gray-900/90 py-2 shadow-sm" : "bg-white/95 dark:bg-gray-900/95 py-5 shadow-lg"
        }`}
        aria-label="Main navigation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <div className="container mx-auto px-6 flex items-center justify-between gap-4">
          {/* Logo / Brand */}
          <div
            className={`flex items-center gap-3 select-none transition-all duration-250 ${
              isCollapsed ? "mx-auto w-full justify-center" : "justify-start"
            }`}
          >
            <button
              onClick={() => handleNavigate("home")}
              className="flex items-center gap-3 bg-transparent border-none p-0 m-0 cursor-pointer focus:outline-none"
              aria-label="Go to home"
            >
              <div className={`${isCollapsed ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"} font-serif font-bold text-blue-300 dark:text-blue-300`}>
                SAIFI
              </div>

              {!isCollapsed && <div className="text-sm text-gray-600 dark:text-gray-300">Furniture</div>}

              <div className="ml-2 px-2 py-1 bg-blue-100 text-blue-900 rounded-full text-xs animate-pulse">SF</div>
            </button>
          </div>

          {/* Desktop full controls (hidden when collapsed) */}
          <div
            className={`hidden md:flex items-center gap-6 transition-all duration-300 ease-in-out ${
              isCollapsed ? "opacity-0 pointer-events-none -translate-y-2 max-h-0" : "opacity-100 pointer-events-auto translate-y-0"
            }`}
            aria-hidden={isCollapsed}
          >
            <ul className="flex items-center gap-4">
              {navLinks.map((link) => {
                if (link.id === "services") {
                  return (
                    <li key={link.id} className="relative">
                      <button
                        onClick={() => setServicesOpen((s) => !s)}
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                        className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-md transition ${
                          currentPage === "services" ? "text-blue-400" : "text-gray-600 dark:text-gray-300"
                        } hover:text-blue-700`}
                        aria-haspopup="menu"
                        aria-expanded={servicesOpen}
                      >
                        {link.label} <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                      </button>

                      {servicesOpen && (
                        <div
                          onMouseEnter={() => setServicesOpen(true)}
                          onMouseLeave={() => setServicesOpen(false)}
                          className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md shadow-lg overflow-hidden z-50"
                        >
                          {services.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => {
                                handleNavigate("services");
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition flex items-center gap-3"
                            >
                              <span className="text-blue-500">•</span>
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
                        currentPage === link.id ? "text-blue-400" : "text-gray-600 dark:text-gray-300"
                      } hover:text-blue-700`}
                    >
                      {link.label}
                      <span
                        className={`block h-0.5 bg-blue-400 rounded-full mt-1 transition-all duration-300 ${
                          currentPage === link.id ? "w-full" : "w-0"
                        }`}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Search box */}
            <div className="flex items-center">
              <div ref={searchRef} className="relative">
                <div className="flex items-center bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-full px-3 py-2 shadow-sm">
                  <Search className="text-gray-400" size={16} />
                  <input
                    aria-label="Search products"
                    placeholder="Search furniture, ideas, collections..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="ml-2 w-64 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200"
                  />
                  <button
                    onClick={() => {
                      setShowSuggestions(false);
                      if (query.trim()) {
                        handleNavigate("gallery");
                        setQuery("");
                      }
                    }}
                    className="ml-2 bg-blue-300 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-400 transition"
                    aria-label="Search"
                  >
                    Search
                  </button>
                </div>

                {showSuggestions && query.trim().length >= 0 && (
                  <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden z-40">
                    <div className="p-2 text-xs text-gray-500">Try these:</div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                      {sampleSuggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setQuery("");
                            setShowSuggestions(false);
                            handleNavigate("gallery");
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
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

            {/* cart + theme */}
            <button onClick={() => alert("Opening cart 🛒 (demo)")} className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="Open cart">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-blue-400 text-black text-xs font-semibold px-2 py-0.5 rounded-full animate-pulse">{cartCount}</span>
            </button>

            <button onClick={() => applyTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile area */}
          <div className={`flex items-center gap-2 ${isCollapsed ? "ml-auto" : ""}`}>
            <button onClick={() => applyTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition md:hidden" aria-label="Toggle theme mobile">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition md:hidden">
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

  // helpers
  function handleServiceNavigate(serviceId) {
    setCurrentPage("services");
    setServicesOpen(false);
    setIsMenuOpen(false);
  }
};

// MobilePanel component (unchanged, color adjusted)
function MobilePanel({ navLinks, services, onNavigate, onClose, onSetServicesOpen }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[85vw] max-w-xs bg-white dark:bg-gray-900 shadow-2xl p-6 overflow-auto transform transition-transform animate-fadeInUp">
        <div className="flex items-center justify-between mb-6">
          <div className="font-serif font-bold text-blue-300 text-lg">Saifi</div>
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
                      <button key={s.id} onClick={() => onNavigate("services")} className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700 transition">
                        {s.label}
                      </button>
                    ))}
                  </div>
                </details>
              );
            }

            return (
              <button key={link.id} onClick={() => onNavigate(link.id)} className="w-full text-left px-4 py-3 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700 transition">
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-4">
          <button onClick={() => { alert("Cart (demo)"); }} className="w-full flex items-center justify-between px-4 py-3 rounded-md bg-blue-700 text-white">
            <span>View Cart</span>
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
