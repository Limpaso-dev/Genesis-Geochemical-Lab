import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full">

      {/* ================= HERO ================= */}
      <section className="relative w-full h-[260px] md:h-[420px] overflow-hidden">

        {/* BACKGROUND */}
        <img
          src="/Testtubes.jpg"
          alt="Lab"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
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

      {/* ================= SAMPLE RESULTS ================= */}
      <section className="px-6 md:px-12 py-16 bg-white text-center">

        <h2 className="text-xl md:text-2xl font-semibold text-[#1E3A5F] mb-10">
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

      {/* ================= LAB IMAGE SECTION ================= */}
      <section className="py-16 bg-gray-50">

        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <motion.img
            src="/genesis-gate.jpeg"
            alt="Laboratory"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-sm"
          />

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F]">
              Advanced Laboratory Processes
            </h2>

            <div className="w-16 h-1 bg-[#C9A24A] mt-4"></div>

            <p className="text-gray-600 mt-4 text-sm md:text-base leading-relaxed">
              Our laboratory utilizes modern geochemical techniques and advanced
              analytical equipment to ensure accurate, reliable, and consistent
              results for all sample types.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="px-6 md:px-12 py-16 text-center">

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