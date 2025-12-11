import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const Lightbox = ({ images = [], startIndex = 0, onClose }) => {
  const [index, setIndex] = useState(startIndex || 0);
  const overlayRef = useRef(null);
  useLockBodyScroll(true);

  useEffect(() => setIndex(startIndex || 0), [startIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images]);

  if (!images || images.length === 0) return null;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      aria-modal="true"
      role="dialog"
    >
      <div className="relative max-w-4xl w-full">
        <button onClick={onClose} className="absolute top-3 right-3 bg-white/90 rounded-full p-2 z-10 hover:bg-white">
          <X />
        </button>

        <div className="flex items-center justify-center">
          <button onClick={prev} aria-label="Previous image" className="p-3 bg-white/90 rounded-full mr-3 hover:bg-white">‹</button>

          <figure className="max-h-[80vh] w-full flex items-center justify-center">
            <img src={images[index].src} alt={images[index].alt || `Image ${index + 1}`} className="max-h-[80vh] object-contain w-full" />
          </figure>

          <button onClick={next} aria-label="Next image" className="p-3 bg-white/90 rounded-full ml-3 hover:bg-white">›</button>
        </div>

        {images[index].caption && <div className="mt-4 text-center text-white">{images[index].caption}</div>}

        <div className="flex items-center justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`} aria-label={`Go to image ${i + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
