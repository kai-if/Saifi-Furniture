import React from "react";

const OffersPage = () => {
  const offers = [
    { title: "New Customer Special", discount: "20% OFF", desc: "First-time customers receive 20% off their entire order", code: "WELCOME20", expiry: "Valid until Dec 31, 2025" },
    { title: "Bundle & Save", discount: "Up to 30% OFF", desc: "Purchase complete room sets and save up to 30%", code: "BUNDLE30", expiry: "Ongoing offer" },
    { title: "Seasonal Sale", discount: "15% OFF", desc: "Selected items from our winter collection", code: "WINTER15", expiry: "Valid until Jan 15, 2026" },
    { title: "Referral Bonus", discount: "$200 Credit", desc: "Refer a friend and both receive $200 store credit", code: "REFER200", expiry: "Always available" }
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-5xl font-serif font-bold text-amber-900 mb-8 text-center animate-fadeInUp">Special Offers</h1>
        <p className="text-center text-xl text-gray-600 mb-16 animate-fadeInUp">Exclusive deals on premium furniture for your dream home</p>

        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((offer, idx) => (
            <div key={idx} className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-lg p-8 hover:shadow-xl transition-all duration-300 animate-fadeInUp" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="text-center mb-6">
                <div className="text-5xl font-serif font-bold text-amber-900 mb-2">{offer.discount}</div>
                <h2 className="text-2xl font-serif font-bold text-gray-800">{offer.title}</h2>
              </div>

              <p className="text-gray-700 mb-6 text-center">{offer.desc}</p>

              <div className="bg-white border-2 border-dashed border-amber-900 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Use code:</p>
                <p className="text-2xl font-bold text-amber-900 text-center">{offer.code}</p>
              </div>

              <p className="text-sm text-gray-500 text-center">{offer.expiry}</p>

              <button className="w-full mt-4 bg-amber-900 text-white py-3 rounded-md hover:bg-amber-800 transition-colors">Shop Now</button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-amber-900 text-white rounded-lg p-8 text-center animate-fadeInUp">
          <h2 className="text-3xl font-serif font-bold mb-4">Join Our VIP Club</h2>
          <p className="text-lg mb-6">Get early access to sales, exclusive discounts, and design tips</p>
          <button className="bg-white text-amber-900 px-8 py-3 rounded-md font-semibold hover:bg-amber-50 transition-colors">Sign Up Free</button>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
