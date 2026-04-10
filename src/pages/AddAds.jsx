import React, { useState } from "react";

export default function AddAds() {
  const [adData, setAdData] = useState({
    businessName: "",
    email: "",
    duration: "1 Week",
    description: "",
    banner: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Ibyo wamamaje:", adData);
    alert("Ubutumwa bwakiriwe, tuzakuvugisha vuba!");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 text-white text-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Amamaza Hano</h1>
          <p className="text-sm font-medium opacity-90">Tumaza ibikorwa byanyu kugera ku bantu benshi</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Izina rya Business</label>
            <input 
              type="text" 
              className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-orange-500 outline-none transition"
              placeholder="Urugero: Kaboss Tech"
              onChange={(e) => setAdData({...adData, businessName: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email yawe</label>
              <input 
                type="email" 
                className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-orange-500 outline-none transition"
                placeholder="example@gmail.com"
                onChange={(e) => setAdData({...adData, email: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Igihe uzamara</label>
              <select 
                className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-orange-500 outline-none transition"
                onChange={(e) => setAdData({...adData, duration: e.target.value})}
              >
                <option>1 Week</option>
                <option>1 Month</option>
                <option>Indefinite</option>
                <option>Other</option>
                <option>1 days</option>
            <select 
  className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-orange-500 outline-none transition bg-white"
  value={adData.duration} // Bituma React igumana agaciro wahisemo
  onChange={(e) => setAdData({...adData, duration: e.target.value})}
>
  <option value="">Hitamo igihe bizamara...</option>
  <option value="1">Umunsi 1 (1 Day)</option>
  <option value="7">Icyumweru 1 (7 Days)</option>
  <option value="15">Iminsi 15 (15 Days)</option>
  <option value="28">Ukwezi 1 (28 Days)</option>
</select>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Ibisobanuro by'ibyo wamamaza</label>
            <textarea 
              className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-orange-500 outline-none transition h-32"
              placeholder="Vuga muri make ibyo ukora..."
              onChange={(e) => setAdData({...adData, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Banner (Ifoto)</label>
            <input 
              type="file" 
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              onChange={(e) => setAdData({...adData, banner: e.target.files[0]})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all transform active:scale-95 shadow-lg"
          >
            Ohereza Iyamamaza →
          </button>
        </form>
      </div>
    </div>
  );
}