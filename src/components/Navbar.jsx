import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/genesis-logo.jpeg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🔥 Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (open) setOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  // 🔥 Bold + premium links
  const linkBase =
    "relative text-[#1E3A5F] font-bold tracking-wide hover:text-[#C9A24A] transition duration-300";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-white/80 backdrop-blur"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-3 md:py-4 flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center gap-2 sm:gap-3 max-w-[70%]">
          <img
            src={logo}
            alt="Genesis Logo"
            className="h-8 sm:h-9 md:h-10 object-contain flex-shrink-0"
          />
          <span className="text-xs sm:text-sm md:text-lg font-bold text-[#1E3A5F] tracking-wide truncate">
            GENESIS GEOCHEMICAL LAB
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-10">

          {[
            { name: "HOME", path: "/" },
            { name: "SERVICES", path: "/services" },
            { name: "ABOUT US", path: "/about" },
          ].map((item) => (
            <NavLink key={item.name} to={item.path} end={item.path === "/"}>
              {({ isActive }) => (
                <span className={linkBase}>
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
            className="bg-[#C9A24A] text-white px-5 py-2 rounded-lg font-semibold 
            hover:bg-[#b8913f] transition duration-300 
            hover:scale-[1.05] active:scale-[0.97]"
          >
            Contact Us
          </NavLink>

        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center items-center space-y-1.5"
        >
          <span
            className={`block w-6 h-0.5 bg-[#1E3A5F] transition ${
              open ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#1E3A5F] transition ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#1E3A5F] transition ${
              open ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* 🔥 MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-t shadow-xl z-40"
          >
            <div className="px-6 py-6 flex flex-col space-y-5">

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
                  className="text-[#1E3A5F] font-bold tracking-wide text-base hover:text-[#C9A24A] transition"
                >
                  {item.name}
                </NavLink>
              ))}

              {/* CTA */}
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="bg-[#C9A24A] text-white py-2.5 rounded-lg text-center font-semibold 
                hover:bg-[#b8913f] transition duration-300"
              >
                Contact Us
              </NavLink>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}