import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F6F2]">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-grow pt-[70px] sm:pt-[75px] md:pt-[80px]">

        {/*global content wrapper */}
        <div className="w-full">
          <Outlet />
        </div>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}