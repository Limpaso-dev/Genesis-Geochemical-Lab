import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      title: "Soil Analysis",
      desc: "Comprehensive soil testing for mineral composition and quality.",
      image: "/soil-samp.jpg",
    },
    {
      title: "Assay Methods",
      desc: "Aqua Regia digestion and AAS for precise element detection.",
      image: "/Assay.jpg",
    },
    {
      title: "Mineral Analysis",
      desc: "Detailed mineral testing using advanced laboratory techniques.",
      image: "/mineral-samples.jpg",
    },
    {
      title: "Water Analysis",
      desc: "Accurate testing of water samples for safety and composition.",
      image: "/Water-Analysis.jpg",
    },
  ];

  return (
    <div className="px-6 md:px-12 py-14 md:py-20">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F]">
          Our Services
        </h1>

        {/* GOLD LINE */}
        <div className="w-16 md:w-20 h-1 bg-[#C9A24A] mx-auto mt-4"></div>

        <p className="text-black-600 text-sm md:text-base mt-4 max-w-2xl mx-auto">
          We provide accurate and reliable laboratory analysis services using advanced scientific methods.
        </p>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 hover:scale-[1.02]"
          >

            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-52 md:h-60 object-cover transition duration-300 hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h2 className="text-lg md:text-xl font-semibold text-[#1E3A5F]">
                {service.title}
              </h2>

              <p className="text-gray-600 mt-3 text-sm md:text-base leading-relaxed">
                {service.desc}
              </p>
            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}