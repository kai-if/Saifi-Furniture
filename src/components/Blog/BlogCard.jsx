import React, { useRef, useState } from "react";
import BlogProgressBar from "./BlogProgressBar";
import "./blogAnimations.css";

const BlogCard = ({ blog }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const value = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setProgress(value);
  };

  const flipBack = () => {
    setIsFlipped(false);
    setProgress(0);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  return (
    <div className={`blog-card ${isFlipped ? "flipped" : ""}`}>
      <div className="blog-card-inner">

        {/* FRONT */}
        <div className="blog-card-front">
          <img src={blog.coverImage} alt={blog.title} />
          <div className="p-6">
            <span className="text-sm text-amber-700">{blog.category}</span>
            <h3 className="text-2xl font-serif font-bold text-sky-900 mt-2">
              {blog.title}
            </h3>
            <p className="text-gray-600 mt-3">{blog.excerpt}</p>
            <button
              onClick={() => setIsFlipped(true)}
              className="mt-6 text-sky-900 font-semibold hover:underline"
            >
              Read More →
            </button>
          </div>
        </div>

        {/* BACK */}
        <div className="blog-card-back">
          <BlogProgressBar progress={progress} />

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="blog-scroll-area"
          >
            <h3 className="text-3xl font-serif font-bold text-sky-900 mb-2">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {blog.date} • {blog.category}
            </p>

            {blog.content.map((para, idx) => (
              <p key={idx} className="text-gray-700 mb-5 leading-relaxed">
                {para}
              </p>
            ))}

            <button
              onClick={flipBack}
              className="mt-10 text-sky-900 font-semibold hover:underline"
            >
              ← Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogCard;
