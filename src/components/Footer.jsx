import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1E3A5F] text-white px-6 md:px-12 py-10">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* COMPANY */}
        <div>
          <h2 className="text-lg font-bold">
            Genesis Geochemical Laboratory
          </h2>

          <p className="text-sm text-gray-300 mt-4 leading-relaxed">
            Providing accurate and reliable geochemical analysis services
            for soil, water, and mineral samples using advanced laboratory techniques.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-[#C9A24A]">Home</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#C9A24A]">Services</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#C9A24A]">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#C9A24A]">Contact</Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>

          <p className="text-sm text-gray-300">
            Kehancha, Migori Road
          </p>

          <p className="text-sm text-gray-300 mt-2">
            P.O Box 110-40413
          </p>

          <p className="text-sm text-gray-300 mt-2">
            Phone: +2547 9452 8617
          </p>

          <p className="text-sm text-gray-300 mt-2">
            Email: genesisgeochemical@gmail.com
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-600 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Genesis Geochemical Laboratory. All rights reserved.
      </div>

    </footer>
  );
}