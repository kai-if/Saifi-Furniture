import React from "react";
import { useQuote } from "../../context/QuoteContext";
import { Plus } from "lucide-react";

const ProductCard = ({ product, onClick }) => {
  const { addItemToQuote } = useQuote();

  const handleAdd = (e) => {
    e.stopPropagation(); // Prevent opening lightbox
    addItemToQuote({
      id: product.name + product.category, // Basic unique id
      title: product.name,
      category: product.category,
      image: product.img,
    });
  };

  return (
    <div
      className="
        group
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-md
        hover:shadow-2xl
        transition-all
        duration-500
        hover:-translate-y-2
        cursor-pointer
        relative
      "
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Open ${product.name}`}
    >
      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <p className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-sm">View Item</p>
        </div>
      </div>

      <div className="p-5 flex flex-col h-[120px] justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          {product.category && (
            <p className="text-xs text-gray-500 mt-1">{product.category}</p>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-2 border-t border-gray-100 pt-3">
            <button 
              onClick={handleAdd}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              <Plus size={16} /> Add to Quote
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
