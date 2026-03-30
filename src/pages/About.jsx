import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="px-6 md:px-12 py-14 md:py-20">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F]">
          About Genesis Geochemical Laboratory
        </h1>

        <div className="w-16 md:w-20 h-1 bg-[#C9A24A] mx-auto mt-4"></div>
      </div>

      {/* INTRO + IMAGE (SIDE BY SIDE ON DESKTOP) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-black-700 text-sm md:text-base leading-relaxed"
        >
          <p>
            Genesis Geochemical Laboratory is a professional analytical facility
            dedicated to providing accurate and reliable geochemical testing services.
            We specialize in soil and mineral analysis using modern laboratory techniques.
          </p>

          <p className="mt-4 italic">
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
          className="w-full h-64 md:h-80 object-cover rounded-xl shadow-sm"
        />
      </div>
       {/* MANAGEMENT */}
<div className="mt-16 max-w-5xl mx-auto">

  <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F] mb-10 text-center">
    THE MANAGEMENT
  </h2>

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white border rounded-xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-8"
  >

    {/* IMAGE (LEFT) */}
    <img
      src="/manager.jpeg"
      alt="Lab Director"
      className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full shadow-md flex-shrink-0"
    />

    {/* TEXT (RIGHT) */}
    <div className="text-center md:text-left">

      {/* NAME */}
      <h3 className="font-semibold text-[#1E3A5F] text-lg md:text-xl">
        Fostine Maroa Gitiba
      </h3>

      {/* TITLE */}
      <p className="text-[#C9A24A] font-bold text-sm mt-1">
        Laboratory Director
      </p>

      {/* DESCRIPTION */}
      <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed max-w-xl">
        Oversees laboratory operations, ensuring high standards in geochemical
        analysis, quality control, and research excellence. Provides strategic
        leadership in research, testing methodologies, and laboratory management.
      </p>

    </div>

  </motion.div>

</div>


      {/* MISSION & VISION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">

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
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-semibold text-[#1E3A5F] text-lg">
              {item.title}
            </h2>
            <p className="text-gray-600 mt-3 text-sm md:text-base">
              {item.desc}
            </p>
          </motion.div>
        ))}

      </div>
           
      {/* WHY TRUST US */}
      <div className="mt-16 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F] mb-8">
          Why Trust Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

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
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition"
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
      </div>

    </div>
  );
}