import React from "react";
import { Check } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl font-serif font-bold text-amber-900 mb-8 text-center animate-fadeInUp">Our Story</h1>

        <div className="prose prose-lg max-w-none space-y-6 text-gray-700 animate-fadeInUp">
          <p className="text-xl leading-relaxed">
            Founded in 1960, Saifi Furniture began as a small family workshop with a simple mission: to create furniture that tells a story.
            Every piece we craft carries the legacy of three generations of master craftsmen who have dedicated their lives to the art of woodworking.
          </p>

          <p className="text-lg leading-relaxed">
            Today, we've grown into a premier destination for those who appreciate the intersection of timeless design and exceptional craftsmanship.
            Our workshop combines traditional techniques passed down through generations with modern design sensibilities to create furniture that doesn't just fill a space—it transforms it.
          </p>

          <div className="bg-amber-50 p-8 rounded-lg my-12">
            <h2 className="text-3xl font-serif font-bold text-amber-900 mb-6">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[{ title: "Craftsmanship", desc: "Every detail matters. We take pride in creating pieces that stand the test of time." }, { title: "Sustainability", desc: "We source materials responsibly and prioritize eco-friendly practices." }, { title: "Innovation", desc: "Blending traditional techniques with modern design for contemporary living." }, { title: "Integrity", desc: "Transparent pricing, honest service, and commitment to customer satisfaction." }].map((value, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <Check className="text-amber-900 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-bold text-lg text-amber-900 mb-1">{value.title}</h3>
                    <p className="text-gray-600">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <h2 className="text-3xl font-serif font-bold text-amber-900 mb-6 mt-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{ name: "James Morrison", role: "Master Craftsman", exp: "35 years" }, { name: "Sarah Chen", role: "Design Director", exp: "15 years" }, { name: "Marcus Williams", role: "Quality Control", exp: "20 years" }].map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="w-32 h-32 bg-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-amber-900 font-medium">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.exp} experience</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
