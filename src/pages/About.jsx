export default function About() {
  return (
    <div className="px-6 md:px-12 py-12 md:py-16">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F]">
          About Genesis Geochemical Laboratory
        </h1>

        <div className="w-16 h-1 bg-[#C9A24A] mx-auto mt-4"></div>
      </div>

      {/* INTRO */}
      <div className="max-w-4xl mx-auto text-center text-gray-700 text-sm md:text-base leading-relaxed">
        <p>
          Genesis Geochemical Laboratory is a professional analytical facility
          dedicated to providing accurate and reliable geochemical testing services.
          We specialize in soil, water, and mineral analysis using modern laboratory techniques.
        </p>

        <p className="mt-4">
          Our goal is to deliver precise results that support decision-making
          in mining, environmental studies, and research.
        </p>
      </div>

      {/* MISSION & VISION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-[#1E3A5F] text-lg">Our Mission</h2>
          <p className="text-gray-600 mt-3 text-sm md:text-base">
            To provide high-quality, accurate, and timely geochemical analysis
            services that meet international standards.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-[#1E3A5F] text-lg">Our Vision</h2>
          <p className="text-gray-600 mt-3 text-sm md:text-base">
            To be a trusted leader in geochemical laboratory services across the region.
          </p>
        </div>

      </div>

      {/* WHY TRUST US */}
      <div className="mt-14 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-[#1E3A5F] mb-6">
          Why Trust Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#1E3A5F]">Certified Methods</h3>
            <p className="text-sm text-gray-600 mt-2">
              We use recognized laboratory procedures such as AAS and Aqua Regia.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#1E3A5F]">Experienced Team</h3>
            <p className="text-sm text-gray-600 mt-2">
              Skilled professionals ensuring quality and consistency.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-[#1E3A5F]">Reliable Results</h3>
            <p className="text-sm text-gray-600 mt-2">
              Accurate data you can depend on for critical decisions.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}