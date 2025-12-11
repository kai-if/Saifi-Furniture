import React, { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import Lightbox from "../../components/Lightbox/Lightbox";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [startIdx, setStartIdx] = useState(0);

  const categories = ["all", "sofa", "dining", "bedroom", "office", "decor", "home"];

  const products = [
    { name: "Modern Sofa", category: "sofa", price: "", img: "/assets/images/sofa.PNG" },
    { name: "Modular Kitchen", category: "dining", price: "", img: "/assets/images/kitchen1.JPG" },
    { name: "King Bed Frame", category: "bedroom", price: "", img: "/assets/images/bed.JPG" },
    { name: "Kids Study Table", category: "office", price: "", img: "/assets/images/stable.JPG" },
    { name: "Wall Art", category: "decor", price: "", img: "/assets/images/wallart.PNG" },
    { name: "L-Sofa with Swing Chair", category: "sofa", price: "", img: "/assets/images/sofa2.PNG" },
    { name: "Dressing Table", category: "bedroom", price: "", img: "/assets/images/dressing.PNG" },
    { name: "Cupboard", category: "bedroom", price: "", img: "/assets/images/cupboard.JPG" },
    { name: "Kids Cupboard", category: "bedroom", price: "", img: "/assets/images/cupboard1.JPG" },
    { name: "Single Bed", category: "bedroom", price: "", img: "/assets/images/sbed.JPG" },
    { name: "Wooden Doors", category: "home", price: "", img: "/assets/images/door.JPG" },
    { name: "LED Panel", category: "home", price: "", img: "/assets/images/ledp.JPG" },
    { name: "Vanity", category: "home", price: "", img: "/assets/images/vanity.JPG" },
    { name: "Rocking Chair", category: "office", price: "", img: "/assets/images/rchair.PNG" },
    { name: "Coffee Table", category: "decor", price: "", img: "/assets/images/table1.jpg" },
    { name: "Dining Table Set", category: "dining", price: "", img: "/assets/images/dining1.jpg" }
  ];

  const filteredProducts = activeFilter === "all" ? products : products.filter(p => p.category === activeFilter);

  const openLightbox = (items, idx) => {
    const imgs = items.map(p => ({ src: p.img, alt: p.name, caption: `${p.name} — ${p.price}` }));
    setLightboxImages(imgs);
    setStartIdx(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <h1 className="text-5xl font-serif font-bold text-amber-900 mb-12 text-center animate-fadeInUp">Product Gallery</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fadeInUp">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-6 py-2 rounded-full capitalize transition-all duration-300 ${activeFilter === cat ? "bg-amber-900 text-white" : "bg-white text-gray-700 hover:bg-amber-100"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} onClick={() => openLightbox(filteredProducts, idx)} />
          ))}
        </div>

        {lightboxOpen && <Lightbox images={lightboxImages} startIndex={startIdx} onClose={() => setLightboxOpen(false)} />}
      </div>
    </div>
  );
}
