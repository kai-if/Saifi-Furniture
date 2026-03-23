import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Globe } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const LuxuryBusinessCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Swipe gesture tracking
  const [touchStartX, setTouchStartX] = useState(null);

  // Tilt transforms
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleMouseMove(event) {
    if (isFlipped) return; 
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Mobile Swipe Handler
  function handleTouchStart(e) {
    if (e.targetTouches && e.targetTouches[0]) {
      setTouchStartX(e.targetTouches[0].clientX);
    }
  }

  function handleTouchEnd(e) {
    if (touchStartX === null || !e.changedTouches || !e.changedTouches[0]) return;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX - touchEndX;

    if (Math.abs(distance) > 50) { 
      // Swipe threshold met
      setIsFlipped(!isFlipped);
    } else {
      // Small distance = Tap
      setIsFlipped(!isFlipped);
    }
    setTouchStartX(null);
  }

  // Gyroscope tilt on Mobile (Device Orientation)
  useEffect(() => {
    let isMounted = true;

    function handleOrientation(e) {
      if (!isMounted || isFlipped) return;

      const { gamma, beta } = e;
      if (gamma !== null && beta !== null) {
        // Gamma left/right tilt [-90, 90] -> comfort range ~[-30, 30]
        const clampedGamma = Math.max(-30, Math.min(30, gamma));
        // Beta front/back tilt [-180, 180] -> resting desktop angle ~45deg
        const clampedBeta = Math.max(-30, Math.min(30, beta - 45)); 

        x.set(clampedGamma * 3.33); // map 30 to 100
        y.set(clampedBeta * 3.33);
      }
    }

    // Request iOS orientation permission safely inside gesture context if needed
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().catch(() => {
        // quiet fail on desktop or pre-gesture cancels
      });
    }

    window.addEventListener("deviceorientation", handleOrientation);
    
    return () => {
      isMounted = false;
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [isFlipped, x, y]);

  return (
    <div 
      className="perspective-1000 flex items-center justify-center p-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => {
        // Trigger for desktops only to avoid duplicate trigger with touchEnd on mobile
        if (window.innerWidth > 768) setIsFlipped(!isFlipped);
      }}
    >
      {/* Tilt Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-md h-64 cursor-pointer"
      >
        {/* Flip Container */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full h-full"
        >
          {/* FRONT FACE */}
          <div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-900 via-stone-800 to-zinc-950 border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-sm [backface-visibility:hidden] flex flex-col justify-between p-6"
            style={{ transform: "translateZ(0px)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent hover:via-white/20 transition-all duration-300 pointer-events-none" />

            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full border border-amber-400/20" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full border border-amber-400/10" />

            {/* Living Room Scene Art */}
            <svg 
              className="absolute -right-4 bottom-2 w-44 h-44 text-amber-500/10 pointer-events-none select-none mix-blend-screen" 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
            >
              <path d="M 5 75 L 95 75" strokeWidth="0.3" strokeDasharray="1 1" />
              <path d="M 12 75 L 12 35 C 12 15 35 15 38 22" />
              <path d="M 34 22 L 42 22 L 38 27 Z" fill="rgba(212,175,55,0.05)" />
              <path d="M 18 68 L 18 75 M 62 68 L 62 75" strokeWidth="0.7" />
              <path d="M 15 55 L 20 55 L 20 68 L 15 68 Z" fill="rgba(212,175,55,0.02)" />
              <path d="M 20 58 L 60 58 L 60 68 L 20 68 Z" />
              <path d="M 40 58 L 40 68" strokeDasharray="1 1" />
              <path d="M 60 55 L 65 55 L 65 68 L 60 68 Z" fill="rgba(212,175,55,0.02)" />
              <path d="M 20 40 C 20 40 38 35 40 35 C 42 35 60 40 60 40 L 60 58 L 20 58 Z" />
              <path d="M 68 62 L 92 62 L 92 64 L 68 64 Z" fill="rgba(212,175,55,0.04)" />
              <path d="M 73 64 L 73 75 M 87 64 L 87 75" />
              <path d="M 78 52 L 82 62 L 78 62 Z" />
              <path d="M 80 52 L 80 44" />
              <path d="M 80 47 C 76 43 76 38 80 35 C 84 38 84 43 80 47" fill="rgba(212,175,55,0.1)" />
            </svg>

            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent tracking-wider">
                  SAIFI
                </h2>
                <p className="text-xs text-amber-100/70 font-semibold tracking-widest uppercase">
                  Furniture
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-400/30">
                <span className="text-amber-300 font-bold text-lg">S</span>
              </div>
            </div>

            <div className="my-2">
              <p className="text-sm italic text-gray-400">
                A trusted name for wooden furniture
              </p>
            </div>

            <div className="mt-auto">
              <p className="text-xs text-amber-200/50 tracking-wider">Swipe or Tap to see details →</p>
            </div>

            <div className="absolute bottom-6 right-6 flex gap-3">
              <span className="text-amber-400/70 text-xs">Digital Card</span>
            </div>
          </div>

          {/* BACK FACE */}
          <div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-stone-900 border border-amber-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-sm [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between p-6"
          >
            <div className="flex justify-between items-center border-b border-amber-500/10 pb-3">
              <h3 className="font-serif font-bold text-amber-100 text-lg">Contact Desk</h3>
              <span className="text-xs text-amber-400/80 font-semibold font-serif">FAIZ SAIFI</span>
            </div>

            <div className="space-y-3 my-4">
              <div className="flex items-center gap-3 text-gray-200 text-sm hover:text-amber-300 transition-colors" onClick={(e) => e.stopPropagation()}>
                <Phone size={14} className="text-amber-400" />
                <a href="tel:+918077441194" className="font-medium">+91 8077441194</a>
              </div>
              <div className="flex items-center gap-3 text-gray-200 text-sm hover:text-amber-300 transition-colors" onClick={(e) => e.stopPropagation()}>
                <Mail size={14} className="text-amber-400" />
                <a href="mailto:Saifi.furn@gmail.com" className="font-medium">Saifi.furn@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-gray-200 text-sm">
                <MapPin size={14} className="text-amber-400" />
                <span className="font-medium">Mangal Parao, Haldwani, UK</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-auto border-t border-amber-500/10 pt-3">
              <div className="flex gap-4">
                <a href="https://wa.me/918077441194" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-white transition" onClick={(e) => e.stopPropagation()}>
                  <FaWhatsapp size={18} />
                </a>
                <a href="https://instagram.com/saififurnitures" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-white transition" onClick={(e) => e.stopPropagation()}>
                  <Instagram size={18} />
                </a>
                <a href="#" className="text-amber-400 hover:text-white transition" onClick={(e) => e.stopPropagation()}>
                  <Globe size={18} />
                </a>
              </div>
              <p className="text-amber-200/40 text-[10px] tracking-widest cursor-pointer">SWIPE BACK</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LuxuryBusinessCard;
