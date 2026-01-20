import React from "react";
import { ArrowRight, Check } from "lucide-react";

const ServicesPage = ({ setCurrentPage }) => {
  const services = [
    {
      title: "Custom Furniture Design",
      desc: "Bring your vision to life with our bespoke furniture design service.",
      features: ["3D Visualization", "Material Selection", "Unlimited Revisions", "Expert Consultation"]
    },
    {
      title: "Delivery & Installation",
      desc: "White-glove service with our professional delivery and installation team.",
      features: ["Free Delivery", "Professional Assembly", "Old Furniture Removal", "Placement Assistance"]
    },
    {
      title: "Restoration & Repairs",
      desc: "Breathe new life into cherished pieces with our expert restoration services.",
      features: ["Wood Refinishing", "Upholstery Repair", "Structural Restoration", "Color Matching"]
    },
    {
      title: "Interior Consultation",
      desc: "Our interior design consultants help you create cohesive, beautiful spaces.",
      features: ["Space Planning", "Style Guidance", "Color Coordination", "Shopping Assistance"]
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-5xl font-serif font-bold text-sky-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions for all your furniture needs, from design to delivery
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-fadeInUp"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <h2 className="text-2xl font-serif font-bold text-sky-900 mb-4">
                {service.title}
              </h2>

              <p className="text-gray-600 mb-6">
                {service.desc}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center space-x-2">
                    <Check className="text-sky-900" size={18} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* LEARN MORE → CONTACT PAGE */}
              <button
                onClick={() => setCurrentPage("contact")}
                className="mt-6 text-sky-900 font-semibold hover:text-sky-700 flex items-center space-x-2 transition"
              >
                <span>Learn More</span>
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
