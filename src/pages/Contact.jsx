import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_lf27h5k",
        "template_5w4gwap",
        form.current,
        "ffyUIxmO3hO86xE42"
      )
      .then(() => {
        alert("Message sent successfully!");
        form.current.reset();
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to send message. Try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-16 lg:py-20">

      {/* HEADER */}
      <div className="text-center mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A5F]">
          Contact Us
        </h1>

        <div className="w-16 sm:w-20 h-1 bg-[#C9A24A] mx-auto mt-4 rounded-full"></div>

        <p className="text-gray-600 mt-4 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Reach out to us for inquiries, sample submissions, or more information.
        </p>
      </div>

      {/* CONTACT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14 max-w-6xl mx-auto">

        {/* CONTACT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-bold text-[#1E3A5F] mb-6">
            Contact Information
          </h2>

          <div className="space-y-5 text-gray-700 text-sm sm:text-base">

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
              <p className="hover:text-[#C9A24A] transition">
                +2547 9452 8617
              </p>
            </div>

            <div>
              <p className="font-semibold text-[#1E3A5F]">Email</p>
              <p className="hover:text-[#C9A24A] transition break-all">
                genesisgeochemical@gmail.com
              </p>
            </div>

          </div>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-semibold text-[#1E3A5F] mb-6">
            Send a Message
          </h2>

          <form ref={form} onSubmit={sendEmail} className="space-y-5">

            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              required
              className="w-full border rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#C9A24A] transition"
            />

            <input
              type="email"
              name="from_email"
              placeholder="Your Email"
              required
              className="w-full border rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#C9A24A] transition"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              required
              className="w-full border rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#C9A24A] transition resize-none"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E3A5F] text-white py-3 rounded-lg font-medium 
              hover:bg-[#163047] transition duration-300 
              hover:scale-[1.02] active:scale-[0.98]
              disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </motion.div>

      </div>

      {/* MAP SECTION */}
      <div className="mt-14 md:mt-20 max-w-6xl mx-auto">

        <h2 className="text-xl sm:text-2xl font-semibold text-[#1E3A5F] mb-6 text-center">
          Our Location (MAP)
        </h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full h-[220px] sm:h-[280px] md:h-[350px] lg:h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 text-sm shadow-sm"
        >
          Map coming soon...
        </motion.div>

      </div>

    </div>
  );
}