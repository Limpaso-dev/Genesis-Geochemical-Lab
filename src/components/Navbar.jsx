import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/genesis-logo.jpeg";

const links = [
  { name: "HOME", path: "/" },
  { name: "SERVICES", path: "/services" },
  { name: "ABOUT US", path: "/about" },
  { name: "VERIFY RESULTS", path: "/verify" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (open) {
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
            : "bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex w-[min(1200px,calc(100%-2rem))] items-center justify-between py-3">

          {/* LOGO */}
          <NavLink
            to="/"
            className="flex items-center gap-3 flex-shrink-0"
          >
            <img
              src={logo}
              alt="Genesis Geochemical Laboratory"
              className="h-11 w-11 object-contain"
            />

            <div className="leading-tight">
              <h1 className="text-lg font-extrabold tracking-[0.12em] text-[#1E3A5F]">
                GENESIS
              </h1>

              <p className="uppercase text-[11px] font-extrabold tracking-[0.22em] text-gray-500">
                Geochemical Laboratory
              </p>
            </div>
          </NavLink>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-14">

            <nav className="flex items-center gap-2">

              {links.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 ${
                      isActive
                        ? "bg-[#C9A24A]/10 text-[#C9A24A]"
                        : "text-[#1E3A5F] hover:bg-[#C9A24A]/10 hover:text-[#C9A24A]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

            </nav>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-3">

              <NavLink
                to="/contact"
                className="rounded-full bg-[#C9A24A] px-6 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b8913f]"
              >
                Contact Us
              </NavLink>

              <NavLink
                to="/admin/reports"
                className="rounded-full border border-[#1E3A5F]/20 px-5 py-2.5 font-medium text-[#1E3A5F] transition-all duration-300 hover:bg-[#1E3A5F] hover:text-white"
              >
                Admin Login
              </NavLink>

            </div>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
            aria-label="Toggle Menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="border-t border-gray-200 bg-white shadow-xl md:hidden"
            >
              <div className="mx-auto flex w-[min(1200px,calc(100%-2rem))] flex-col py-5">

                {links.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-[#C9A24A]/10 text-[#C9A24A]"
                          : "text-[#1E3A5F] hover:bg-[#C9A24A]/10 hover:text-[#C9A24A]"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                <div className="mt-5 flex flex-col gap-3">

                  <NavLink
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-[#C9A24A] py-3 text-center font-semibold text-white shadow-md transition hover:bg-[#b8913f]"
                  >
                    Contact Us
                  </NavLink>

                  <NavLink
                    to="/admin/reports"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-[#1E3A5F]/20 py-3 text-center font-semibold text-[#1E3A5F] transition hover:bg-[#1E3A5F] hover:text-white"
                  >
                    Admin Login
                  </NavLink>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-1" />
    </>
  );
}