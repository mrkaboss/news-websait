import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* --- TOP SECTION --- */}
        <div className="grid md:grid-cols-12 gap-12 border-b border-white/5 pb-16">
          
          {/* Column 1: Intro */}
          <div className="md:col-span-4 space-y-6">
            <h2 className="text-3xl font-black bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Global News
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
              Trusted news covering technology, politics, sports, and global events. 
              Stay informed with our 24/7 real-time updates.
            </p>
            {/* Social Icons hano kugira ngo bijyane n'izina */}
            <div className="flex gap-4 pt-4">
              {[
                { icon: <FaFacebookF />, url: "https://www.facebook.com/profile.php?id=61551680369242" },
                { icon: <FaInstagram />, url: "https://instagram.com/yourusername" },
                { icon: <FaLinkedinIn />, url: "https://linkedin.com/in/yourusername" },
                { icon: <FaGithub />, url: "https://github.com/yourusername" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg hover:bg-pink-600 hover:-translate-y-1 transition-all duration-300 border border-white/10"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Big Title & Contact */}
          <div className="md:col-span-4 space-y-6">
            <h2 className="text-3xl font-bold leading-tight">
              Let’s discuss <br />
              on something <span className="text-pink-500 italic underline decoration-wavy">cool</span> together
            </h2>
            <div className="space-y-4 pt-4 text-sm font-medium">
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-pink-500">📧</span> mrkaboss263@gmail.com
              </div>
              <div className="inline-flex items-center gap-3 border border-pink-500/30 bg-pink-500/5 rounded-2xl px-6 py-3 text-pink-500">
                <span className="animate-pulse">📞</span> +250732432829
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-pink-500">📍</span> 123 Street 456 House
              </div>
            </div>
          </div>

          {/* Column 3: Company Links */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-lg font-bold border-b border-pink-500 w-fit pb-1">Company</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-pink-500 transition-colors flex items-center gap-2"><span>›</span> About Us</Link></li>
              <li><Link to="/NewsDetails" className="hover:text-pink-500 transition-colors flex items-center gap-2"><span>›</span> News Details</Link></li>
              <li><Link to="/breaking-news" className="hover:text-pink-500 transition-colors flex items-center gap-2"><span>›</span> Breaking News</Link></li>
            </ul>
          </div>

          
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-lg font-bold border-b border-pink-500 w-fit pb-1">Legal</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/terms" className="hover:text-pink-500 transition-colors flex items-center gap-2"><span>›</span> Terms of Use</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-pink-500 transition-colors flex items-center gap-2"><span>›</span> Privacy Policy</Link></li>
              <li><Link to="/AdminDashboard" className="hover:text-pink-500 transition-colors flex items-center gap-2"><span>›</span> Admin Access</Link></li>
            </ul>
          </div>

        </div>

  
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-4 uppercase tracking-widest">
          <p>© 2026 Global News. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition">Cookies</span>
            <span className="hover:text-white cursor-pointer transition">Security</span>
            <span className="hover:text-white cursor-pointer transition">Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
}