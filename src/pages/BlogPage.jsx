import React from "react";
import { ArrowRight } from "lucide-react";

const BlogPage = () => {
  const posts = [
    { title: "10 Tips for Creating a Cozy Living Room", excerpt: "Transform your living space into a warm, inviting sanctuary with these expert design tips.", date: "Dec 1, 2025", category: "Interior Design", readTime: "5 min read" },
    { title: "Sustainable Furniture: Why It Matters", excerpt: "Learn about the environmental impact of furniture choices and how sustainable materials can create beautiful, eco-friendly homes.", date: "Nov 28, 2025", category: "Sustainability", readTime: "7 min read" },
    { title: "Maximizing Small Spaces with Smart Furniture", excerpt: "Discover clever furniture solutions that make the most of compact living areas without sacrificing style or functionality.", date: "Nov 25, 2025", category: "Space Planning", readTime: "6 min read" },
    { title: "Mixing Modern and Traditional Furniture Styles", excerpt: "Master the art of eclectic design by blending contemporary pieces with classic furniture for a unique look.", date: "Nov 20, 2025", category: "Design Tips", readTime: "8 min read" },
    { title: "Caring for Your Wood Furniture", excerpt: "Essential maintenance tips to keep your wood furniture looking beautiful for generations.", date: "Nov 15, 2025", category: "Maintenance", readTime: "4 min read" },
    { title: "Color Psychology in Home Decor", excerpt: "Explore how different colors affect mood and atmosphere in your home.", date: "Nov 10, 2025", category: "Design Theory", readTime: "6 min read" }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-5xl font-serif font-bold text-sky-900 mb-8 text-center animate-fadeInUp">Design Ideas & Tips</h1>
        <p className="text-center text-xl text-gray-900 mb-16 animate-fadeInUp">Expert insights to inspire your next interior design project</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <article key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fadeInUp">
              <div className="aspect-video bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <span className="text-gray-400">Blog Image</span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="bg-sky-100 text-sky-900 px-3 py-1 rounded-full">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-xl font-serif font-bold text-gray-800 mb-3 hover:text-sky-900 transition-colors">{post.title}</h2>

                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-sky-700">{post.date}</span>
                  <button className="text-sky-700 font-semibold hover:text-sky-500 flex items-center space-x-1">
                    <span>Read More</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
