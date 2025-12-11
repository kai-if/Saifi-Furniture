import React, { useState } from "react";
import { Send } from "lucide-react";
import { isValidEmail } from "../../utils/validators";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && isValidEmail(email)) {
      alert("Thank you for subscribing!");
      setEmail("");
    } else {
      alert("Please enter a valid email.");
    }
  };

  return (
    <section className="bg-amber-900 text-white py-16 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-serif font-bold mb-4">Stay Inspired</h2>
        <p className="text-xl mb-8">Subscribe to our newsletter for design tips, exclusive offers, and new arrivals</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-6 py-4 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500" required />
          <button type="submit" className="bg-white text-amber-900 px-8 py-4 rounded-md font-semibold hover:bg-amber-50 transition-colors duration-300 flex items-center justify-center space-x-2">
            <span>Subscribe</span>
            <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
