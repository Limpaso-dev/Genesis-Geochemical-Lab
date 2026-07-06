import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import fallbackSliderImage from "../assets/hero.png";
import { Link } from "react-router-dom"; // ✅ ADDED

const sliderImageModules = import.meta.glob("../assets/home-slider/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const sliderImages = Object.values(sliderImageModules);
const homeSliderImages = sliderImages.length > 0 ? sliderImages : [fallbackSliderImage];

export default function Home() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % homeSliderImages.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative w-full h-[300px] sm:h-[380px] md:h-[480px] lg:h-[520px] overflow-hidden">

        <img
          src="/Testtubes.jpg"
          alt="Laboratory Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6"
        >
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
            Genesis Geochemical Laboratory
          </h1>

          <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#C9A24A] my-4 rounded-full"></div>

          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xl leading-relaxed">
            Accurate and reliable geochemical analysis for soil and mineral samples.
          </p>

          {/* ✅ FIXED BUTTON */}
          <Link
            to="/contact"
            className="mt-6 bg-[#C9A24A] font-semibold text-white px-6 sm:px-8 py-2.5 md:py-3 rounded-lg 
            text-sm sm:text-base hover:bg-[#b8933f] transition duration-300 
            hover:scale-[1.03] active:scale-[0.97]"
          >
            Get in Touch
          </Link>
        </motion.div>
      </section>

      {/* SLIDING PICTURES */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">

          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E3A5F]">
              Inside Our Laboratory
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-[#C9A24A] mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-600 mt-4 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              A closer look at our laboratory environment, sample handling, and analytical work.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-64 sm:h-80 md:h-[26rem] overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-sm"
          >
            {homeSliderImages.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Genesis laboratory slide ${index + 1}`}
                className={`absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] rounded-xl object-contain transition-opacity duration-1000 ${
                  activeImage === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 justify-center gap-2 rounded-full border border-gray-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
              {homeSliderImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`Show laboratory image ${index + 1}`}
                  onClick={() => setActiveImage(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeImage === index ? "w-9 bg-[#C9A24A]" : "w-2.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* SAMPLE RESULTS */}
      <section className="py-12 md:py-16 bg-white text-center">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1E3A5F] mb-8 md:mb-10">
            Our Sample Results
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto border rounded-2xl overflow-hidden shadow-sm"
          >
            <div className="bg-[#1E3A5F] text-white grid grid-cols-3 text-xs sm:text-sm md:text-base">
              <div className="p-3 border-r">Sample ID</div>
              <div className="p-3 border-r">Au (ppm)</div>
              <div className="p-3">Cu (ppm)</div>
            </div>

            <div className="grid grid-cols-3 text-xs sm:text-sm md:text-base">
              <div className="p-3 border-t border-r">xxxxx</div>
              <div className="p-3 border-t border-r">3.01</div>
              <div className="p-3 border-t">53.95</div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* LAB SECTION */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">

          <motion.img
            src="/genesis-gate.jpeg"
            alt="Laboratory"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full h-56 sm:h-64 md:h-80 lg:h-[22rem] object-cover rounded-2xl shadow-md"
          />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E3A5F]">
              Advanced Laboratory Processes
            </h2>

            <div className="w-16 h-1 bg-[#C9A24A] mt-4 mx-auto md:mx-0 rounded-full"></div>

            <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed max-w-xl">
              Our laboratory utilizes modern geochemical techniques and advanced
              analytical equipment to ensure accurate, reliable, and consistent
              results for all sample types.
            </p>
          </motion.div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-12 md:py-16 text-center">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-8 md:mb-10">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">

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
                className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md hover:scale-[1.04] transition duration-300"
              >
                <h3 className="font-semibold text-[#1E3A5F] text-base md:text-lg">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
}