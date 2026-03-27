import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-600 to-purple-800 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl bg-purple-950 rounded-3xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div className="text-white space-y-6">

          <div>
            <h2 className="text-4xl font-bold leading-snug">
              Let’s discuss <br />
              on something <span className="text-pink-500">cool</span> together
            </h2>
          </div>

          <div className="space-y-4 mt-10">

            <p>📧 mrkaboss263@gmail.com</p>

            <div className="border border-pink-500 rounded-xl px-5 py-3 inline-block">
              📞 +250732432829
            </div>

            <p>📍 123 Street 456 House</p>

          </div>

          <div className="flex gap-6 pt-10 text-xl">

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

        <div className="bg-gray-100 rounded-2xl p-8 space-y-6">

          <div>
            <p className="text-sm mb-3">I’m interested in...</p>

            <div className="flex flex-wrap gap-3">
              {["UI/UX design", "Web design", "Graphic design", "Design system", "Other"].map((item, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-lg border ${
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

          
          <form className="space-y-6">

            <div>
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-transparent border-b-2 border-pink-500 outline-none py-2"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent border-b-2 border-gray-400 outline-none py-2"
              />
            </div>

            <div>
              <textarea
                placeholder="Your message"
                rows="4"
                className="w-full bg-transparent border-b-2 border-gray-400 outline-none py-2"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition"
            >
              ✈ Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}