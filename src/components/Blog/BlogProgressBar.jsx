import React from "react";

const BlogProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-[3px] bg-gray-200 overflow-hidden">
      <div
        className="h-full bg-amber-500 transition-all duration-200 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

export default BlogProgressBar;
