import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1E3A5F] text-white px-4 sm:px-6 md:px-12 lg:px-20 py-10 md:py-12">

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">

        {/* COMPANY */}
        <div className="text-left sm:text-left">
          <h2 className="text-base sm:text-lg md:text-xl font-bold leading-snug">
            Genesis Geochemical Laboratory
          </h2>

          <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed max-w-sm">
            Providing accurate and reliable geochemical analysis services
            for soil, water, and mineral samples using advanced laboratory techniques.
          </p>
        </div>

        {/* DIVIDER (mobile only) */}
        <div className="sm:hidden border-t border-gray-600"></div>

        {/* QUICK LINKS */}
        <div className="text-left">
          <h3 className="font-semibold text-base md:text-lg mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm sm:text-base text-gray-300">

            <li>
              <Link
                to="/"
                className="block hover:text-[#C9A24A] transition duration-200"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/services"
                className="block hover:text-[#C9A24A] transition duration-200"
              >
                Services
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="block hover:text-[#C9A24A] transition duration-200"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="block hover:text-[#C9A24A] transition duration-200"
              >
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* DIVIDER (mobile only) */}
        <div className="sm:hidden border-t border-gray-600"></div>

        {/* CONTACT */}
        <div className="text-left">
          <h3 className="font-semibold text-base md:text-lg mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-sm sm:text-base text-gray-300">

            <p>Kehancha, Migori Road</p>

            <p>P.O Box 110-40413</p>

            <p className="hover:text-[#C9A24A] transition">
              +2547 9452 8617
            </p>

            <p className="hover:text-[#C9A24A] transition break-all">
              genesisgeochemical@gmail.com
            </p>

          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-600 mt-10 pt-6 text-center text-xs sm:text-sm text-gray-400 px-2">
        © {new Date().getFullYear()} Genesis Geochemical Laboratory. All rights reserved.
      </div>

    </footer>
  );
}