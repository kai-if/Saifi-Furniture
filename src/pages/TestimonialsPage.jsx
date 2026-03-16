import React, { useState, useEffect } from "react";
import { Star, ChevronDown, Upload, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from "lucide-react";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

const TestimonialsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [userReviews, setUserReviews] = useState([]);

  const [form, setForm] = useState({
    name: "",
    role: "",
    text: "",
    rating: 0,
    images: []
  });

  const [imagePreviews, setImagePreviews] = useState([]); // ✅ PREVIEW STATE
  const [errors, setErrors] = useState({});
  const [activeLightbox, setActiveLightbox] = useState(null); // Lightbox State

  const testimonials = [
    { name: "Richa", role: "Interior Designer", text: "Saifi Furniture transformed our entire home with their exceptional craftsmanship.", rating: 5 },
    { name: "Michael", role: "Homeowner", text: "From consultation to delivery, the experience was flawless.", rating: 5 },
    { name: "Sarah", role: "Restaurant Owner", text: "We furnished our entire restaurant with Saifi Furniture pieces.", rating: 5 }
  ];

  /* ---------------- PARSE DRIVE URLs ---------------- */
  const parseGoogleDriveImage = (url) => {
    if (!url) return url;
    if (url.includes("drive.google.com/file/d/")) {
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        // Use Google's content delivery network for direct image embedding
        return `https://lh3.googleusercontent.com/d/${match[1]}=s1000?authuser=0`;
      }
    }
    return url;
  };

  /* ---------------- LOAD REVIEWS ---------------- */
  useEffect(() => {
    fetch(GOOGLE_SCRIPT_URL)
      .then(res => res.json())
      .then(data => {
        const parsedData = data.map(review => ({
          ...review,
          images: review.images ? review.images.map(parseGoogleDriveImage) : []
        }));
        setUserReviews(parsedData.reverse());
      })
      .catch(() => { });
  }, []);

  const allTestimonials = [...userReviews, ...testimonials];

  const next = () => {
    setDirection("next");
    setCurrentIndex(i => (i + 1) % allTestimonials.length);
  };

  const prev = () => {
    setDirection("prev");
    setCurrentIndex(i => (i - 1 + allTestimonials.length) % allTestimonials.length);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.text.trim()) newErrors.text = "Review is required";
    if (form.rating === 0) newErrors.rating = "Please select a star rating";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- IMAGE → BASE64 ---------------- */
  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () =>
        resolve({
          base64: reader.result.split(",")[1],
          name: file.name,
          type: file.type
        });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  /* ---------------- SUBMIT REVIEW ---------------- */
  const submitReview = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const imagePayload = await Promise.all(
      form.images.map(file => toBase64(file))
    );

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        role: form.role,
        review: form.text,
        rating: form.rating,
        images: imagePayload
      })
    });

    // reload reviews
    fetch(GOOGLE_SCRIPT_URL)
      .then(res => res.json())
      .then(data => setUserReviews(data.reverse()));

    // reset
    setForm({ name: "", role: "", text: "", rating: 0, images: [] });
    setImagePreviews([]);
    setErrors({});
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="text-center mb-20 animate-fadeInUp">
          <h1 className="text-5xl font-serif font-bold text-sky-900 dark:text-sky-900 mb-4">
            Client Testimonials
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-500">
            Experiences shared by clients who trust Saifi Furniture
          </p>
        </div>

        {/* CAROUSEL */}
        <div className="relative bg-white rounded-xl shadow-xl p-12 mb-20 overflow-hidden">
          <div
            key={currentIndex}
            className={`transition-all duration-500 ${direction === "next" ? "animate-slideLeft" : "animate-slideRight"
              }`}
          >
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map(r => (
                <Star
                  key={r}
                  size={24}
                  className={r <= allTestimonials[currentIndex].rating
                    ? "text-amber-500 fill-amber-500"
                    : "text-amber-500 fill-white"}
                />
              ))}
            </div>

            <p className="text-xl text-gray-700 italic mb-6">
              “{allTestimonials[currentIndex].text}”
            </p>

            <h3 className="text-2xl font-serif font-bold text-sky-900">
              {allTestimonials[currentIndex].name}
            </h3>
            <p className="text-gray-600">{allTestimonials[currentIndex].role}</p>
          </div>

          <div className="flex justify-center gap-6 mt-10">
            <button onClick={prev} className="p-2 rounded-full bg-sky-900 text-white">
              <ChevronDown className="rotate-90" />
            </button>
            <button onClick={next} className="p-2 rounded-full bg-sky-900 text-white">
              <ChevronDown className="-rotate-90" />
            </button>
          </div>
        </div>

        {/* REVIEW FORM */}
        <div className="bg-white rounded-xl shadow-lg p-10 mb-20">
          <h2 className="text-3xl font-serif font-bold text-sky-900 mb-6">
            Share Your Experience
          </h2>

          <form onSubmit={submitReview} className="grid gap-5">
            <input
              type="text"
              placeholder="Your Name *"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className=" w-full px-4 py-3 
                 text-black dark:text-white 
                 bg-white dark:bg-gray-700
                 placeholder:text-gray-500 dark:placeholder-gray-400 
                 border border-gray-300 dark:border-gray-600 
                 rounded-md 
                 focus:outline-none focus:ring-2 focus:ring-sky-800 dark:focus:ring-sky-500
                 transition"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <input
              type="text"
              placeholder="Role (optional)"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              className=" w-full px-4 py-3 
                 text-black dark:text-white
                 bg-white dark:bg-gray-700
                 placeholder:text-gray-500 dark:placeholder-gray-400 
                 border border-gray-300 dark:border-gray-600 
                 rounded-md 
                 focus:outline-none focus:ring-2 focus:ring-sky-800 dark:focus:ring-sky-500
                 transition"
            />

            <textarea
              rows="4"
              placeholder="Your Review *"
              value={form.text}
              onChange={e => setForm({ ...form, text: e.target.value })}
              className=" w-full px-4 py-3 
                 text-black dark:text-white 
                 bg-white dark:bg-gray-700
                 placeholder:text-gray-500 dark:placeholder-gray-400 
                 border border-gray-300 dark:border-gray-600 
                 rounded-md 
                 focus:outline-none focus:ring-2 focus:ring-sky-800 dark:focus:ring-sky-500
                 transition"
            />
            {errors.text && <p className="text-red-500 text-sm">{errors.text}</p>}

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(r => (
                <Star
                  key={r}
                  size={22}
                  className={`cursor-pointer ${r <= form.rating ? "text-amber-500 fill-amber-500" : "text-amber-500 fill-white"
                    }`}
                  onClick={() => setForm({ ...form, rating: r })}
                />
              ))}
            </div>
            {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}

            {/* IMAGE UPLOAD */}
            <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
              <Upload size={18} />
              Upload Images (optional)
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setForm({ ...form, images: files });
                  setImagePreviews(files.map(f => URL.createObjectURL(f)));
                }}
              />
            </label>

            {/* IMAGE PREVIEW */}
            {imagePreviews.length > 0 && (
              <div className="flex gap-3 flex-wrap mt-4">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                ))}
              </div>
            )}

            <button type="submit" className="bg-sky-900 text-white px-6 py-3 rounded-md">
              Submit Review
            </button>
          </form>
        </div>

        {/* REVIEW GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          {allTestimonials.map((t, idx) => (
            <ReviewCard 
              key={idx} 
              review={t} 
              onImageClick={(index) => setActiveLightbox({ images: t.images, index })}
            />
          ))}
        </div>

      </div>

      {activeLightbox && (
        <Lightbox 
          images={activeLightbox.images}
          currentIndex={activeLightbox.index}
          setCurrentIndex={(indexUpdater) => {
            setActiveLightbox(prev => ({
              ...prev,
              index: typeof indexUpdater === 'function' ? indexUpdater(prev.index) : indexUpdater
            }))
          }}
          onClose={() => setActiveLightbox(null)}
        />
      )}
    </div>
  );
};

/* ---------------- LIGHTBOX COMPONENT ---------------- */
const Lightbox = ({ images, currentIndex, setCurrentIndex, onClose }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setScale(1); 
  }, [currentIndex]);

  const handleZoomIn = (e) => { e.stopPropagation(); setScale(s => Math.min(s + 0.5, 3)); };
  const handleZoomOut = (e) => { e.stopPropagation(); setScale(s => Math.max(s - 0.5, 1)); };
  const handleDoubleClick = (e) => { e.stopPropagation(); setScale(s => s > 1 ? 1 : 2.5); };

  const next = (e) => { e.stopPropagation(); setCurrentIndex(i => (i + 1) % images.length); };
  const prev = (e) => { e.stopPropagation(); setCurrentIndex(i => (i - 1 + images.length) % images.length); };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="absolute top-6 right-6 flex gap-4 z-50">
        <button onClick={handleZoomIn} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"><ZoomIn size={22} /></button>
        <button onClick={handleZoomOut} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"><ZoomOut size={22} /></button>
        <button onClick={onClose} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"><X size={22} /></button>
      </div>
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 p-3.5 bg-white/10 hover:bg-white/20 rounded-full text-white z-50"><ChevronLeft size={28} /></button>
          <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 p-3.5 bg-white/10 hover:bg-white/20 rounded-full text-white z-50"><ChevronRight size={28} /></button>
        </>
      )}
      <div className="max-w-[85vw] max-h-[85vh] flex items-center justify-center overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div 
          style={{ transform: `scale(${scale})` }} 
          className={`transition-transform duration-300 ease-out flex items-center justify-center ${scale > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onDoubleClick={handleDoubleClick}
        >
          <img src={images[currentIndex]} alt="Full screen" className="max-w-full max-h-[85vh] object-contain select-none" draggable="false" />
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({ review, onImageClick }) => {
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <StarRow rating={review.rating} />
      <p className="italic text-gray-700 mb-4">“{review.text}”</p>

      {review.images && review.images.length > 0 && (
        <div className="relative overflow-hidden rounded-md cursor-pointer" onClick={() => onImageClick(imgIdx)}>
          <img
            src={review.images[imgIdx]}
            alt="review"
            className="w-full h-56 object-cover hover:scale-105 transition-all duration-500"
          />
          {review.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setImgIdx(i => (i - 1 + review.images.length) % review.images.length); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full hover:bg-white transition"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setImgIdx(i => (i + 1) % review.images.length); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full hover:bg-white transition"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>
      )}

      <h4 className="font-semibold mt-4">{review.name}</h4>
      <p className="text-sm text-gray-600">{review.role}</p>
    </div>
  );
};

const StarRow = ({ rating }) => (
  <div className="flex mb-2">
    {[1, 2, 3, 4, 5].map(r => (
      <Star
        key={r}
        size={16}
        className={r <= rating ? "text-amber-500 fill-amber-500" : "text-amber-500 fill-white"}
      />
    ))}
  </div>
);

export default TestimonialsPage;
