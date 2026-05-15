import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
// import API_URL from "../config/api.js";

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia",
  "Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Belarus","Belgium","Belize",
  "Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei",
  "Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Chad","Chile",
  "China","Colombia","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic",
  "Denmark","Djibouti","Dominican Republic","Ecuador","Egypt","El Salvador","Estonia",
  "Ethiopia","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece",
  "Guatemala","Guinea","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran",
  "Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya",
  "Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Liberia","Libya","Lithuania",
  "Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania",
  "Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique",
  "Myanmar","Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria",
  "North Korea","Norway","Oman","Pakistan","Panama","Paraguay","Peru","Philippines",
  "Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saudi Arabia","Senegal",
  "Serbia","Sierra Leone","Singapore","Slovakia","Slovenia","Somalia","South Africa",
  "South Korea","South Sudan","Spain","Sri Lanka","Sudan","Sweden","Switzerland","Syria",
  "Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tunisia","Turkey","Turkmenistan",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay",
  "Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

function AnimatedCounter({ target, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(start);
        }, 24);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-black text-red-600 leading-none m-0">
        {count.toLocaleString()}+
      </p>
      <p className="text-xs text-gray-400 font-semibold mt-1 tracking-widest uppercase">
        {label}
      </p>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm]               = useState({ name: "", email: "", password: "", country: "" });
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [showDropdown, setShowDropdown]   = useState(false);
  const [showPassword, setShowPassword]   = useState(false);
  const dropdownRef = useRef(null);

  const filteredCountries = COUNTRIES.filter(c =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.country) { setError("Please select your country!"); return; }
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Something went wrong"); return; }
      navigate("/login");
    } catch {
      setError("Server error — Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] font-sans flex flex-col">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .register-animate { animation: fadeUp 0.5s ease; }
      `}</style>

      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 min-h-screen">

        {/* ── LEFT — Branding ─────────────────────────────── */}
        <div className="relative bg-[#111] flex flex-col justify-between p-8 sm:p-12
                        lg:min-h-screen
                        /* mobile: compact top banner */
                        max-lg:py-10 max-lg:min-h-0">

          {/* BG gradients */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 20% 80%, #DC262622 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1D4ED822 0%, transparent 50%)" }}
          />

          {/* Logo + headline */}
          <div className="relative">
            <div className="flex items-baseline gap-1 mb-8 lg:mb-12">
              <span className="text-2xl font-black text-white">NEWS</span>
              <span className="text-2xl font-black text-red-600">WIRE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              Join the World's<br className="hidden sm:block" /> News Community
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm">
              Sign up for free — Read, share, and follow global news every day.
            </p>
          </div>

          {/* Stats — hidden on very small screens */}
          <div className="relative mt-10 pt-8 border-t border-gray-800
                          grid grid-cols-3 gap-4
                          max-sm:hidden">
            <AnimatedCounter target={12400} label="Readers" />
            <AnimatedCounter target={3800}  label="Stories" />
            <AnimatedCounter target={195}   label="Countries" />
          </div>
        </div>

        {/* ── RIGHT — Form ─────────────────────────────────── */}
        <div className="register-animate flex items-center justify-center
                        px-6 py-12 sm:px-10 bg-[#f8f7f4]">
          <div className="w-full max-w-md">

            <h1 className="text-3xl font-black text-gray-900 mb-1">Create Account</h1>
            <p className="text-gray-400 text-sm mb-7">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600 font-bold no-underline hover:underline">
                Login here
              </Link>
            </p>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm text-red-600 font-semibold">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-[1.5px] border-gray-200 rounded-xl text-sm outline-none focus:border-red-500 transition box-border"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-[1.5px] border-gray-200 rounded-xl text-sm outline-none focus:border-red-500 transition box-border"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border-[1.5px] border-gray-200 rounded-xl text-sm outline-none focus:border-red-500 transition box-border"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              {/* Country */}
              <div ref={dropdownRef}>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Country
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search your country..."
                    value={form.country || countrySearch}
                    onChange={e => {
                      setCountrySearch(e.target.value);
                      setForm({ ...form, country: "" });
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    readOnly={!!form.country}
                    onClick={() => {
                      if (form.country) {
                        setForm({ ...form, country: "" });
                        setCountrySearch("");
                        setShowDropdown(true);
                      }
                    }}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border-[1.5px] border-gray-200 rounded-xl text-sm outline-none focus:border-red-500 transition box-border"
                  />

                  {/* Selected check */}
                  {form.country && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm">✓</span>
                  )}

                  {/* Dropdown */}
                  {showDropdown && filteredCountries.length > 0 && !form.country && (
                    <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border-[1.5px] border-gray-200 rounded-xl max-h-48 overflow-y-auto z-50 shadow-xl">
                      {filteredCountries.map(country => (
                        <div
                          key={country}
                          onClick={() => {
                            setForm({ ...form, country });
                            setCountrySearch(country);
                            setShowDropdown(false);
                          }}
                          className="px-4 py-2.5 text-sm cursor-pointer border-b border-gray-50 last:border-0 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          {country}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1 py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-[15px] rounded-2xl tracking-wide transition hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {loading ? "Creating account..." : "Create Account →"}
              </button>
            </form>

            <p className="text-[11px] text-gray-300 text-center mt-5">
              By signing up, you agree to our{" "}
              <a href="#" className="text-gray-400 underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}