import services from "../../data/services.json";
import ServiceCard from "../../components/Services/ServiceCard";
import BeforeAfterSlider from "../../components/Showcase/BeforeAfterSlider";


const ServicesPage = ({ setCurrentPage }) => {
  return (
    <div className="pt-32 pb-20 px-6 animate-fadeInUp">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-sky-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thoughtfully crafted solutions from concept to completion
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-32">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              setCurrentPage={setCurrentPage}
            />
          ))}
        </div>

        {/* RESTORATION SHOWCASE */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl dark:shadow-gray-900/50">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              The Power of Restoration
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See how we breathe new life into outdated or damaged interiors with our premium restoration services. Drag the slider to compare.
            </p>
          </div>
          
          <BeforeAfterSlider 
            beforeImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1600"
            afterImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600"
            beforeLabel="Before Restoration"
            afterLabel="After Saifi Touch"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
