import { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import Lightbox from "../../components/Lightbox/Lightbox";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ["all", "Sofa", "Dining", "Bedroom", "Office", "Decor", "Home"];

  const products = [
    { name: "Modern Sofa", category: "Sofa", img: "/images/sofa.PNG" },
    { name: "Bunk Bed", category: "Bedroom", img: "/images/BunkBed.PNG" },
    { name: "King Bed Frame", category: "Bedroom", img: "/images/bed.JPG" },
    { name: "Living Area", category: "Home", img: "/images/IMG_2905.JPG" },
    { name: "Home Temple", category: "Home", img: "/images/HTemple.PNG" },
    { name: "Wall Art", category: "Decor", img: "/images/wallart.PNG" },
    { name: "L-Sofa with Swing Chair", category: "Sofa", img: "/images/sofa2.PNG" },
    { name: "Dressing Table", category: "Bedroom", img: "/images/dressing.PNG" },
    { name: "Cupboard", category: "Bedroom", img: "/images/cupboard.JPG" },
    { name: "Kids Cupboard", category: "Bedroom", img: "/images/cupboard1.JPG" },
    { name: "Single Bed", category: "Bedroom", img: "/images/sbed.JPG" },
    { name: "Wooden Doors", category: "Home", img: "/images/door.JPG" },
    { name: "LED Panel", category: "Home", img: "/images/ledp.JPG" },
    { name: "Modular Kitchen", category: "Dining", img: "/images/kitchen1.JPG" },
    { name: "Vanity", category: "Home", img: "/images/vanity.JPG" },
    { name: "Rocking Chair", category: "Office", img: "/images/rchair.PNG" },
    { name: "Kids Study Table", category: "Office", img: "/images/stable.JPG" }
    
  ];

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter(p => p.category === activeFilter);

  const openLightbox = (index) => {
    setImages(filteredProducts);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <h1 className="text-5xl font-serif font-bold text-sky-900 mb-12 text-center animate-fadeInUp">
          Product Gallery
        </h1>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-full capitalize transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-sky-900 text-white"
                  : "bg-white text-gray-700 hover:bg-sky-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <ProductCard
              key={idx}
              product={product}
              onClick={() => openLightbox(idx)}
            />
          ))}
        </div>

        {/* LIGHTBOX */}
        {lightboxOpen && (
          <Lightbox
            images={images}
            startIndex={currentIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
