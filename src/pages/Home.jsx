import React from "react";

export default function Home() {
  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <section className="text-center px-6 py-16 md:py-24">
        <h1 className="text-2xl md:text-4xl font-bold text-[#1E3A5F] leading-snug">
          Genesis Geochemical Laboratory
        </h1>

        <div className="w-16 md:w-24 h-1 bg-[#C9A24A] mx-auto my-4"></div>

        <p className="text-sm md:text-lg max-w-xl mx-auto text-gray-700">
          Accurate and reliable geochemical analysis for soil, water, and mineral samples.
        </p>
      </section>

      {/* SERVICES */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <h2 className="text-xl md:text-2xl font-semibold text-center text-[#1E3A5F] mb-10">
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Soil Analysis",
            "Water Testing",
            "Mineral Analysis",
            "Assay Methods",
          ].map((service) => (
            <div
              key={service}
              className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-[#1E3A5F] text-lg">
                {service}
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                Professional and precise laboratory testing services.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE REPORT (INSPIRED BY YOUR DOCUMENT) */}
      <section className="px-4 md:px-10 py-12 md:py-16 bg-white">
        <h2 className="text-xl md:text-2xl font-semibold text-center text-[#1E3A5F] mb-8">
          Sample Results
        </h2>

        <div className="max-w-4xl mx-auto border rounded-xl overflow-hidden shadow-sm">

          {/* TABLE HEADER */}
          <div className="bg-[#1E3A5F] text-white grid grid-cols-3 text-sm md:text-base">
            <div className="p-3 border-r">Sample ID</div>
            <div className="p-3 border-r">Au (ppm)</div>
            <div className="p-3">Cu (ppm)</div>
          </div>

          {/* TABLE BODY */}
          <div className="grid grid-cols-3 text-sm md:text-base">
            <div className="p-3 border-t border-r">MCHINA</div>
            <div className="p-3 border-t border-r">3.01</div>
            <div className="p-3 border-t">53.95</div>
          </div>
        </div>
      </section>

      {/* PROCESS / METHOD SECTION */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <h2 className="text-xl md:text-2xl font-semibold text-center text-[#1E3A5F] mb-8">
          Our Process
        </h2>

        <p className="max-w-3xl mx-auto text-center text-gray-700 text-sm md:text-base leading-relaxed">
          Samples are analyzed using standardized laboratory procedures including
          Aqua Regia digestion and Atomic Absorption Spectroscopy (AAS) to ensure
          accuracy and reliability of results.
        </p>
      </section>

      {/* CREDIBILITY */}
      <section className="bg-[#F8F6F2] px-6 md:px-12 py-12 md:py-16 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-[#1E3A5F] mb-6">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-[#1E3A5F]">Accurate Results</h3>
            <p className="text-sm text-gray-600 mt-2">
              High precision laboratory analysis you can trust.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-[#1E3A5F]">Professional Standards</h3>
            <p className="text-sm text-gray-600 mt-2">
              We follow strict scientific and testing protocols.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-[#1E3A5F]">Reliable Service</h3>
            <p className="text-sm text-gray-600 mt-2">
              Timely results with consistent quality assurance.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}