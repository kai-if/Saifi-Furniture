import React, { useState } from "react";
import Lightbox from "../../components/Lightbox/Lightbox";

const featuredProducts = [
  { name: "L-Shaped Sofa With Swing Chair", price: "", img: "/assets/images/sofa2.PNG", alt: "L-Shped Sofa" },
  { name: "Wall Art", price: "", img: "/assets/images/wallart.PNG", alt: "Wallart" },
  { name: "Wooden Doors", price: "", img: "/assets/images/door.JPG", alt: "Zen Bedroom Suite" }
];

export default function HomePage({ setPage }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [startIdx, setStartIdx] = useState(0);

  const openLightbox = (images, idx) => {
    setLightboxImages(images);
    setStartIdx(idx);
    setLightboxOpen(true);
  };

  const imagesMeta = featuredProducts.map(p => ({ src: p.img, alt: p.alt, caption: p.name }));

  return (
    <div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-stone-100">
        <div className="absolute inset-0 bg-[url('public/assets/images/IMG_2905.JPG')] bg-cover bg-center opacity-100"></div>
        <div className="relative z-10 text-center px-6 animate-fadeInUp">
          <h1 className="text-5xl md:text-7xl  font-serif font-bold text-stone-900 mb-6 ">Crafted Elegance<br />for Your Home</h1>
          <p className="text-xl md:text-2xl text-stone-950 mb-8 max-w-2xl mx-auto">Discover handcrafted furniture that transforms your space into a sanctuary of comfort and style</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setPage("gallery")} className="bg-blu-300 text-white px-8 py-4 rounded-md text-lg hover:bg-stone-500 transition-all duration-300 hover:scale-105">Explore Collection</button>
            <button onClick={() => setPage("contact")} className="bg-white text-amber-900 px-8 py-4 rounded-md text-lg border-2 border-amber-900 hover:bg-amber-50 transition-all duration-300">Get a Quote</button>
          </div>
        </div>
      </section>

      <section className="bg-stone-300 py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16  border-2 border-black">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Featured Collection</h2>
            <p className="text-gray-600 text-lg">Handpicked pieces that define luxury living</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product, idx) => (
              <div key={idx} className="group cursor-pointer animate-fadeInUp" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-square" onClick={() => openLightbox(imagesMeta, idx)}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <img src={product.img} alt={product.alt} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-2xl font-serif text-amber-900">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-300 py-20 px-6 border-2 border-black">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: "🎨", title: "Custom Design", desc: "Tailor-made furniture crafted to your exact specifications" },
              { icon: "🚚", title: "Free Delivery", desc: "Complimentary delivery and professional installation" },
              { icon: "⭐", title: "Premium Quality", desc: "Sourced from the finest materials with lifetime warranty" }
            ].map((item, idx) => (
              <div key={idx} className="text-center animate-fadeInUp" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">{item.title}</h3>
                <p className="text-stone-900">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxOpen && <Lightbox images={lightboxImages} startIndex={startIdx} onClose={() => setLightboxOpen(false)} />}
    </div>
  );
}
