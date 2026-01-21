import React, { useState } from "react";
import { Send } from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwPPP72wABOChyBmpR-scy1RWzt-kec10y5iRrHtNplPTfZm7njq8xk9H6p9Ml8JHF6/exec";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // ✅ IMPORTANT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "newsletter",
        }),
      });

      alert("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      alert("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-sky-950 to-sky-900 py-24 px-6 text-white">
      <div className="container mx-auto text-center max-w-2xl">
        <h2 className="text-4xl font-serif font-bold mb-4">
          Stay Inspired
        </h2>
        <p className="text-lg text-sky-100 mb-10">
          Subscribe to our newsletter for design tips, exclusive offers, and new arrivals
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-96 px-5 py-4 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-white text-sky-900 font-semibold hover:bg-sky-100 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Subscribe"}
            <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
