import services from "../../data/services.json";
import ServiceCard from "../../components/Services/ServiceCard";

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

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              setCurrentPage={setCurrentPage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
