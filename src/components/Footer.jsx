import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-red-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-bold text-white">
            News
          </h2>
          <p className="mt-3 text-sm">
            Bringing you the latest news from across the globe.”
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">Services</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white">Register</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact
          </h3>
          <p className="text-sm">Email: mrkaboss263@gmail.com</p>
          <p className="text-sm">Phone: +250 732432829</p>
          <p className="text-sm">Location: Rwanda</p>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} News Media Apps
      </div>
    </footer>
  );
};

export default Footer;
