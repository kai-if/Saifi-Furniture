import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ===============================
   CONFIG — LUXURY MOTION
================================ */
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const FADE_DURATION = 480; // ms (luxury feel)
const FADE_EASING = "cubic-bezier(0.4, 0.0, 0.2, 1)";

export default function Lightbox({ images = [], startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [isFading, setIsFading] = useState(false);

  const imgRef = useRef(null);
  const pinchStartDist = useRef(0);
  const pinchStartScale = useRef(1);

  /* ===============================
     INIT / CLEANUP
  ================================ */
  useEffect(() => {
    setIndex(startIndex);
    setScale(1);
    setOrigin({ x: 50, y: 50 });
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [startIndex]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!images.length) return null;

  /* ===============================
     HELPERS
  ================================ */
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  const updateOriginFromEvent = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  };

  /* ===============================
     IMAGE CHANGE (LUXURY FADE)
  ================================ */
  const changeImage = (newIndex) => {
    if (isFading) return;

    setIsFading(true);

    setTimeout(() => {
      setScale(1);
      setOrigin({ x: 50, y: 50 });
      setIndex(newIndex);

      // allow fade-in after swap
      requestAnimationFrame(() => {
        setIsFading(false);
      });
    }, FADE_DURATION);
  };

  const prev = () =>
    changeImage((index - 1 + images.length) % images.length);

  const next = () =>
    changeImage((index + 1) % images.length);

  const current = images[index];
  const src = current.src || current.img;
  const alt = current.alt || current.name || "";

  /* ===============================
     ZOOM HANDLERS
  ================================ */

  // Mouse wheel zoom (desktop)
  const handleWheel = (e) => {
    e.preventDefault();
    updateOriginFromEvent(e);
    setScale((s) =>
      clamp(s + (e.deltaY < 0 ? 0.25 : -0.25), MIN_ZOOM, MAX_ZOOM)
    );
  };

  // Double click zoom
  const handleDoubleClick = (e) => {
    updateOriginFromEvent(e);
    setScale((s) => (s === 1 ? 2 : 1));
  };

  // Pinch zoom (mobile)
  const distance = (t1, t2) =>
    Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      pinchStartDist.current = distance(e.touches[0], e.touches[1]);
      pinchStartScale.current = scale;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const newDist = distance(e.touches[0], e.touches[1]);
      setScale(
        clamp(
          pinchStartScale.current *
            (newDist / pinchStartDist.current),
          MIN_ZOOM,
          MAX_ZOOM
        )
      );
    }
  };

  /* ===============================
     PORTAL CONTENT
  ================================ */
  const content = (
    <div
      className="
        fixed inset-0 z-[100000]
        bg-black
        flex items-center justify-center
      "
      role="dialog"
      aria-modal="true"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:opacity-80 transition"
        aria-label="Close image"
      >
        <X size={36} />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:opacity-80 transition"
          aria-label="Previous image"
        >
          <ChevronLeft size={56} />
        </button>
      )}

      {/* IMAGE */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        onDoubleClick={handleDoubleClick}
        className="
          max-w-[95vw]
          max-h-[95vh]
          object-contain
          select-none
          will-change-transform will-change-opacity
        "
        style={{
          opacity: isFading ? 0 : 1,
          transform: `scale(${scale * (isFading ? 0.985 : 1)})`,
          transformOrigin: `${origin.x}% ${origin.y}%`,
          transition: `
            opacity ${FADE_DURATION}ms ${FADE_EASING},
            transform ${FADE_DURATION}ms ${FADE_EASING}
          `
        }}
      />

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:opacity-80 transition"
          aria-label="Next image"
        >
          <ChevronRight size={56} />
        </button>
      )}

      {/* Caption */}
      {current.caption && (
        <div className="absolute bottom-6 text-gray-200 text-sm text-center px-6">
          {current.caption}
        </div>
      )}
    </div>
  );

  return createPortal(content, document.body);
}
