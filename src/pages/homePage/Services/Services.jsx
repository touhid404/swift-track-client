import {
  FaBoxOpen,
  FaTruckMoving,
  FaWarehouse,
  FaHandHoldingUsd,
  FaUndoAlt,
  FaBuilding,
} from "react-icons/fa";

const services = [
  {
    icon: <FaBoxOpen className="text-3xl text-indigo-600" />,
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    icon: <FaTruckMoving className="text-3xl text-green-600" />,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    icon: <FaWarehouse className="text-3xl text-indigo-600" />,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support: online order processing, packaging, and after-sales support.",
  },
  {
    icon: <FaHandHoldingUsd className="text-3xl text-indigo-600" />,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    icon: <FaBuilding className="text-3xl text-indigo-600" />,
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which include warehouse and inventory management support.",
  },
  {
    icon: <FaUndoAlt className="text-3xl text-indigo-600" />,
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const Services = () => {
  return (
    <section className="bg-[#03373D] text-white py-12 rounded-3xl px-4 md:px-12 mt-5">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl shadow-sm transition duration-300 bg-white text-slate-800 hover:bg-lime-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
