import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Phone, ShieldCheck, X, Info, Maximize2, Download, Plus } from "lucide-react";
import { useQuote } from "../context/QuoteContext";

export default function CataloguePage() {
  const [activeItem, setActiveItem] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const { quoteItems, addItemToQuote, setIsDrawerOpen } = useQuote();

  useEffect(() => {
    const container = document.getElementById("snap-scroll-container");
    if (activeItem || zoomImage) {
      document.body.style.overflow = "hidden";
      if (container) container.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      if (container) container.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      if (container) container.style.overflow = "auto";
    };
  }, [activeItem, zoomImage]);

  // High-End Scenes mapped to background shots and discrete hotspot references
  const scenes = [
    {
      id: "living",
      title: "The Grand Living Lounge",
      bgImage: "/images/IMG_2905.JPG",
      subtitle: "Breathtaking spaces mapped with royal woods and velvet details",
      hotspots: [
        { id: "sofa1", x: "40%", y: "65%", name: "Modern Royal Sofa", material: "Grade-A Teak Wood", dimensions: "84\"W x 36\"D x 30\"H", colors: ["#C2B280", "#1E3B32", "#1A365D"], colorNames: "Velvet Beige, Teal, Royal Navy", warranty: "5 Years Frame Coverage", img: "/images/sofa.PNG" },
        { id: "swing", x: "75%", y: "40%", name: "L-Sofa Sectional", material: "Bespoke Oak Frames", dimensions: "120\"W x 60\"D x 34\"H", colors: ["#2C313B", "#7F1D1D"], colorNames: "Charcoal, Crimson", warranty: "3 Years Standard Warranty", img: "/images/sofa2.PNG" }
      ]
    },
    {
      id: "bedroom",
      title: "Bespoke Bedroom Sanctuary",
      bgImage: "/images/bed.JPG",
      subtitle: "Quiet luxury designed for peak relaxation and support.",
      hotspots: [
        { id: "bed1", x: "50%", y: "60%", name: "King Bed Frame Deluxe", material: "Solid Sheesham Wood", dimensions: "78\"L x 72\"W x 14\"H", colors: ["#B5845C", "#8B4513"], colorNames: "Natural Oak, Dark Walnut", warranty: "10 Years Termite Warranty", img: "/images/bed.JPG" },
        { id: "cupboard", x: "25%", y: "45%", name: "Royal Teak Wardrobe", material: "Plywood & Teak Finish", dimensions: "72\"W x 21\"D x 84\"H", colors: ["#b45309", "#78350f"], colorNames: "Amber Oak, Mahogany", warranty: "5 Years Anti-Warp Shield", img: "/images/cupboard.JPG" },
        { id: "dresser", x: "75%", y: "55%", name: "Designer Vanity Table", material: "Sheesham & Glass Mirror", dimensions: "36\"W x 18\"D x 72\"H", colors: ["#d97706", "#ffffff"], colorNames: "Honey Finish, Gloss White", warranty: "2 Years Structural Integrity", img: "/images/dressing.PNG" }
      ]
    },
    {
      id: "kitchen",
      title: "Modular Culinary Spaces",
      bgImage: "/images/kitchen1.JPG",
      subtitle: "Smart hardware blended with high-gloss bespoke panelings.",
      hotspots: [
        { id: "acrylic1", x: "35%", y: "50%", name: "Modular Acrylic Kitchen", material: "HDF & High Gloss Acrylic", dimensions: "Tailor Made Sizing", colors: ["#ffffff", "#262626", "#be123c"], colorNames: "Gloss White, Black, Crimson", warranty: "Lifetime Hardware Support", img: "/images/kitchen1.JPG" },
        { id: "led", x: "65%", y: "40%", name: "LED Multi-Tier Panel", material: "MDF Frame with Ambient LEDs", dimensions: "96\"W x 84\"H x 14\"D", colors: ["#262626", "#171717"], colorNames: "Charcoal Mesh, Slate", warranty: "1 Year Electronics Warranty", img: "/images/ledp.JPG" }
      ]
    }
  ];

  const downloadAsPDF = async () => {
    setIsDownloading(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: html2canvas } = await import("html2canvas");

      const pdf = new jsPDF("l", "mm", "a4"); // Landscape
      const imgWidth = 297;
      const pageHeight = 210;

      for (let i = 0; i < scenes.length; i++) {
        const scene = scenes[i];

        // 1. CAPTURE BACKGROUND SCENE
        const element = document.getElementById(`scene-${scene.id}`);
        if (element) {
          const noPdfElements = element.querySelectorAll(".no-pdf");
          noPdfElements.forEach(el => el.style.opacity = "0");

          const canvas = await html2canvas(element, { scale: window.innerWidth < 768 ? 1 : 1.2, useCORS: true, backgroundColor: "#000000" });
          noPdfElements.forEach(el => el.style.opacity = "");

          const imgData = canvas.toDataURL("image/jpeg", 0.9);
          const canvasAspect = canvas.width / canvas.height;
          let printWidth = imgWidth;
          let printHeight = imgWidth / canvasAspect;

          if (printHeight > pageHeight) {
            printHeight = pageHeight;
            printWidth = pageHeight * canvasAspect;
          }

          const xOffset = (imgWidth - printWidth) / 2;
          const yOffset = (pageHeight - printHeight) / 2;

          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, "JPEG", xOffset, yOffset, printWidth, printHeight);
        }

        // 2. CAPTURE SPEC SHEET GRID
        const specElement = document.getElementById(`pdf-specs-${scene.id}`);
        if (specElement) {
          const canvas = await html2canvas(specElement, { scale: window.innerWidth < 768 ? 1 : 1.2, useCORS: true, backgroundColor: "#0b0c10" });
          const imgData = canvas.toDataURL("image/jpeg", 0.9);

          const canvasAspect = canvas.width / canvas.height;
          let printWidth = imgWidth;
          let printHeight = imgWidth / canvasAspect;

          if (printHeight > pageHeight) {
            printHeight = pageHeight;
            printWidth = pageHeight * canvasAspect;
          }

          const xOffset = (imgWidth - printWidth) / 2;
          const yOffset = (pageHeight - printHeight) / 2;

          pdf.addPage();
          pdf.addImage(imgData, "JPEG", xOffset, yOffset, printWidth, printHeight);
        }
      }
      // Use Blob triggers for robust mobile file-saver compatibility
      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Saifi_Furniture_Exclusive_Catalogue.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 300); // Wait safely
    } catch (error) {
      console.error("PDF Download failed", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">


      {/* DOWNLOAD PDF TRIGGER Action */}
      <div className="fixed top-20 md:top-24 right-4 md:right-6 z-40 no-pdf">
        <button
          onClick={downloadAsPDF}
          disabled={isDownloading}
          title="Download Catalogue PDF"
          className="flex items-center justify-center bg-zinc-950/50 hover:bg-zinc-900 backdrop-blur-md border border-white/5 hover:border-amber-500/20 text-white/60 hover:text-amber-400 p-2.5 rounded-full transition-all duration-300 shadow-xl active:scale-95 disabled:opacity-50"
        >
          {isDownloading ? (
            <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent animate-spin rounded-full" />
          ) : (
            <Download size={14} />
          )}
        </button>
      </div>

      {/* VERTICAL NAV PROGRESS BAR */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6 items-center no-pdf">
        {scenes.map((scene, idx) => (
          <button key={scene.id} onClick={() => { setActiveSceneIndex(idx); document.getElementById("snap-scroll-container").scrollTo({ top: idx * window.innerHeight, behavior: "smooth" }); }} className="group relative flex items-center justify-center h-4 w-4">
            <div className={`h-2 rounded-full transition-all duration-300 ${activeSceneIndex === idx ? "w-4 bg-sky-900" : "w-2 bg-white/30 group-hover:bg-white/60"}`} />
            <span className="absolute left-6 text-[9px] font-bold tracking-widest uppercase text-white/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{scene.title.split(" ")[scene.title.split(" ").length - 1]}</span>
          </button>
        ))}
        <div className="absolute top-0 bottom-0 left-[7px] w-px bg-white/10 -z-10" />
      </div>

      {/* SNAP SCROLL CONTAINER */}
      <div id="snap-scroll-container" className={`h-screen snap-y snap-mandatory scroll-smooth ${activeItem ? "overflow-hidden" : "overflow-y-scroll"}`} onScroll={(e) => { const idx = Math.round(e.target.scrollTop / window.innerHeight); if (idx !== activeSceneIndex) setActiveSceneIndex(idx); }}>
        {scenes.map((scene) => (
          <div key={scene.id} id={`scene-${scene.id}`} className="h-screen w-screen snap-start relative flex items-center justify-center overflow-hidden">

            {/* Ambient slow floating bokeh particles */}
            <div className="absolute inset-0 z-10 pointer-events-none no-pdf">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div key={i} initial={{ y: "110%", x: `${Math.random() * 100}%`, opacity: 0, scale: Math.random() * 0.5 + 0.5 }} animate={{ y: "-10%", opacity: [0, 0.5, 0] }} transition={{ duration: Math.random() * 12 + 15, repeat: Infinity, delay: Math.random() * 8, ease: "linear" }} className="absolute w-2 h-2 bg-sky-900/30 rounded-full blur-[2px]" />
              ))}
            </div>

            {/* Background Image with Watermark */}
            <div className="absolute inset-0">
              <div
                style={{ backgroundImage: `url(${scene.bgImage})` }}
                className="absolute inset-0 bg-cover bg-center opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-transparent to-stone-950/80" />

              {/* TILED WATERMARK ACROSS THE WHOLE PAGE */}
              <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-y-32 gap-x-16 p-12 items-center justify-center overflow-hidden pointer-events-none z-10 opacity-[0.08]">
                {Array.from({ length: 12 }).map((_, i) => (
                  <p key={i} className="text-white font-serif text-xl md:text-2xl font-black tracking-widest uppercase transform -rotate-45 whitespace-nowrap">
                    Saifi Furniture
                  </p>
                ))}
              </div>

              {/* Precise Small Watermark Footer inside canvas capture */}
              <div className="absolute bottom-4 right-4 text-white/40 text-[9px] font-bold bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm select-none pointer-events-none z-20 font-serif tracking-wide border border-white/5">
                Saifi Furniture, Haldwani - 8077441194
              </div>
            </div>

            {/* Title Header */}
            <div className="absolute top-28 left-8 md:left-24 z-10 max-w-lg">
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-2 mb-2"><div className="h-0.5 w-6 bg-amber-500" /><span className="text-xs text-amber-500 font-semibold tracking-widest uppercase">Signature Concept</span></motion.div>
              <motion.h2 className="text-4xl md:text-5xl font-serif font-bold tracking-wide drop-shadow-lg mb-1">{scene.title}</motion.h2>
              <motion.p className="text-sm text-gray-300 font-light italic leading-relaxed">{scene.subtitle}</motion.p>
            </div>

            {/* Hotspots */}
            {scene.hotspots.map((hotspot) => (
              <div key={hotspot.id} className="absolute z-20 no-pdf" style={{ top: hotspot.y, left: hotspot.x }}>
                <button onClick={() => setActiveItem(hotspot)} className="group relative flex items-center justify-center p-2">
                  <span className={`animate-ping absolute inline-flex h-8 w-8 rounded-full bg-sky-900 opacity-75 ${activeItem?.id === hotspot.id ? "scale-125 opacity-100 bg-sky-800" : ""}`}></span>
                  <span className={`relative inline-flex rounded-full h-5 w-5 border-2 border-white items-center justify-center shadow-md transition-colors ${activeItem?.id === hotspot.id ? "bg-sky-800 scale-110" : "bg-sky-900"}`}><Info size={10} className="text-white" /></span>
                  <span className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[10px] font-bold tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">{hotspot.name}</span>
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* HIDDEN SPEC SHEET GRIDS (For PDF Generation ONLY) */}
      <div className="absolute -top-[9999px] left-0 pointer-events-none no-pdf">
        {scenes.map((scene) => (
          <div
            key={scene.id}
            id={`pdf-specs-${scene.id}`}
            className="w-[1123px] h-[794px] bg-[#090a0f] text-white p-12 relative flex flex-col justify-between overflow-hidden"
            style={{ width: "1123px", height: "794px" }} // Explicit pixel fit forces aspect-ratio accurately on scale 1.0 capture triggers
          >
            {/* TILED WATERMARK inside Spec page layout absolutely */}
            <div className="absolute inset-0 grid grid-cols-3 gap-24 p-16 items-center justify-center overflow-hidden pointer-events-none opacity-[0.04]">
              {Array.from({ length: 9 }).map((_, i) => (
                <p key={i} className="text-white font-serif text-3xl font-black tracking-widest uppercase transform -rotate-45 whitespace-nowrap">Saifi Furniture</p>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-6">
                <div>
                  <span className="text-xs text-amber-400 font-bold tracking-widest uppercase">Scene Overview</span>
                  <h2 className="text-3xl font-serif font-bold text-white mt-1">{scene.title}</h2>
                </div>
                <span className="text-7xl font-sans font-black text-white/5">SF</span>
              </div>

              <div className="grid grid-cols-2 gap-6 h-[550px] overflow-hidden">
                {scene.hotspots.map((item) => (
                  <div key={item.id} className="bg-zinc-900/40 rounded-xl p-4 border border-white/5 flex gap-4 h-full max-h-[260px]">
                    <div className="w-2/5 aspect-square bg-black/20 rounded-lg p-2 flex items-center justify-center relative border border-white/5">
                      <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="w-3/5 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-lg text-amber-300 mb-2 leading-snug">{item.name}</h4>
                        <div className="space-y-1.5 text-xs text-gray-400">
                          <p><span className="text-white font-medium">Material:</span> {item.material}</p>
                          <p><span className="text-white font-medium">Dimensions:</span> {item.dimensions}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-white font-medium">Finishes:</span>
                            <div className="flex gap-1">
                              {item.colors.map((c, i) => <div key={i} className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c }} />)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs mt-2 border-t border-white/5 pt-2">
                        <ShieldCheck size={14} /> {item.warranty}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-3 flex justify-between items-center text-gray-500 text-[10px] tracking-widest">
              <span>Saifi Furniture Luxury Collection 2026</span>
              <span>Contact: +91 8077441194</span>
            </div>
          </div>
        ))}
      </div>

      {/* FIXED FOOTER */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-60">
        <span className="text-[10px] tracking-widest uppercase text-amber-200">Scroll Down to Explore</span>
        <div className="w-1 h-3 rounded-full bg-amber-400 animate-bounce" />
      </div>

      {/* DETAIL DRAWER OVERLAY */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-screen w-full max-w-md bg-zinc-950/80 backdrop-blur-xl border-l border-white/10 z-50 p-6 md:p-8 flex flex-col justify-between"
          >
            <button onClick={(e) => { e.stopPropagation(); setActiveItem(null); }} className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/5 transition-all text-white z-[60]"><X size={20} /></button>
            <div>
              <div
                className="group relative h-44 rounded-xl overflow-hidden border border-white/5 mb-6 bg-black/40 p-2 cursor-zoom-in"
                onClick={() => setZoomImage(activeItem.img)}
              >
                <img src={activeItem.img} alt={activeItem.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={20} className="text-white bg-black/50 p-1.5 rounded-full" />
                </div>
                {/* WATERMARK */}
                <div className="absolute bottom-2 right-2 text-white/50 text-[7px] font-bold bg-black/50 px-1 py-0.5 rounded-md select-none pointer-events-none tracking-wider">
                  Saifi Furniture, Haldwani
                </div>
              </div>
              <div className="flex items-center gap-2 mb-1"><Sparkles size={14} className="text-sky-600" /><span className="text-[10px] font-bold tracking-wider text-sky-600 uppercase">Product Details</span></div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{activeItem.name}</h3>
              <div className="space-y-4 border-t border-white/5 pt-4">
                <div className="flex justify-between items-start text-xs border-b border-white/5 pb-2"><span className="text-gray-400">Core Material</span><span className="font-semibold text-gray-100">{activeItem.material}</span></div>
                <div className="flex justify-between items-start text-xs border-b border-white/5 pb-2"><span className="text-gray-400">Default Dimensions</span><span className="font-semibold text-gray-100 font-sans">{activeItem.dimensions}</span></div>
                <div className="border-b border-white/5 pb-2"><span className="text-xs text-gray-400">Available Finishes</span><div className="flex items-center gap-2 mt-2">{activeItem.colors.map((c, i) => (<div key={i} className="w-5 h-5 rounded-full border-2 border-white/10 shadow-sm" style={{ backgroundColor: c }} />))}<span className="text-[11px] text-gray-300 ml-1">{activeItem.colorNames}</span></div></div>
                <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold border-b border-white/5 pb-2"><ShieldCheck size={14} /> {activeItem.warranty}</div>
              </div>
            </div>
            <div className="mt-8 space-y-2">
              <button
                onClick={() => addItemToQuote({
                  id: activeItem.id,
                  title: activeItem.name,
                  category: "Catalogue",
                  image: activeItem.img
                })}
                className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-xl border border-white/5 transition-all duration-300 text-sm active:scale-95"
              >
                <Plus size={16} className={quoteItems.find(i => i.id === activeItem.id) ? "text-sky-600" : ""} />
                {quoteItems.find(i => i.id === activeItem.id) ? "In Quote List" : "Add to Quote"}
              </button>

              <a href={`https://wa.me/918077441194?text=Hi, I am viewing the Hotspot Catalogue and want to inquire about the ${activeItem.name}.`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-sky-900 to-zinc-900 border border-white/5 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-sky-800 transition-all duration-300 text-sm active:scale-95">
                <Phone size={16} /> Enquire About Price
              </a>

              <button onClick={() => setActiveItem(null)} className="w-full text-center mt-2 text-xs text-gray-500 hover:text-white transition-opacity">Close Selection</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN IMAGE ZOOM MODAL (Attention to Detail) */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setZoomImage(null)}
          >
            <button onClick={(e) => { e.stopPropagation(); setZoomImage(null); }} className="absolute top-4 right-4 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white z-[70]"><X size={22} /></button>
            <div className="relative max-w-full max-h-full">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                src={zoomImage}
                alt="Zoomed Product View"
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10"
              />
              {/* WATERMARK */}
              <div className="absolute bottom-4 right-4 text-white/60 text-[10px] font-bold bg-black/60 px-2.5 py-1 rounded-md mb-2 mr-2 select-none pointer-events-none backdrop-blur-sm border border-white/5 font-serif tracking-wide">
                Saifi Furniture, Haldwani - 8077441194
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
