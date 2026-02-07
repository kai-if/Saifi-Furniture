import React, { useEffect, useState, useRef } from "react";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import useScroll from "../../hooks/useScroll";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const isScrolled = useScroll(48);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isHovered, setIsHovered] = useState(false);

  const servicesTimeout = useRef(null);
  const isMobile = window.innerWidth < 768;

  const isCollapsed = !isMobile && isScrolled && !isHovered;

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

  useEffect(() => {
    const saved = localStorage.getItem("site-theme");
    if (saved) setTheme(saved);
    applyTheme(saved || theme);
    // eslint-disable-next-line
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
    // 👇 Force scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openServices = () => {
    clearTimeout(servicesTimeout.current);
    setServicesOpen(true);
  };

  const closeServices = () => {
    servicesTimeout.current = setTimeout(() => {
      setServicesOpen(false);
    }, 120);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isCollapsed ? "py-2 bg-white/95 shadow-sm" : "py-4 bg-white/75 backdrop-blur-sm shadow-md"}
        dark:bg-gray-900/90`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => handleNavigate("home")}
          role="link"
          aria-label="Go to homepage"
          className={`
            cursor-pointer select-none
            font-serif font-bold tracking-wide
            text-blue-300
            transition-all duration-300
            ${isCollapsed ? "text-lg" : "text-2xl md:text-3xl"}
          `}
        >
          SAIFI{" "}
          <span className="font-normal text-gray-600 dark:text-gray-300">
            Furniture
          </span>
        </div>

        {/* DESKTOP NAV */}
        <div
          className={`hidden md:flex items-center gap-6 transition-all duration-300
            ${isCollapsed ? "opacity-0 pointer-events-none translate-y-[-6px]" : "opacity-100 translate-y-0"}`}
        >
          <ul className="flex items-center gap-4">
            {navLinks.map((link) => {
              if (link.id === "services") {
                return (
                  <li
                    key={link.id}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServices}
                  >
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-400 transition">
                      Services
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`absolute top-full left-0 mt-3 w-60 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700
                        transition-all duration-200 ease-out origin-top
                        ${
                          servicesOpen
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                        }`}
                    >
                      {services.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => handleNavigate("services")}
                          className="w-full text-left px-5 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                        >
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                            {s.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </li>
                );
              }

              return (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavigate(link.id)}
                    className={`text-sm font-medium transition ${
                      currentPage === link.id
                        ? "text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-400"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* THEME TOGGLE */}
          <button
            onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="
            md:hidden
            p-2
            rounded-full
            text-gray-800 dark:text-gray-100
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition-all duration-200
            active:scale-95
          "
          aria-label="Open menu"
        >
          <Menu size={22} strokeWidth={1.75} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && !isCollapsed && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            className="
              absolute top-full left-0 right-0
              bg-white dark:bg-gray-900
              shadow-xl
              max-h-[75vh]
              overflow-y-auto
              animate-dropdown
            "
          >
            <nav className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigate(link.id)}
                  className="
                    group
                    w-full text-left
                    py-3
                    text-base font-medium
                    text-gray-800 dark:text-gray-100
                    transition-all duration-200
                    hover:text-blue-400
                    active:opacity-70
                  "
                >
                  <span className="relative inline-block">
                    {link.label}
                    <span
                      className="
                        absolute left-0 -bottom-1
                        h-[1px] w-0
                        bg-blue-300
                        transition-all duration-300
                        group-hover:w-full
                      "
                    />
                  </span>
                </button>
              ))}
            </nav>
            <div className="h-px bg-gray-200 dark:bg-gray-700 mx-6" />
            <div className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Crafted furniture & interior solutions<br />
              Designed for timeless living
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
