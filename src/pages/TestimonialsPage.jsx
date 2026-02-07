import React, { useState } from "react";
import { Star, ChevronDown, Upload, ChevronLeft, ChevronRight } from "lucide-react";

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

  const [errors, setErrors] = useState({});

  const testimonials = [
    { name: "Richa", role: "Interior Designer", text: "Saifi Furniture transformed our entire home with their exceptional craftsmanship.", rating: 5 },
    { name: "Michael", role: "Homeowner", text: "From consultation to delivery, the experience was flawless.", rating: 5 },
    { name: "Sarah", role: "Restaurant Owner", text: "We furnished our entire restaurant with Saifi Furniture pieces.", rating: 5 }
  ];

  const allTestimonials = [...userReviews, ...testimonials];

  const next = () => {
    setDirection("next");
    setCurrentIndex((i) => (i + 1) % allTestimonials.length);
  };

  const prev = () => {
    setDirection("prev");
    setCurrentIndex((i) => (i - 1 + allTestimonials.length) % allTestimonials.length);
  };

const validate = () => {
  const newErrors = {};

  if (!form.name.trim()) newErrors.name = "Name is required";
  if (!form.text.trim()) newErrors.text = "Review is required";
  if (form.rating === 0) newErrors.rating = "Please select a star rating";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const submitReview = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setUserReviews([
      {
        ...form,
        rating: Number(form.rating)
      },
      ...userReviews
    ]);

    setForm({
      name: "",
      role: "",
      text: "",
      rating: 0,
      images: []
    });

    setErrors({});
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="text-center mb-20 animate-fadeInUp">
          <h1 className="text-5xl font-serif font-bold text-sky-900 mb-4">
            Client Testimonials
          </h1>
          <p className="text-xl text-gray-600">
            Experiences shared by clients who trust Saifi Furniture
          </p>
        </div>

        {/* CAROUSEL */}
        <div className="relative bg-white rounded-xl shadow-xl p-12 mb-20 overflow-hidden">
          <div
            key={currentIndex}
            className={`transition-all duration-500 ${
              direction === "next" ? "animate-slideLeft" : "animate-slideRight"
            }`}
          >
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((r) => (
                <Star
                  key={r}
                  size={24}
                  className={
                    r <= allTestimonials[currentIndex].rating
                      ? "text-amber-500 fill-amber-500"
                      : "text-amber-500 fill-white"
                  }
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
            <div>
              <input
                type="text"
                placeholder="Your Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className=" w-full px-4 py-3 
                 text-black dark:text-white 
                 placeholder:text-gray-500 dark:placeholder:text-white/60 
                 border border-gray-300 dark:border-gray-600 
                 rounded-md 
                 focus:outline-none focus:ring-2 focus:ring-sky-800 
                 transition"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <input
              type="text"
              placeholder="Role (optional)"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
                className=" w-full px-4 py-3 
                 text-black dark:text-white 
                 placeholder:text-gray-500 dark:placeholder:text-white/60 
                 border border-gray-300 dark:border-gray-600 
                 rounded-md 
                 focus:outline-none focus:ring-2 focus:ring-sky-800 
                 transition"
            />

            <div>
              <textarea
                placeholder="Your Review *"
                rows="4"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className=" w-full px-4 py-3 
                 text-black dark:text-white 
                 placeholder:text-gray-500 dark:placeholder:text-white/60 
                 border border-gray-300 dark:border-gray-600 
                 rounded-md 
                 focus:outline-none focus:ring-2 focus:ring-sky-800 
                 transition"
              />
              {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text}</p>}
            </div>

            {/* STAR INPUT */}
            <div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <Star
                    key={r}
                    size={22}
                    className={`cursor-pointer ${
                      r <= form.rating
                        ? "text-amber-500 fill-amber-500"
                        : "text-amber-500 fill-white"
                    }`}
                    onClick={() => setForm({ ...form, rating: r })}
                  />
                ))}
              </div>
              {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
            </div>

            {/* MULTI IMAGE UPLOAD */}
            <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
              <Upload size={18} />
              Upload Images (optional)
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) =>
                  setForm({
                    ...form,
                    images: Array.from(e.target.files).map((f) =>
                      URL.createObjectURL(f)
                    )
                  })
                }
              />
            </label>

            <button
              type="submit"
              className="bg-sky-900 text-white px-6 py-3 rounded-md hover:bg-sky-800 transition"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* REVIEW GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          {allTestimonials.map((t, idx) => (
            <ReviewCard key={idx} review={t} />
          ))}
        </div>

      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const [imgIdx, setImgIdx] = useState(0);
  if (!review.images || review.images.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <StarRow rating={review.rating} />
        <p className="italic text-gray-700 mb-4">“{review.text}”</p>
        <h4 className="font-semibold">{review.name}</h4>
        <p className="text-sm text-gray-600">{review.role}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <StarRow rating={review.rating} />
      <p className="italic text-gray-700 mb-4">“{review.text}”</p>

      <div className="relative overflow-hidden rounded-md">
        <img
          src={review.images[imgIdx]}
          alt="review"
          className="w-full h-56 object-cover transition-all duration-300"
        />
        {review.images.length > 1 && (
          <>
            <button
              onClick={() =>
                setImgIdx((i) => (i - 1 + review.images.length) % review.images.length)
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() =>
                setImgIdx((i) => (i + 1) % review.images.length)
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      <h4 className="font-semibold mt-4">{review.name}</h4>
      <p className="text-sm text-gray-600">{review.role}</p>
    </div>
  );
};

const StarRow = ({ rating }) => (
  <div className="flex mb-2">
    {[1, 2, 3, 4, 5].map((r) => (
      <Star
        key={r}
        size={16}
        className={
          r <= rating
            ? "text-amber-500 fill-amber-500"
            : "text-amber-500 fill-white"
        }
      />
    ))}
  </div>
);

export default TestimonialsPage;
