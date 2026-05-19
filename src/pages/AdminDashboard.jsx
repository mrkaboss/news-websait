import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaCopyright, FaBan, FaShieldAlt, FaFileAlt, FaCheckCircle } from 'react-icons/fa';
import API_URL from '../config/api.js';

export default function AdminDashboard() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Modals States
  const [selectedStory, setSelectedStory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCopyrightModalOpen, setIsCopyrightModalOpen] = useState(false);
  const [isViolationModalOpen, setIsViolationModalOpen] = useState(false);

  // Form states ku bihano
  const [copyrightDetails, setCopyrightDetails] = useState({ originalAuthor: "", compensationFee: "" });
  const [violationReason, setViolationReason] = useState("");

  const token = localStorage.getItem("token"); // Fata token ngo harebwe niba uri admin

  // 1. Fata inkuru zose zihari ngo uzicungire hano
  const fetchAllStories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/v1/news`);
      if (!res.ok) throw new Error("Ntabwo byashobotse gufata data kuri server.");
      const data = await res.json();
      
      const newsArray = Array.isArray(data) ? data : data.data || data.news || [];
      setStories(newsArray);
    } catch (err) {
      setError(err.message || "Ikibazo mu guhura na Server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStories();
  }, []);

  // Flash Success Alerts Handler
  const triggerSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  // 2. GUSIBA INKURU (Delete Operation)
  const handleConfirmDelete = async () => {
    if (!selectedStory) return;
    try {
      const res = await fetch(`${API_URL}/api/v1/news/${selectedStory._id || selectedStory.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Gusiba inkuru byanze.");
      
      setStories(prev => prev.filter(item => (item._id || item.id) !== (selectedStory._id || selectedStory.id)));
      triggerSuccess("Inkuru yasibwe kurenza mu buryo burundu!");
      setIsDeleteModalOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // 3. GUTANGA COPYRIGHT STRIKE / COPYRIGHT INFRINGEMENT
  const handleConfirmCopyright = async (e) => {
    e.preventDefault();
    if (!selectedStory) return;
    
    try {
      // Hano uhamagara endpoint ya backend ishinzwe Copyright logic
      const res = await fetch(`${API_URL}/api/v1/admin/copyright-strike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          newsId: selectedStory._id || selectedStory.id,
          authorId: selectedStory.author?._id || selectedStory.author?.id,
          ...copyrightDetails
        })
      });

      if (!res.ok) throw new Error("Guhana uwayikopeye byagize ikibazo.");

      triggerSuccess(`Ibihano bya Copyright byatanzwe kuri: ${selectedStory.author?.name || "Uwanditse"}`);
      setIsCopyrightModalOpen(false);
      setCopyrightDetails({ originalAuthor: "", compensationFee: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  // 4. GUHANA UWAVIOYE AMAMABWIRIZA (Violation & Ban User)
  const handleConfirmViolation = async (e) => {
    e.preventDefault();
    if (!selectedStory) return;

    try {
      // Hano uhamagara endpoint ishinzwe guhagarika cyangwa guhana uwishe amategeko
      const res = await fetch(`${API_URL}/api/v1/admin/user-violation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: selectedStory.author?._id || selectedStory.author?.id,
          newsId: selectedStory._id || selectedStory.id,
          reason: violationReason
        })
      });

      if (!res.ok) throw new Error("Guhana uwishe amategeko byanze.");

      triggerSuccess("Uwishe amategeko yahanwe n'inkuru ye ikurwaho!");
      setIsViolationModalOpen(false);
      setViolationReason("");
      fetchAllStories(); // Refresh data gusa
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mb-2" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased pb-20">
      
      {/* Top Admin Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 py-6 px-6 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600/20 text-red-500 rounded-xl border border-red-500/30">
              <FaShieldAlt className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight uppercase">Project Control Center</h1>
              <p className="text-xs text-slate-400 font-mono">[Role: Central Administrator Mode]</p>
            </div>
          </div>
          <Link to="/" className="text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition border border-slate-700">
            // back_to_website
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">

        {/* Success Toast System */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center gap-3 font-mono text-sm animate-bounce">
            <FaCheckCircle /> {successMessage}
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Active Logs</p>
            <p className="text-4xl font-black mt-2 text-blue-400">{stories.length}</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Copyright System Status</p>
            <p className="text-xs font-mono mt-3 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded w-fit">ACTIVE_SHIELD</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Auto-Moderation Nodes</p>
            <p className="text-xs font-mono mt-3 text-amber-400 bg-amber-500/10 px-2 py-1 rounded w-fit">MONITORING_TRAFFIC</p>
          </div>
        </div>

        {/* Content Table / Grid Control Panel */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 className="font-extrabold text-lg uppercase tracking-tight flex items-center gap-2">
              <FaFileAlt className="text-slate-400" /> Live Post Registers
            </h2>
          </div>

          {stories.length === 0 ? (
            <div className="text-center py-20 text-slate-500 font-mono text-sm">
              No content documents found on server database.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs font-mono uppercase bg-slate-950/40">
                    <th className="p-4 pl-6">Cover & Title</th>
                    <th className="p-4">Author / Reporter</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 pr-6 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {stories.map((story) => (
                    <tr key={story._id || story.id} className="hover:bg-slate-800/30 transition-colors group">
                      {/* Cover & Title */}
                      <td className="p-4 pl-6 max-w-md">
                        <div className="flex items-center gap-4">
                          <img 
                            src={story.image || `${API_URL}/${story.banner}`} 
                            alt="" 
                            className="w-14 h-14 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                            onError={e => e.currentTarget.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150"}
                          />
                          <div>
                            <h3 className="font-bold text-slate-100 group-hover:text-red-400 transition-colors line-clamp-1">{story.title}</h3>
                            <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {(story._id || story.id).substring(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      
                      {/* Author */}
                      <td className="p-4">
                        <span className="font-medium text-slate-300">{story.author?.name || "Unknown Author"}</span>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded-md uppercase">
                          {story.category || "General"}
                        </span>
                      </td>

                      {/* Moderation Actions Trigger */}
                      <td className="p-4 pr-6 text-right">
                        <div className="inline-flex gap-2">
                          
                          {/* Copyliti / Copyright Button */}
                          <button
                            onClick={() => { setSelectedStory(story); setIsCopyrightModalOpen(true); }}
                            className="p-2 bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl border border-blue-500/20 transition-all active:scale-95 text-xs font-bold flex items-center gap-1.5"
                            title="Tanga Ibihano bya Copyright"
                          >
                            <FaCopyright /> Copyright
                          </button>

                          {/* Kusiba uwa vioye amamabwiriza */}
                          <button
                            onClick={() => { setSelectedStory(story); setIsViolationModalOpen(true); }}
                            className="p-2 bg-amber-500/10 hover:bg-amber-600 text-amber-400 hover:text-white rounded-xl border border-amber-500/20 transition-all active:scale-95 text-xs font-bold flex items-center gap-1.5"
                            title="Hana uwashe amabwiriza (Violation)"
                          >
                            <FaBan /> Violation
                          </button>

                          {/* Siba Inkuru Idashakwa zvose */}
                          <button
                            onClick={() => { setSelectedStory(story); setIsDeleteModalOpen(true); }}
                            className="p-2 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white rounded-xl border border-red-500/20 transition-all active:scale-95"
                            title="Siba iyi nkuru burundu"
                          >
                            <FaTrash />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ==================== 1. MODAL YO GUSIBA INKURU BURUNDU ==================== */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl">
            <p className="text-3xl text-center mb-2">🗑️</p>
            <h3 className="text-xl font-black text-center text-white uppercase tracking-tight">Siba iyi nkuru?</h3>
            <p className="text-slate-400 text-sm text-center mt-2 leading-relaxed">
              Ese urashaka gusiba inkuru bwayo izina ryayo ari: <span className="text-red-400 font-bold">"{selectedStory?.title}"</span>? Ibi ntibishobora kwandururwa ukundi.
            </p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsDeleteModalOpen(false)} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs uppercase tracking-wider transition">Guhagarika</button>
              <button onClick={handleConfirmDelete} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-xs uppercase tracking-wider transition">Emeza Gusiba</button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 2. MODAL YA COPYRIGHT (COPYLITI) ==================== */}
      {isCopyrightModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 text-blue-400 mb-3 border-b border-slate-800 pb-3">
              <FaCopyright className="text-xl" />
              <h3 className="text-lg font-black uppercase tracking-tight text-white">Copyright Strike (Copyliti)</h3>
            </div>
            <p className="text-slate-400 text-xs mb-4">
              Uhawe ibihano uyu mwanditsi kuko yakoresheje inkuru y'undi adafite uburenganzira.
            </p>
            <form onSubmit={handleConfirmCopyright} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Nyir'izina w'inkuru (Original Author)</label>
                <input 
                  type="text" required
                  placeholder="Andika izina rya nyiri nkuru wakopewe" 
                  value={copyrightDetails.originalAuthor}
                  onChange={(e) => setCopyrightDetails(prev => ({...prev, originalAuthor: e.target.value}))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Amande / Indishyi ($ cyangwa RWF)</label>
                <input 
                  type="text" placeholder="Ugereranyo cyangwa amande agomba gutanga" 
                  value={copyrightDetails.compensationFee}
                  onChange={(e) => setCopyrightDetails(prev => ({...prev, compensationFee: e.target.value}))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsCopyrightModalOpen(false)} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs uppercase tracking-wider transition">Hagarika</button>
                <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs uppercase tracking-wider transition">Tanga Ibihano</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== 3. MODAL YA VIOLATION (AMAMABWIRIZA) ==================== */}
      {isViolationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 text-amber-400 mb-3 border-b border-slate-800 pb-3">
              <FaBan className="text-xl" />
              <h3 className="text-lg font-black uppercase tracking-tight text-white">Hana uwayishe Amamabwiriza (Violation Management)</h3>
            </div>
            <p className="text-slate-400 text-xs mb-4">
              Uyu mukoresha arakurwaho inkuru ye kandi ahabwe ibihano (cyangwa Block/Ban) kubera kwica amabwiriza y'urubuga.
            </p>
            <form onSubmit={handleConfirmViolation} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Impamvu y'icyaha (Violation Reason)</label>
                <textarea 
                  required rows="3"
                  placeholder="Andika impamvu isobanura neza amabwiriza yishe (Urugero: Imvugo zikomeye, Ibintu bitari byo...)" 
                  value={violationReason}
                  onChange={(e) => setViolationReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsViolationModalOpen(false)} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs uppercase tracking-wider transition">Hagarika</button>
                <button type="submit" className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-xl text-xs uppercase tracking-wider transition">Emeza Ibihano / Ban</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}