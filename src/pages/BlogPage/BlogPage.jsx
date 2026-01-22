import React from "react";
import blogs from "../../data/blogs.json";
import BlogCard from "../../components/Blog/BlogCard";

const BlogPage = () => {
  return (
    <div className="pt-32 pb-24 px-6 animate-fadeInUp">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-sky-900 mb-4">
            Ideas & Insights
          </h1>
          <p className="text-xl text-gray-600">
            Stories, craftsmanship, and inspiration from Saifi Furniture
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
