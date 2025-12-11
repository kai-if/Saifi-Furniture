import React, { useState } from "react";
import { Star, ChevronDown } from "lucide-react";

const TestimonialsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    { name: "Richa", role: "Interior Designer", text: "Saifi Furniture transformed our entire home with their exceptional craftsmanship.", rating: 5 },
    { name: "Michael", role: "Homeowner", text: "From consultation to delivery, the experience was flawless.", rating: 5 },
    { name: "Sarah", role: "Restaurant Owner", text: "We furnished our entire restaurant with Saifi Furniture pieces.", rating: 5 },
    { name: "David", role: "Architect", text: "As an architect, I appreciate quality craftsmanship.", rating: 5 },
    { name: "Kushagra", role: "Business Executive", text: "The custom office furniture they designed for my home workspace is both elegant and functional.", rating: 5 },
    { name: "Robert", role: "Art Collector", text: "Saifi Furniture is investment-quality.", rating: 5 }
  ];

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl font-serif font-bold text-amber-900 mb-8 text-center animate-fadeInUp">What Our Clients Say</h1>
        <p className="text-center text-xl text-gray-600 mb-16 animate-fadeInUp">Real experiences from satisfied customers who trust Saifi Furniture</p>

        <div className="relative bg-white rounded-lg shadow-xl p-12 animate-fadeInUp">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => <Star key={i} className="text-amber-500" size={24} />)}
            </div>

            <p className="text-xl text-gray-700 italic mb-6 leading-relaxed">"{testimonials[currentIndex].text}"</p>

            <div className="mb-4">
              <h3 className="text-2xl font-serif font-bold text-amber-900">{testimonials[currentIndex].name}</h3>
              <p className="text-gray-600">{testimonials[currentIndex].role}</p>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <button onClick={prevTestimonial} className="bg-amber-900 text-white p-2 rounded-full hover:bg-amber-800 transition-colors duration-300"><ChevronDown className="rotate-90" size={24} /></button>

            <div className="flex space-x-2">
              {testimonials.map((_, idx) => <button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-amber-900 w-8" : "bg-gray-300"}`} />)}
            </div>

            <button onClick={nextTestimonial} className="bg-amber-900 text-white p-2 rounded-full hover:bg-amber-800 transition-colors duration-300"><ChevronDown className="-rotate-90" size={24} /></button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md animate-fadeInUp">
              <div className="flex mb-3">{[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="text-amber-500" size={16} />)}</div>
              <p className="text-gray-700 mb-4 text-sm italic">"{testimonial.text}"</p>
              <div>
                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
