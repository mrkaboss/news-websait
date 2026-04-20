import React, { useState } from "react";
import API_URL from "../config/api.js";

export default function AddAds() {
  const [adData, setAdData] = useState({
    businessName: "",
    email: "",
    duration: "7",
    description: "",
    banner: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("businessName", adData.businessName);
      formData.append("email", adData.email);
      formData.append("duration", adData.duration);
      formData.append("description", adData.description);
      if (adData.banner) formData.append("banner", adData.banner);

      const res = await fetch(`${API_URL}/api/v1/ads`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) { setError(data.message || "Something went wrong"); return; }
      setSuccess(true);
    } catch {
      setError("Server error — Please try again");
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-black text-gray-900 mb-3">Ad Submitted!</h2>
        <p className="text-gray-500 mb-8">Your advertisement request has been received. We will contact you shortly.</p>
        <button
          onClick={() => { setSuccess(false); setAdData({ businessName: "", email: "", duration: "7", description: "", banner: null }); }}
          className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-black hover:bg-orange-600 transition"
        >
          Submit Another Ad
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 text-white text-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Advertise Here</h1>
          <p className="text-sm font-medium opacity-90 mt-1">Reach thousands of readers every day</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm font-semibold">
              ⚠️ {error}
            </div>
          )}

          
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Business Name</label>
            <input
              type="text"
              className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-orange-500 outline-none transition"
              placeholder="e.g. Kaboss Tech"
              value={adData.businessName}
              onChange={(e) => setAdData({ ...adData, businessName: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-orange-500 outline-none transition"
                placeholder="example@gmail.com"
                value={adData.email}
                onChange={(e) => setAdData({ ...adData, email: e.target.value })}
                required
              />
            </div>

            
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Duration</label>
              <select
                className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-orange-500 outline-none transition bg-white"
                value={adData.duration}
                onChange={(e) => setAdData({ ...adData, duration: e.target.value })}
              >
                <option value="1">1 Day</option>
                <option value="7">1 Week (7 Days)</option>
                <option value="15">15 Days</option>
                <option value="28">1 Month (28 Days)</option>
              </select>
            </div>
          </div>

          
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Ad Description</label>
            <textarea
              className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-orange-500 outline-none transition h-32 resize-none"
              placeholder="Briefly describe your business or product..."
              value={adData.description}
              onChange={(e) => setAdData({ ...adData, description: e.target.value })}
            />
          </div>

          
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Banner Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              onChange={(e) => setAdData({ ...adData, banner: e.target.files[0] })}
            />
            {adData.banner && (
              <p className="text-xs text-green-600 font-semibold mt-2">✓ {adData.banner.name}</p>
            )}
          </div>

         
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all transform active:scale-95 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Advertisement →"}
          </button>
        </form>
      </div>
    </div>
  );
}