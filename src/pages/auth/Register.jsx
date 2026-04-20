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
    <div ref={ref} style={{ textAlign: "center" }}>
      <p style={{ fontSize: "32px", fontWeight: 900, color: "#DC2626", lineHeight: 1, margin: 0 }}>
        {count.toLocaleString()}+
      </p>
      <p style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: 600, marginTop: "4px", letterSpacing: "1px", textTransform: "uppercase" }}>
        {label}
      </p>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", country: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const filteredCountries = COUNTRIES.filter(c =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
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
    <div style={{ minHeight: "100vh", background: "#f8f7f4", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .field { width:100%; padding:12px 16px; background:#F9FAFB; border:1.5px solid #E5E7EB; border-radius:12px; font-size:14px; outline:none; transition:border-color 0.2s; box-sizing:border-box; }
        .field:focus { border-color:#DC2626; }
        .submit-btn { width:100%; padding:14px; background:#DC2626; color:#fff; border:none; border-radius:14px; font-weight:900; font-size:15px; cursor:pointer; transition:all 0.2s; letter-spacing:0.5px; }
        .submit-btn:hover { background:#B91C1C; transform:translateY(-1px); }
        .submit-btn:active { transform:scale(0.98); }
        .submit-btn:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
      `}</style>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>

        {/* LEFT — Branding */}
        <div style={{ background: "#111", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px", position: "relative", overflow: "hidden" }}>
          {/* BG pattern */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 80%, #DC262622 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1D4ED822 0%, transparent 50%)" }} />

          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "48px" }}>
              <span style={{ fontSize: "26px", fontWeight: 900, color: "#fff" }}>NEWS</span>
              <span style={{ fontSize: "26px", fontWeight: 900, color: "#DC2626" }}>WIRE</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px,3vw,44px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: "16px" }}>
              Join the World's News Community
            </h2>
            <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: 1.7, maxWidth: "360px" }}>
              Sign up for free — Read, share, and follow global news every day.
            </p>
          </div>

          {/* Stats */}
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", paddingTop: "40px", borderTop: "1px solid #1F2937" }}>
            <AnimatedCounter target={12400} label="Readers" />
            <AnimatedCounter target={3800} label="Stories" />
            <AnimatedCounter target={195} label="Countries" />
          </div>
        </div>

        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px", background: "#f8f7f4", animation: "fadeUp 0.5s ease" }}>
          <div style={{ width: "100%", maxWidth: "400px" }}>

            <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#111", marginBottom: "4px" }}>Create Account</h1>
            <p style={{ color: "#9CA3AF", fontSize: "14px", marginBottom: "28px" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#DC2626", fontWeight: 700, textDecoration: "none" }}>Login here</Link>
            </p>

            {error && (
              <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "10px", padding: "10px 14px", marginBottom: "16px", fontSize: "13px", color: "#DC2626", fontWeight: 600 }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              
              <div>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Full Name</label>
                <input
                  className="field"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              
              <div>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Email</label>
                <input
                  className="field"
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              
              <div>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Password</label>
                <input
                  className="field"
                  type="password"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              
              <div ref={dropdownRef}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Country</label>
                <div style={{ position: "relative" }}>
                  <input
                    className="field"
                    type="text"
                    placeholder="Search your country..."
                    value={form.country || countrySearch}
                    onChange={e => { setCountrySearch(e.target.value); setForm({ ...form, country: "" }); setShowDropdown(true); }}
                    onFocus={() => setShowDropdown(true)}
                    required
                    readOnly={!!form.country}
                    onClick={() => { if (form.country) { setForm({ ...form, country: "" }); setCountrySearch(""); setShowDropdown(true); } }}
                  />
                  {showDropdown && filteredCountries.length > 0 && !form.country && (
                    <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: "12px", maxHeight: "200px", overflowY: "auto", zIndex: 100, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
                      {filteredCountries.map(country => (
                        <div
                          key={country}
                          onClick={() => { setForm({ ...form, country }); setCountrySearch(country); setShowDropdown(false); }}
                          style={{ padding: "10px 16px", fontSize: "14px", cursor: "pointer", borderBottom: "1px solid #F3F4F6", transition: "background 0.15s" }}
                          onMouseEnter={e => e.currentTarget.style.background = "#FEF2F2"}
                          onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                        >
                          {country}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading} style={{ marginTop: "6px" }}>
                {loading ? "Creating account..." : "Create Account →"}
              </button>
            </form>

            <p style={{ fontSize: "11px", color: "#D1D5DB", textAlign: "center", marginTop: "20px" }}>
              By signing up, you agree to our{" "}
              <a href="#" style={{ color: "#9CA3AF", textDecoration: "underline" }}>Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}