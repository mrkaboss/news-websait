import React, { useState } from "react";
import API_URL from "../config/api.js";

export default function AddAds() {
  const [adData, setAdData] = useState({
    businessName: "",
    email: "",
    duration: "7",
    description: "",
    banner: null,
    paymentMethod: "momo", // Default payment method
    phoneNumber: "" // To track payment phone number
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Function to calculate price based on duration
  const getPrice = (duration) => {
    switch (duration) {
      case "1": return { rwf: 2000, usd: 2 };
      case "7": return { rwf: 12000, usd: 10 };
      case "15": return { rwf: 22000, usd: 18 };
      case "28": return { rwf: 40000, usd: 32 };
      default: return { rwf: 12000, usd: 10 };
    }
  };

  const currentPrice = getPrice(adData.duration);

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
      formData.append("amount", currentPrice.rwf); // Sending the price to backend
      formData.append("paymentMethod", adData.paymentMethod);
      formData.append("paymentPhone", adData.phoneNumber);
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
        <p className="text-gray-500 mb-8">Your advertisement request has been received. Please complete the payment prompt sent to your phone.</p>
        <button
          onClick={() => { setSuccess(false); setAdData({ businessName: "", email: "", duration: "7", description: "", banner: null, paymentMethod: "momo", phoneNumber: "" }); }}
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

          {/* Business Name */}
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
                type="type"
                className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-orange-500 outline-none transition"
                placeholder="example@gmail.com"
                value={adData.email}
                onChange={(e) => setAdData({ ...adData, email: e.target.value })}
                required
              />
            </div>

            {/* Duration */}
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

          {/* Pricing Section (Dynamic Display) */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-orange-700 uppercase tracking-wider">Total Pricing</h4>
              <p className="text-gray-500 text-xs mt-0.5">Calculated based on chosen duration</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-orange-600">{currentPrice.rwf.toLocaleString()} RWF</span>
              <span className="block text-xs text-gray-400">~ ${currentPrice.usd} USD</span>
            </div>
          </div>

          {/* Ad Description */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Ad Description</label>
            <textarea
              className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-orange-500 outline-none transition h-28 resize-none"
              placeholder="Briefly describe your business or product..."
              value={adData.description}
              onChange={(e) => setAdData({ ...adData, description: e.target.value })}
            />
          </div>

          {/* Banner Image */}
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

          <hr className="border-gray-100 my-6" />

          {/* Payment Method Section */}
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase text-gray-500">Select Payment Method</label>
            
            <div className="grid grid-cols-2 gap-4">
              {/* MoMo */}
              <div 
                onClick={() => setAdData({ ...adData, paymentMethod: "momo" })}
                className={`border-2 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition ${adData.paymentMethod === "momo" ? "border-yellow-500 bg-yellow-50/40" : "border-gray-100 hover:border-gray-200"}`}
              >
                <span className="font-bold text-sm text-gray-800">MTN MoMo</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${adData.paymentMethod === "momo" ? "border-yellow-500 bg-yellow-500" : "border-gray-300"}`}>
                  {adData.paymentMethod === "momo" && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                </div>
              </div>

              {/* Airtel Money */}
              <div 
                onClick={() => setAdData({ ...adData, paymentMethod: "airtel" })}
                className={`border-2 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition ${adData.paymentMethod === "airtel" ? "border-red-500 bg-red-50/40" : "border-gray-100 hover:border-gray-200"}`}
              >
                <span className="font-bold text-sm text-gray-800">Airtel Money</span>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${adData.paymentMethod === "airtel" ? "border-red-500 bg-red-500" : "border-gray-300"}`}>
                  {adData.paymentMethod === "airtel" && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                </div>
              </div>
            </div>

            {/* Mobile Number Input */}
            <div>
              <input
                type="tel"
                className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-orange-500 outline-none transition"
                placeholder="e.g. 078XXXXXXX or 073XXXXXXX"
                value={adData.phoneNumber}
                onChange={(e) => setAdData({ ...adData, phoneNumber: e.target.value })}
                required
              />
              <p className="text-[11px] text-gray-400 mt-1.5 pl-1">Enter your active mobile wallet number to receive the payment prompt.</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all transform active:scale-95 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : `Pay & Submit (${currentPrice.rwf.toLocaleString()} RWF) →`}
          </button>
        </form>
      </div>
    </div>
  );
}