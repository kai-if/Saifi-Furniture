import React from "react";

const ProductCard = ({ product, onClick }) => {
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
      "
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Open ${product.name}`}
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        {product.category && (
          <p className="text-xs text-gray-500 mt-1">{product.category}</p>
        )}

        <p className="mt-2 text-base font-medium text-blue-600">
          {product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
