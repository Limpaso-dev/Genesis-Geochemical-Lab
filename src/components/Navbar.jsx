import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/genesis-logo.jpeg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🔥 Detect scroll for shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkBase =
    "relative text-[#1E3A5F] font-semibold hover:text-[#C9A24A] transition duration-300";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition duration-300 ${
        scrolled
          ? "bg-white shadow-md backdrop-blur"
          : "bg-white/80 backdrop-blur"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Logo"
            className="h-9 md:h-10 object-contain"
          />
          <span className="text-sm md:text-lg font-bold text-[#1E3A5F] tracking-wide">
            GENESIS GEOCHEMICAL LAB
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-8">

          {[
            { name: "HOME", path: "/" },
            { name: "SERVICES", path: "/services" },
            { name: "ABOUT", path: "/about" },
          ].map((item) => (
            <NavLink key={item.name} to={item.path} end={item.path === "/"}>
              {({ isActive }) => (
                <span className={`${linkBase}`}>
                  {item.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-[#C9A24A] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}

          {/* CTA */}
          <NavLink
            to="/contact"
            className="bg-[#C9A24A] text-white px-5 py-2 rounded-lg hover:bg-[#b8913f] transition duration-300 shadow-sm hover:scale-105"
          >
            Contact Us
          </NavLink>

        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center items-center space-y-1"
        >
          <span
            className={`block w-6 h-0.5 bg-[#1E3A5F] transition ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#1E3A5F] transition ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#1E3A5F] transition ${
              open ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* 🔥 MOBILE MENU ANIMATION */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t px-6 py-6 space-y-4 shadow-md"
          >
            {[
              { name: "HOME", path: "/" },
              { name: "SERVICES", path: "/services" },
              { name: "ABOUT", path: "/about" },
            ].map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setOpen(false)}
                className="block text-[#1E3A5F] font-semibold"
              >
                {item.name}
              </NavLink>
            ))}

            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="block text-center bg-[#C9A24A] text-white py-2 rounded-lg"
            >
              CONTACT US
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}