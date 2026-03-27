import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <section className="relative w-full h-[260px] md:h-[420px]">

        <img
          src="/Testtubes.jpg"
          alt="Lab"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        {/* HERO ANIMATION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
        >
          <h1 className="text-xl md:text-4xl font-bold text-white leading-snug">
            Genesis Geochemical Laboratory
          </h1>

          <div className="w-16 md:w-24 h-1 bg-[#C9A24A] my-4"></div>

          <p className="text-sm md:text-lg text-gray-200 max-w-xl">
            Accurate and reliable geochemical analysis for soil and mineral samples.
          </p>

          <a
            href="/contact"
            className="mt-6 bg-[#C9A24A] font-bold text-white px-6 py-2 md:py-3 rounded-lg text-sm md:text-base hover:bg-[#b8933f] transition"
          >
            Get in Touch
          </a>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section className="px-6 md:px-12 py-14 md:py-20">
        <h2 className="text-xl md:text-2xl font-bold text-center text-[#1E3A5F] mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            "Soil Analysis",
            "Assay Methods",
            "Mineral Analysis",
            "Water Testing",
          ].map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg hover:scale-105 transition duration-300 text-center"
            >
              <h3 className="font-semibold text-[#1E3A5F] text-lg">
                {service}
              </h3>

              <p className="text-sm text-black-600 mt-3">
                Professional and precise laboratory testing services.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SAMPLE RESULTS */}
      <section className="px-4 md:px-10 py-14 md:py-20 bg-white">
        <h2 className="text-xl md:text-2xl font-semibold text-center text-[#1E3A5F] mb-10">
          Sample Results
        </h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto border rounded-xl overflow-hidden shadow-sm"
        >
          <div className="bg-[#1E3A5F] text-white grid grid-cols-3 text-sm md:text-base">
            <div className="p-3 border-r">Sample ID</div>
            <div className="p-3 border-r">Au (ppm)</div>
            <div className="p-3">Cu (ppm)</div>
          </div>

          <div className="grid grid-cols-3 text-sm md:text-base">
            <div className="p-3 border-t border-r">MCHINA</div>
            <div className="p-3 border-t border-r">3.01</div>
            <div className="p-3 border-t">53.95</div>
          </div>
        </motion.div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-6 md:px-12 py-14 md:py-20 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F] mb-10">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          {[
            {
              title: "Accurate Results",
              desc: "High precision laboratory analysis you can trust.",
            },
            {
              title: "Professional Standards",
              desc: "We follow strict scientific and testing protocols.",
            },
            {
              title: "Reliable Service",
              desc: "Timely results with consistent quality assurance.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md hover:scale-105 transition"
            >
              <h3 className="font-semibold text-[#1E3A5F]">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-3">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

    </div>
  );
}