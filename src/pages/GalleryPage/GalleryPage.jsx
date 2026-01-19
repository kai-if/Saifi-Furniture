import { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import Lightbox from "../../components/Lightbox/Lightbox";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ["all", "sofa", "dining", "bedroom", "office", "decor", "home"];

  const products = [
    { name: "Modern Sofa", category: "sofa", img: "/images/sofa.PNG" },
    { name: "Modular Kitchen", category: "dining", img: "/images/kitchen1.JPG" },
    { name: "King Bed Frame", category: "bedroom", img: "/images/bed.JPG" },
    { name: "Living Area", category: "home", img: "/images/IMG_2905.JPG" },
    { name: "Kids Study Table", category: "office", img: "/images/stable.JPG" },
    { name: "Wall Art", category: "decor", img: "/images/wallart.PNG" },
    { name: "L-Sofa with Swing Chair", category: "sofa", img: "/images/sofa2.PNG" },
    { name: "Dressing Table", category: "bedroom", img: "/images/dressing.PNG" },
    { name: "Cupboard", category: "bedroom", img: "/images/cupboard.JPG" },
    { name: "Kids Cupboard", category: "bedroom", img: "/images/cupboard1.JPG" },
    { name: "Single Bed", category: "bedroom", img: "/images/sbed.JPG" },
    { name: "Wooden Doors", category: "home", img: "/images/door.JPG" },
    { name: "LED Panel", category: "home", img: "/images/ledp.JPG" },
    { name: "Vanity", category: "home", img: "/images/vanity.JPG" },
    { name: "Rocking Chair", category: "office", img: "/images/rchair.PNG" },
    { name: "Coffee Table", category: "decor", img: "/images/table1.JPG" },
    { name: "Dining Table Set", category: "dining", img: "/images/dining1.JPG" }
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
