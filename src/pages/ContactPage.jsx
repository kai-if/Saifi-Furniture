import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { sendEmail } from "../lib/services/emailService";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

const handleSubmit = (e) => {
    e.preventDefault();

    sendEmail(formData)
      .then(() => {
        alert("Message sent!");
        setFormData({ name: "", email: "", phone: "", message: "" }); // reset form
      })
      .catch((ex) => {
        alert("Failed to send message.", ex);
      });
  };

  return (
    <div className="pt-32 pb-24 px-6 animate-fadeInUp">
      <div className="container mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-sky-900 mb-4">
            Let’s Create Something Timeless
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Visit our showroom or get in touch for bespoke furniture crafted
            with precision, elegance, and enduring quality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* CONTACT FORM */}
          <div
            className="bg-white rounded-2xl shadow-lg p-10 animate-fadeInUp"
            style={{ animationDelay: "120ms" }}
          >
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-8">
              Request a Private Consultation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Your Name *"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className=" w-full px-4 py-3 
                 text-black dark:text-white 
                 placeholder:text-gray-500 dark:placeholder:text-white/60 
                 border border-gray-300 dark:border-gray-600 
                 rounded-md 
                 focus:outline-none focus:ring-2 focus:ring-sky-800 
                 transition"
              />

              <input
                type="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className=" w-full px-4 py-3 
                 text-black dark:text-white 
                 placeholder:text-gray-500 dark:placeholder:text-white/60 
                 border border-gray-300 dark:border-gray-600 
                 rounded-md 
                 focus:outline-none focus:ring-2 focus:ring-sky-800 
                 transition"
              />

              <input
                type="tel"
                placeholder="Phone Number *"
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                className=" w-full px-4 py-3 
                 text-black dark:text-white 
                 placeholder:text-gray-500 dark:placeholder:text-white/60 
                 border border-gray-300 dark:border-gray-600 
                 rounded-md 
                 focus:outline-none focus:ring-2 focus:ring-sky-800 
                 transition"
              />

              <textarea
                rows="5"
                placeholder="Tell us about your project *"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className=" w-full px-4 py-3 
                 text-black dark:text-white 
                 placeholder:text-gray-500 dark:placeholder:text-white/60 
                 border border-gray-300 dark:border-gray-600 
                 rounded-md 
                 focus:outline-none focus:ring-2 focus:ring-sky-800 
                 transition"
              />

              <button
                type="submit"
                className="w-full bg-sky-900 text-white py-4 rounded-md text-lg hover:bg-sky-800 hover:shadow-xl transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-12">

            <div
              className="animate-fadeInUp"
              style={{ animationDelay: "240ms" }}
            >
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                Visit or Reach Us
              </h2>

              <div className="space-y-8 text-gray-700">

                {/* ADDRESS */}
                <div className="flex gap-4">
                  <MapPin className="text-sky-900 mt-1" size={26} />
                  <div>
                    <h3 className="font-semibold text-lg">Showroom</h3>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Saifi+Furniture+Mangal+Parao+Haldwani"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sky-900 transition"
                    >
                      Mangal Parao,<br />
                      Haldwani, Uttarakhand – 263139
                    </a>
                  </div>
                </div>

                {/* PHONE */}
                <div className="flex gap-4">
                  <Phone className="text-sky-900 mt-1" size={26} />
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <a
                      href="tel:+918077441194"
                      className="hover:text-sky-900 transition block"
                    >
                      +91 8077441194
                    </a>
                    <a
                      href="https://wa.me/918077441194"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-green-600 transition"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex gap-4">
                  <Mail className="text-sky-900 mt-1" size={26} />
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <a
                      href="mailto:Saifi.furn@gmail.com"
                      className="hover:text-sky-900 transition block"
                    >
                      Saifi.furn@gmail.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* BUSINESS HOURS */}
            <div
              className="bg-sky-50 rounded-2xl p-8 hover:shadow-lg transition-all animate-fadeInUp"
              style={{ animationDelay: "360ms" }}
            >
              <h3 className="font-serif font-bold text-xl text-sky-900 mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="flex justify-between">
                  <span>Sunday – Friday</span>
                  <span className="font-medium">9:00 AM – 8:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">Closed</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* MAP SECTION */}
        <div className="mt-24 animate-fadeInUp">
          <h2 className="text-3xl font-serif font-bold text-sky-900 mb-4 text-center">
            Visit Our Showroom
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Experience our craftsmanship in person. Explore materials,
            finishes, and custom designs at our showroom.
          </p>

          <div className="relative overflow-hidden rounded-2xl shadow-xl border border-sky-100 max-w-5xl mx-auto">
            <iframe
              title="Saifi Furniture Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1773559.0693323815!2d77.4716000006991!3d29.749217987665407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a09b003231a4b3%3A0x665d0360fde5664e!2sSaifi%20Furnitures!5e0!3m2!1sen!2sin!4v1771345949124!5m2!1sen!2sin"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.3] hover:grayscale-0 transition duration-500"
            />
          </div>

          <div className="text-center mt-4">
            <a
              href="https://www.google.com/maps?q=Saifi+Furniture+Mangal+Parao+Haldwani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-900 font-medium hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
