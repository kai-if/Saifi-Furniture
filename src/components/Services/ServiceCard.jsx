import React, { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import "./serviceAnimations.css";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  const [progress, setProgress] = useState(0);
  const backRef = useRef(null);

  const handleScroll = () => {
    const el = backRef.current;
    if (!el) return;

    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    const percent = (scrollTop / scrollHeight) * 100;
    setProgress(percent);
  };

  return (
    <div className={`service-flip ${flipped ? "flipped" : ""}`}>
      <div className="service-inner">

        {/* FRONT */}
        <div className="service-front">
          <h2 className="text-2xl font-serif font-bold text-sky-900 mb-4">
            {service.title}
          </h2>

          <p className="text-gray-600 mb-6">{service.shortDesc}</p>

          <ul className="space-y-2 mb-6">
            {service.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <Check size={16} className="text-sky-900" />
                {f}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setFlipped(true)}
            className="text-sky-900 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
          >
            Learn More <ArrowRight size={18} />
          </button>
        </div>

        {/* BACK */}
        <div className="service-back">

          {/* Progress Bar */}
          <div className="service-progress">
            <span style={{ width: `${progress}%` }} />
          </div>

          <div
            ref={backRef}
            onScroll={handleScroll}
            className="service-back-content"
          >
            <h3 className="text-2xl font-serif font-bold text-sky-900 mb-4">
              {service.title}
            </h3>

            <p className="text-gray-700 leading-relaxed mb-8">
              {service.longDesc}
            </p>

            {/* CTA */}
            <button
              onClick={() => navigate("/contact")}
              className="block w-full text-center bg-sky-900 text-white py-3 rounded-md mb-6 hover:bg-sky-800 transition"
              >
             Contact Us
            </button>


            <button
              onClick={() => setFlipped(false)}
              className="text-sky-900 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
            >
              <ArrowLeft size={18} /> Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceCard;
