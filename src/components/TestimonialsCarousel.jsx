import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Interior Designer",
    quote: "The craftsmanship and finish exceeded expectations. Truly premium work."
  },
  {
    name: "Neha Verma",
    role: "Home Owner",
    quote: "Saifi Furniture transformed our living space beautifully."
  },
  {
    name: "Amit Khanna",
    role: "Architect",
    quote: "Attention to detail and customisation is unmatched."
  }
];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <div className="max-w-3xl mx-auto text-center transition-all duration-700">
      <p className="text-xl md:text-2xl font-serif text-stone-900 italic mb-6">
        “{t.quote}”
      </p>
      <div className="text-stone-700 font-semibold">{t.name}</div>
      <div className="text-sm text-stone-500">{t.role}</div>
    </div>
  );
}
