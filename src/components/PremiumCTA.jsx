export default function PremiumCTA({ onContact }) {
  return (
    <section className="bg-stone-900 py-24 px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-sky-100 mb-6">
        Designed for Your Space
      </h2>
      <p className="text-stone-300 max-w-2xl mx-auto mb-10 text-lg">
        Every home deserves furniture that reflects its personality.
        Let us craft something exceptional for you.
      </p>
      <button
        onClick={() => {
          onContact();
            window.scrollTo({ top: 0, behavior: "smooth" });
          
        }}
        className="
          px-10 py-4
          bg-sky-200 text-stone-900
          rounded-full
          font-semibold
          hover:bg-sky-300
          hover:scale-105
          transition-all duration-300
        "
      >
        Start Your Custom Design
      </button>
    </section>
  );
}
