import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {

  return (

    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        <div>

          <h2 className="text-xl font-bold">
            Global News
          </h2>

          <p className="text-gray-400 mt-2">
            Trusted news covering technology, politics,
            sports, and global events.
          </p>

        </div>

        <div>

          <h3 className="font-semibold mb-3">
            Categories
          </h3>

          <ul className="space-y-2">

            <li><Link to="/teche">Teche</Link></li>
            <li><Link to="/business">Business</Link></li>
            <li><Link to="/sports">Sports</Link></li>
            <li><Link to="/politics">Politics</Link></li>

          </ul>

        </div>

        <div>

          <h3 className="font-semibold mb-3">
            Company
          </h3>

          <ul className="space-y-2">

            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/News">News</Link></li>
          </ul>

        </div>

        <div>

          <h3 className="font-semibold mb-3">
            Legal
          </h3>

          <ul className="space-y-2">

            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/AdminDashboard">AdminDashboard</Link></li>
            <li><Link to="/AddNews">Add News</Link></li>
            <li><Link to="/NewsDetails">NewsDetails</Link></li>
            <li><Link to="/breaking-news">BreakingNews</Link></li>
          </ul>

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

      <div className="text-center py-4 border-t border-gray-700 text-gray-400">
        © 2025 Global News. All rights reserved.
      </div>

    </footer>

  );

}