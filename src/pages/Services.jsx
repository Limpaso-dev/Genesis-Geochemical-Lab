import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

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
    <div className="w-full">

      {/*  HERO */}
      <section className="relative w-full h-[300px] sm:h-[380px] md:h-[460px] lg:h-[520px] overflow-hidden">

        <motion.img
          src="/elusion.jpeg"
          alt="Laboratory"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 sm:px-6">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight"
          >
            Precision. Accuracy. Reliability.
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "90px" }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-1 bg-[#C9A24A] mt-4 rounded-full"
          />

          <motion.button
            onClick={() => navigate("/contact")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-6 bg-[#C9A24A] text-white px-6 sm:px-8 py-2.5 md:py-3 rounded-lg font-medium 
            hover:bg-[#b8913f] transition duration-300 
            hover:scale-[1.04] active:scale-[0.96]"
          >
            Request Analysis
          </motion.button>

        </div>
      </section>

      {/* HEADING  */}
      <section className="py-12 md:py-16">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 text-center">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E3A5F]">
            Our Services
          </h2>

          <div className="w-16 sm:w-20 h-1 bg-[#C9A24A] mx-auto mt-4 rounded-full"></div>

          <p className="text-black-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We provide accurate, reliable, and scientifically proven laboratory
            analysis services tailored to industry needs.
          </p>

        </div>
      </section>

      {/*  SERVICES GRID  */}
      <section className="pb-16 md:pb-20">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10">

            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white border rounded-2xl overflow-hidden shadow-sm 
                hover:shadow-lg transition duration-300 hover:scale-[1.03]"
              >

                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 sm:h-52 md:h-56 lg:h-60 object-cover transition duration-500 hover:scale-110"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5 sm:p-6">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#1E3A5F]">
                    {service.title}
                  </h2>

                  <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
                    {service.desc}
                  </p>
                </div>

              </motion.div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
}