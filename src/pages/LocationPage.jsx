import React from "react";
import { MapPin } from "lucide-react";

const LocationPage = () => {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl font-serif font-bold text-amber-900 mb-8 text-center animate-fadeInUp">Visit Our Showroom</h1>
        <p className="text-center text-xl text-gray-600 mb-12 animate-fadeInUp">Experience our furniture collection in person. Our design experts are ready to help you find the perfect pieces.</p>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fadeInUp">
          <div className="aspect-video bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto mb-2 text-amber-900" size={48} />
              <p className="text-gray-600">Google Maps Embed</p>
              <p className="text-sm text-gray-500">Mangal Parao, Haldwani, Uttarakhand - 263139</p>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Getting Here</h2>
            <p className="text-gray-600 mb-4">Our showroom is conveniently located in the heart of Haldwani City, with parking available.</p>
            <button className="bg-amber-900 text-white px-6 py-3 rounded-md hover:bg-amber-800 transition-colors duration-300">Get Directions</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
