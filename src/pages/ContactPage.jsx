import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { isValidEmail } from "../utils/validators";
//import { Mail } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !isValidEmail(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("Thank you for your message! We will get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-5xl font-serif font-bold text-sky-900 mb-12 text-center">Get In Touch</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input type="text" placeholder="Your Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900 ${errors.name ? "border-red-500" : "border-gray-300"} bg-black text-white`} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <input type="email" placeholder="Your Email *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900 ${errors.email ? "border-red-500" : "border-gray-300"} bg-black text-white`} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900 bg-black text-white" />
              </div>

              <div>
                <textarea placeholder="Your Message *" rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900 ${errors.message ? "border-red-500" : "border-gray-300"} bg-black text-white`}></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button type="submit" className="w-full bg-sky-900 text-white px-6 py-3 rounded-md hover:bg-sky-700 transition-colors duration-300">Send Message</button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-sky-900 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Visit Our Showroom</h3>
                  <p className="text-gray-600">Mangal Parao<br />Haldwani, Uttarakhand 263139</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="text-sky-900 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                  <p className="text-gray-600">+91 8077441194<br />Sun-Fri: 9AM - 8PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="text-sky-900 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                  <p className="text-gray-600">info@Saifi-Furniture.com<br />support@Saifi-Furniture.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-sky-50 p-6 rounded-lg">
              <h3 className="font-serif font-bold text-xl text-sky-900 mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-700">
                <p className="flex justify-between"><span>Sunday - Friday:</span> <span className="font-medium">9:00 AM - 8:00 PM</span></p>
                <p className="flex justify-between"><span>Saturday:</span> <span className="font-medium">Closed</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
