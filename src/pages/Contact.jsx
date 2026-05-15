import { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Ubutumwa bwageze muri Backend!");
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-600 to-purple-800 flex items-center justify-center px-4 sm:px-6 py-10">

      <div className="w-full max-w-6xl bg-purple-950 rounded-3xl p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">

        <div className="text-white space-y-6">

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
              Let’s discuss <br />
              on something <span className="text-pink-500">cool</span> together
            </h2>
          </div>

          <div className="space-y-4 mt-6 sm:mt-10 text-sm sm:text-base">

            <p className="break-all">📧 mrkaboss263@gmail.com</p>

            <div className="border border-pink-500 rounded-xl px-5 py-3 inline-block">
              📞 +250732432829
            </div>

            <p>📍 afriQa Rwand gastibo nyabiheke</p>

          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6 pt-6 sm:pt-10 text-lg sm:text-xl">

            <a
              href="https://www.facebook.com/profile.php?id=61551680369242"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 p-3 rounded-full hover:bg-pink-600 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 p-3 rounded-full hover:bg-pink-600 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 p-3 rounded-full hover:bg-pink-600 transition"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 p-3 rounded-full hover:bg-pink-600 transition"
            >
              <FaGithub />
            </a>

          </div>

        </div>

        <div className="bg-gray-100 rounded-2xl p-5 sm:p-8 space-y-6">

          <div>
            <p className="text-sm mb-3">I’m interested in...</p>

            <div className="flex flex-wrap gap-3">
              {["UI/UX design", "Web design", "Graphic design", "Design system", "Other"].map((item, i) => (
                <button
                  key={i}
                  type="button"
                  className={`px-4 py-2 rounded-lg border text-sm sm:text-base ${
                    i === 0
                      ? "bg-pink-600 text-white"
                      : "border-gray-400 text-gray-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-pink-500 outline-none py-2 text-sm sm:text-base"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-400 outline-none py-2 text-sm sm:text-base"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-gray-400 outline-none py-2 text-sm sm:text-base"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition"
            >
              ✈ Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}