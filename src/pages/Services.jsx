export default function Services() {
  const services = [
    {
      title: "Soil Analysis",
      desc: "Comprehensive soil testing for mineral composition and quality.",
    },
    {
      title: "Water Analysis",
      desc: "Accurate testing of water samples for safety and composition.",
    },
    {
      title: "Mineral Analysis",
      desc: "Detailed mineral testing using advanced laboratory techniques.",
    },
    {
      title: "Assay Methods",
      desc: "Aqua Regia digestion and AAS for precise element detection.",
    },
  ];

  return (
    <div className="px-6 md:px-12 py-12 md:py-16">

      <h1 className="text-2xl md:text-3xl font-bold text-center text-[#1E3A5F] mb-10">
        Our Services
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-[#1E3A5F]">
              {service.title}
            </h2>

            <p className="text-gray-600 mt-3 text-sm md:text-base">
              {service.desc}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}