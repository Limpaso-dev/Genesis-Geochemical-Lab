import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Services() {

  const navigate = useNavigate(); // ✅ FIXED (must be inside component)

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
    <div>

      {/* 🔥 HERO */}
      <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden">

        <motion.img
          src="/elusion.jpeg"
          alt="Laboratory"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-2xl md:text-4xl font-bold"
          >
            Precision. Accuracy. Reliability.
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-1 bg-[#C9A24A] mt-4"
          />

          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-200 mt-4 max-w-2xl text-sm md:text-base"
          >
            Delivering advanced geochemical analysis services for soil, water,
            and mineral samples using industry-standard laboratory methods.
          </motion.p> */}

          {/* ✅ CTA FIXED */}
          <motion.button
            onClick={() => navigate("/contact")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-6 bg-[#C9A24A] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#b8913f] transition duration-300"
          >
            Request Analysis
          </motion.button>

        </div>
      </div>

      {/* 🔥 OUR SERVICES HEADING */}
      <div className="text-center mt-16 mb-10 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A5F]">
          Our Services
        </h2>
        <div className="w-16 md:w-20 h-1 bg-[#C9A24A] mx-auto mt-4"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
          We provide accurate, reliable, and scientifically proven laboratory
          analysis services tailored to industry needs.
        </p>
      </div>

      {/* CONTENT */}
      <div className="px-6 md:px-12 pb-20">

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

              <div className="overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-52 md:h-60 object-cover transition duration-300 hover:scale-105"
                />
              </div>

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

    </div>
  );
}