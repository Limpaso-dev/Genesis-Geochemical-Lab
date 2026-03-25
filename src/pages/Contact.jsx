export default function Contact() {
  return (
    <div className="px-6 md:px-12 py-12 md:py-16">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F]">
          Contact Us
        </h1>

        <div className="w-16 h-1 bg-[#C9A24A] mx-auto mt-4"></div>

        <p className="text-gray-600 mt-4 text-sm md:text-base">
          Reach out to us for inquiries, sample submissions, or more information.
        </p>
      </div>

      {/* CONTACT INFO + FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">

        {/* CONTACT DETAILS */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#1E3A5F] mb-4">
            Contact Information
          </h2>

          <div className="space-y-3 text-sm md:text-base text-gray-700">
            <p><strong>Location:</strong> Kehancha, Migori Road</p>
            <p><strong>P.O Box:</strong> 110-40413</p>
            <p><strong>Phone:</strong> 0119993392</p>
            <p><strong>Email:</strong> info@genesislab.com</p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#1E3A5F] mb-4">
            Send a Message
          </h2>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-[#1E3A5F] text-white py-3 rounded-lg hover:bg-[#163047] transition"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>

      {/* MAP (OPTIONAL VISUAL) */}
      <div className="mt-14 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold text-[#1E3A5F] mb-4 text-center">
          Our Location
        </h2>

        <div className="w-full h-[250px] md:h-[350px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm">
          Map coming soon...
        </div>
      </div>

    </div>
  );
}