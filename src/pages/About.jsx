import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="w-full">

      {/* ================= HEADER ================= */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 text-center">

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A5F] leading-tight">
            About Genesis Geochemical Laboratory
          </h1>

          <div className="w-16 sm:w-20 h-1 bg-[#C9A24A] mx-auto mt-4 rounded-full"></div>

        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="pb-12 md:pb-16">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-black-700 text-sm sm:text-base leading-relaxed text-center md:text-left"
          >
            <p>
              Genesis Geochemical Laboratory is a professional analytical facility
              dedicated to providing accurate and reliable geochemical testing services.
              We specialize in soil and mineral analysis using modern laboratory techniques.
            </p>

            <p className="mt-4 italic text-black-600">
              Our goal is to deliver precise results that support decision-making
              in mining, environmental studies, and research.
            </p>
          </motion.div>

          {/* IMAGE */}
          <motion.img
            src="/labb-team.jpg"
            alt="Lab Team"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full h-56 sm:h-64 md:h-80 lg:h-[22rem] object-cover rounded-2xl shadow-md"
          />

        </div>
      </section>

      {/* ================= MANAGEMENT ================= */}
      <section className="py-12 md:py-16">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-8 md:mb-10 text-center">
            THE MANAGEMENT
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-8"
          >

            <img
              src="/manager.jpeg"
              alt="Lab Director"
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-full shadow-md flex-shrink-0"
            />

            <div className="text-center md:text-left">
              <h3 className="font-semibold text-[#1E3A5F] text-lg md:text-xl">
                Fostine Maroa Gitiba
              </h3>

              <p className="text-[#C9A24A] font-bold text-sm mt-1">
                Laboratory Director
              </p>

              <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed max-w-xl">
                Oversees laboratory operations, ensuring high standards in geochemical
                analysis, quality control, and research excellence.
              </p>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-12 md:py-16">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          {[
            {
              title: "Our Mission",
              desc: "To provide high-quality, accurate, and timely geochemical analysis services that meet international standards.",
            },
            {
              title: "Our Vision",
              desc: "To be a trusted leader in geochemical laboratory services across the region.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300"
            >
              <h2 className="font-semibold text-[#1E3A5F] text-lg md:text-xl">
                {item.title}
              </h2>
              <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= WHY TRUST US ================= */}
      <section className="py-12 md:py-16 text-center">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-8">
            Why Trust Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">

            {[
              {
                title: "Certified Methods",
                desc: "We use recognized laboratory procedures such as AAS and Aqua Regia.",
              },
              {
                title: "Experienced Team",
                desc: "Skilled professionals ensuring quality and consistency.",
              },
              {
                title: "Reliable Results",
                desc: "Accurate data you can depend on for critical decisions.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.03] transition duration-300"
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