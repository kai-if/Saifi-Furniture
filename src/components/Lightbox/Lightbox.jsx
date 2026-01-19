import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ images = [], startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);

  // Lock scroll + sync index
  useEffect(() => {
    setIndex(startIndex);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [startIndex]);

  // Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  if (!images.length) return null;

  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () =>
    setIndex((i) => (i + 1) % images.length);

  const current = images[index];

  // SUPPORT BOTH HOME + GALLERY DATA SHAPES
  const src = current.src || current.img;
  const alt = current.alt || current.name || "";

  return (
    <div
      className="
        fixed inset-0 z-[10000]
        bg-black
        flex items-center justify-center
      "
      role="dialog"
      aria-modal="true"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:opacity-80"
        aria-label="Close image"
      >
        <X size={32} />
      </button>

      {/* Previous */}
      {images.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:opacity-80"
          aria-label="Previous image"
        >
          <ChevronLeft size={48} />
        </button>
      )}

      {/* IMAGE — TRUE FULLSCREEN, NEVER CROPPED */}
      <img
        src={src}
        alt={alt}
        className="
          max-w-full
          max-h-full
          object-contain
          select-none
        "
        draggable={false}
      />

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:opacity-80"
          aria-label="Next image"
        >
          <ChevronRight size={48} />
        </button>
      )}

      {/* Caption */}
      {current.caption && (
        <div className="absolute bottom-6 text-white text-sm text-center px-4">
          {current.caption}
        </div>
      )}
    </div>
  );
}
