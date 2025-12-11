import React from "react";

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") onClick(); }}>
      <div className="aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-xl font-serif text-amber-900">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
