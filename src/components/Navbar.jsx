import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/genesis-logo.jpeg";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-[#C9A24A] border-b-2 border-[#C9A24A] pb-1 transition duration-300"
      : "hover:text-[#C9A24A] transition duration-300";

  const mobileLinkStyle = ({ isActive }) =>
    isActive ? "text-[#C9A24A]" : "";

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm px-6 py-4 z-50">
      <div className="flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center space-x-2">
          <img 
            src={logo} 
            alt="Genesis Lab Logo" 
            className="h-8 md:h-10 object-contain"
          />
          <span className="text-xl md:text-lg font-bold text-[#1E3A5F]">
            GENESIS GEOCHEMICAL LAB
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden font-bold md:flex space-x-6">

          <NavLink to="/" end className={linkStyle}>
            HOME
          </NavLink>

          <NavLink to="/services" className={linkStyle}>
            SERVICES
          </NavLink>

          <NavLink to="/about" className={linkStyle}>
            ABOUT US
          </NavLink>

          <NavLink to="/contact" className={linkStyle}>
            CONTACT US
          </NavLink>

        </div>

        {/* MOBILE BUTTON */}
        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden text-[#1E3A5F]"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="mt-4 flex font-bold flex-col space-y-3 md:hidden">

          <NavLink 
            to="/" 
            end
            onClick={() => setOpen(false)} 
            className={mobileLinkStyle}
          >
            HOME
          </NavLink>

          <NavLink 
            to="/services" 
            onClick={() => setOpen(false)} 
            className={mobileLinkStyle}
          >
            SERVICES
          </NavLink>

          <NavLink 
            to="/about" 
            onClick={() => setOpen(false)} 
            className={mobileLinkStyle}
          >
            ABOUT US
          </NavLink>

          <NavLink 
            to="/contact" 
            onClick={() => setOpen(false)} 
            className={mobileLinkStyle}
          >
            CONTACT
          </NavLink>

        </div>
      )}
    </nav>
  );
}