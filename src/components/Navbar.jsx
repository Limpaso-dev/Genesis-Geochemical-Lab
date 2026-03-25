import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm px-6 py-4">
      <div className="flex justify-between items-center">
        
        {/* LOGO */}
        <h1 className="text-lg md:text-xl font-semibold text-[#1E3A5F]">
          Genesis Lab
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-[#C9A24A]">Home</Link>
          <Link to="/services" className="hover:text-[#C9A24A]">Services</Link>
          <Link to="/about" className="hover:text-[#C9A24A]">About</Link>
          <Link to="/contact" className="hover:text-[#C9A24A]">Contact</Link>
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
        <div className="mt-4 flex flex-col space-y-3 md:hidden">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}