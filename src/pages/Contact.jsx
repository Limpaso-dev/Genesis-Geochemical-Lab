import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

export default function Contact() {

  const form = useRef(); // ✅ ADD THIS

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_lf27h5k",
      "template_5w4gwap",
      form.current, // ✅ FIXED (was e.target)
      "ffyUIxmO3hO86xE42"
    )
    .then(() => {
      alert("Message sent successfully!");
      form.current.reset(); // ✅ better than e.target.reset()
    })
    .catch((error) => {
      console.log(error); // ✅ helps debugging
      alert("Failed to send message. Try again.");
    });
  };

  return (
    <div className="px-6 md:px-12 py-14 md:py-20">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F]">
          Contact Us
        </h1>

        <div className="w-16 md:w-20 h-1 bg-[#C9A24A] mx-auto mt-4"></div>

        <p className="text-gray-600 font-bold mt-4 text-sm md:text-base max-w-2xl mx-auto">
          Reach out to us for inquiries, sample submissions, or more information.
        </p>
      </div>

      {/* CONTACT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* CONTACT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white border rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-[#1E3A5F] mb-6">
            Contact Information
          </h2>

          <div className="space-y-5 text-gray-700 text-sm md:text-base">
            <div>
              <p className="font-semibold text-[#1E3A5F]">Location</p>
              <p>Kehancha, Kehancha-Migori Road</p>
            </div>

            <div>
              <p className="font-semibold text-[#1E3A5F]">P.O Box</p>
              <p>110-40413</p>
            </div>

            <div>
              <p className="font-semibold text-[#1E3A5F]">Phone</p>
              <p>+2547 5735 8237</p>
            </div>

            <div>
              <p className="font-semibold text-[#1E3A5F]">Email</p>
              <p>genesisgeochemical@gmail.com</p>
            </div>
          </div>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white border rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-[#1E3A5F] mb-6">
            Send a Message
          </h2>

          {/* ✅ IMPORTANT FIX HERE */}
          <form ref={form} onSubmit={sendEmail} className="space-y-5">

            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              required
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24A] transition"
            />

            <input
              type="email"
              name="from_email"
              placeholder="Your Email"
              required
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24A] transition"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              required
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24A] transition"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-[#1E3A5F] text-white py-3 rounded-lg hover:bg-[#163047] transition duration-300 hover:scale-[1.02]"
            >
              Send Message
            </button>

          </form>
        </motion.div>

      </div>

      {/* MAP SECTION */}
      <div className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold text-[#1E3A5F] mb-6 text-center">
          Our Location
        </h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full h-[250px] md:h-[350px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm shadow-sm"
        >
          Map coming soon...
        </motion.div>
      </div>

    </div>
  );
}