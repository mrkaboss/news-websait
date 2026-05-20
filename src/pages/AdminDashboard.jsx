import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTrash, FaCopyright, FaBan, FaShieldAlt,
  FaFileAlt, FaCheckCircle, FaNewspaper,
  FaUsers, FaEye, FaSearch, FaSignOutAlt
} from 'react-icons/fa';
import API_URL from '../config/api.js';

export default function AdminDashboard() {
  const [stories, setStories]         = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");
  const [successMessage, setSuccess]  = useState("");
  const [search, setSearch]           = useState("");
  const [categoryFilter, setCategory] = useState("All");

  // modal states
  const [selectedStory, setSelected]          = useState(null);
  const [isDeleteModalOpen, setDeleteModal]   = useState(false);
  const [isCopyrightModalOpen, setCopyModal]  = useState(false);
  const [isViolationModalOpen, setVioModal]   = useState(false);
  const [isPreviewModalOpen, setPreviewModal] = useState(false);

  const [copyrightDetails, setCopyright] = useState({ originalAuthor: "", compensationFee: "" });
  const [violationReason, setVioReason]  = useState("");

  const token = localStorage.getItem("token");

  const fetchAllStories = async () => {
    try {
      setLoading(true);
      const res  = await fetch(`${API_URL}/api/v1/news`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch stories from server.");
      const data = await res.json();
      const arr  = Array.isArray(data) ? data : (data.data || data.news || []);
      setStories(arr);
      setFiltered(arr);
    } catch (err) {
      setError(err.message || "Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllStories(); }, []);

  useEffect(() => {
    let list = stories;
    if (categoryFilter !== "All")
      list = list.filter(s => s.category === categoryFilter);
    if (search.trim())
      list = list.filter(s => s.title?.toLowerCase().includes(search.toLowerCase()));
    setFiltered(list);
  }, [search, categoryFilter, stories]);

  const categories = ["All", ...new Set(stories.map(s => s.category).filter(Boolean))];

  const triggerSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 4000);
  };

  const handleConfirmDelete = async () => {
    if (!selectedStory) return;
    try {
      const res = await fetch(`${API_URL}/api/v1/news/${selectedStory._id || selectedStory.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete story.");
      setStories(prev => prev.filter(s => (s._id || s.id) !== (selectedStory._id || selectedStory.id)));
      triggerSuccess("Story deleted successfully.");
      setDeleteModal(false);
    } catch (err) { alert(err.message); }
  };

  
  const handleConfirmCopyright = async (e) => {
    e.preventDefault();
    if (!selectedStory) return;
    try {
      const res = await fetch(`${API_URL}/api/v1/admin/copyright-strike`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          newsId:   selectedStory._id || selectedStory.id,
          authorId: selectedStory.author?._id || selectedStory.author?.id,
          ...copyrightDetails,
        }),
      });
      if (!res.ok) throw new Error("Copyright strike failed.");
      triggerSuccess(`Copyright strike issued to: ${selectedStory.author?.name || "Author"}`);
      setCopyModal(false);
      setCopyright({ originalAuthor: "", compensationFee: "" });
    } catch (err) { alert(err.message); }
  };

  const handleConfirmViolation = async (e) => {
    e.preventDefault();
    if (!selectedStory) return;
    try {
      const res = await fetch(`${API_URL}/api/v1/admin/user-violation`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          userId: selectedStory.author?._id || selectedStory.author?.id,
          newsId: selectedStory._id || selectedStory.id,
          reason: violationReason,
        }),
      });
      if (!res.ok) throw new Error("Violation report failed.");
      triggerSuccess("Violation issued — user banned and content removed.");
      setVioModal(false);
      setVioReason("");
      fetchAllStories();
    } catch (err) { alert(err.message); }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white gap-4">
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-red-500 border-t-transparent" />
      <p className="text-slate-400 font-mono text-sm animate-pulse">Loading admin data...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased pb-24">
      <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600/20 text-red-500 rounded-xl border border-red-500/30">
              <FaShieldAlt className="text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase">Admin Control Center</h1>
              <p className="text-[10px] text-slate-500 font-mono">Role: Central Administrator</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/"
              className="text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition border border-slate-700 flex items-center gap-2">
              ← Back to Website
            </Link>
            <button
              onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
              className="text-xs font-mono bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-4 py-2 rounded-lg transition border border-red-500/30 flex items-center gap-2">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-8">

        {successMessage && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center gap-3 font-mono text-sm">
            <FaCheckCircle /> {successMessage}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl font-mono text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: <FaNewspaper />, label: "Total Stories",          value: stories.length,  color: "blue" },
            { icon: <FaUsers />,     label: "Unique Authors",         value: new Set(stories.map(s => s.author?._id).filter(Boolean)).size, color: "purple" },
            { icon: <FaShieldAlt />, label: "Moderation System",      value: "ACTIVE",        color: "emerald", isText: true },
          ].map(stat => (
            <div key={stat.label} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
              <div className={`text-${stat.color}-400 text-xl mb-3`}>{stat.icon}</div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              {stat.isText
                ? <span className={`text-xs font-mono text-${stat.color}-400 bg-${stat.color}-500/10 px-2 py-1 rounded`}>{stat.value}</span>
                : <p className={`text-4xl font-black text-${stat.color}-400`}>{stat.value}</p>
              }
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
            <input
              type="text"
              placeholder="Search stories by title..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-slate-600 transition font-mono"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={e => setCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none focus:border-slate-600 transition font-mono"
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h2 className="font-extrabold text-base uppercase tracking-tight flex items-center gap-2">
              <FaFileAlt className="text-slate-400" />
              Live Post Registry
              <span className="ml-2 text-xs font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                {filtered.length} results
              </span>
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500 font-mono text-sm">
              No content found matching your filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 text-[10px] font-mono uppercase bg-slate-950/50">
                    <th className="p-4 pl-6">Cover & Title</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {filtered.map((story) => (
                    <tr key={story._id || story.id} className="hover:bg-slate-800/30 transition-colors group">

                      <td className="p-4 pl-6 max-w-xs">
                        <div className="flex items-center gap-4">
                          <img
                            src={story.image?.startsWith("http") ? story.image : `${API_URL}${story.image}`}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                            onError={e => e.currentTarget.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150"}
                          />
                          <div>
                            <h3 className="font-bold text-slate-100 group-hover:text-red-400 transition-colors line-clamp-1 text-sm">
                              {story.title}
                            </h3>
                            <p className="text-[10px] text-slate-600 font-mono mt-0.5">
                              ID: {(story._id || story.id)?.substring(0, 10)}...
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-medium text-slate-300 text-xs">
                          {story.author?.name || "Unknown"}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded uppercase">
                          {story.category || "General"}
                        </span>
                      </td>

                      <td className="p-4 text-[10px] text-slate-500 font-mono">
                        {story.createdAt ? new Date(story.createdAt).toLocaleDateString() : "—"}
                      </td>

                      
                      <td className="p-4 pr-6 text-right">
                        <div className="inline-flex gap-2 flex-wrap justify-end">
                          <button
                            onClick={() => { setSelected(story); setPreviewModal(true); }}
                            className="p-2 bg-slate-700/50 hover:bg-slate-600 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition active:scale-95 text-xs font-bold flex items-center gap-1.5"
                            title="Preview Story"
                          >
                            <FaEye /> Preview
                          </button>

                          <button
                            onClick={() => { setSelected(story); setCopyModal(true); }}
                            className="p-2 bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl border border-blue-500/20 transition active:scale-95 text-xs font-bold flex items-center gap-1.5"
                            title="Issue Copyright Strike"
                          >
                            <FaCopyright /> Copyright
                          </button>

                          {/* violation */}
                          <button
                            onClick={() => { setSelected(story); setVioModal(true); }}
                            className="p-2 bg-amber-500/10 hover:bg-amber-600 text-amber-400 hover:text-white rounded-xl border border-amber-500/20 transition active:scale-95 text-xs font-bold flex items-center gap-1.5"
                            title="Report Violation"
                          >
                            <FaBan /> Violation
                          </button>

                          {/* delete */}
                          <button
                            onClick={() => { setSelected(story); setDeleteModal(true); }}
                            className="p-2 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white rounded-xl border border-red-500/20 transition active:scale-95"
                            title="Delete Story"
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

      
      {isPreviewModalOpen && selectedStory && (
        <Modal onClose={() => setPreviewModal(false)}>
          <div className="space-y-4">
            <img
              src={selectedStory.image?.startsWith("http") ? selectedStory.image : `${API_URL}${selectedStory.image}`}
              alt=""
              className="w-full h-48 object-cover rounded-2xl"
              onError={e => e.currentTarget.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600"}
            />
            <span className="inline-block bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
              {selectedStory.category || "News"}
            </span>
            <h3 className="text-xl font-black text-white leading-tight">{selectedStory.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">
              {selectedStory.content || "No content available."}
            </p>
            <p className="text-xs text-slate-500 font-mono">
              Author: {selectedStory.author?.name || "Unknown"} · {selectedStory.createdAt ? new Date(selectedStory.createdAt).toLocaleDateString() : ""}
            </p>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setPreviewModal(false)}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs uppercase tracking-wider transition">
                Close
              </button>
              <Link to={`/NewsDetails/${selectedStory._id}`}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs uppercase tracking-wider transition text-center">
                Open Full Story
              </Link>
            </div>
          </div>
        </Modal>
      )}

      
      {isDeleteModalOpen && (
        <Modal onClose={() => setDeleteModal(false)}>
          <p className="text-4xl text-center mb-3">🗑️</p>
          <h3 className="text-xl font-black text-center text-white uppercase tracking-tight">Delete This Story?</h3>
          <p className="text-slate-400 text-sm text-center mt-2 leading-relaxed">
            Are you sure you want to permanently delete{" "}
            <span className="text-red-400 font-bold">"{selectedStory?.title}"</span>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setDeleteModal(false)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs uppercase tracking-wider transition">
              Cancel
            </button>
            <button onClick={handleConfirmDelete}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-xs uppercase tracking-wider transition">
              Confirm Delete
            </button>
          </div>
        </Modal>
      )}

      {isCopyrightModalOpen && (
        <Modal onClose={() => setCopyModal(false)}>
          <div className="flex items-center gap-2 text-blue-400 mb-4 border-b border-slate-800 pb-3">
            <FaCopyright className="text-xl" />
            <h3 className="text-lg font-black uppercase tracking-tight text-white">Issue Copyright Strike</h3>
          </div>
          <p className="text-slate-400 text-xs mb-4">
            This author will receive a copyright infringement notice for using content without authorization.
          </p>
          <form onSubmit={handleConfirmCopyright} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Original Author Name</label>
              <input
                type="text" required
                placeholder="Enter the original content creator's name"
                value={copyrightDetails.originalAuthor}
                onChange={e => setCopyright(p => ({ ...p, originalAuthor: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Compensation Fee ($ or RWF)</label>
              <input
                type="text"
                placeholder="Estimated penalty or compensation amount"
                value={copyrightDetails.compensationFee}
                onChange={e => setCopyright(p => ({ ...p, compensationFee: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setCopyModal(false)}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs uppercase tracking-wider transition">
                Cancel
              </button>
              <button type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs uppercase tracking-wider transition">
                Issue Strike
              </button>
            </div>
          </form>
        </Modal>
      )}

      
      {isViolationModalOpen && (
        <Modal onClose={() => setVioModal(false)}>
          <div className="flex items-center gap-2 text-amber-400 mb-4 border-b border-slate-800 pb-3">
            <FaBan className="text-xl" />
            <h3 className="text-lg font-black uppercase tracking-tight text-white">Report Policy Violation</h3>
          </div>
          <p className="text-slate-400 text-xs mb-4">
            This user will be banned and their content removed for violating platform guidelines.
          </p>
          <form onSubmit={handleConfirmViolation} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Violation Reason</label>
              <textarea
                required rows={3}
                placeholder="Describe the violation clearly (e.g. Hate speech, Misinformation, Spam...)"
                value={violationReason}
                onChange={e => setVioReason(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500 resize-none transition"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setVioModal(false)}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs uppercase tracking-wider transition">
                Cancel
              </button>
              <button type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-xl text-xs uppercase tracking-wider transition">
                Confirm Ban
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
}
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
         onClick={onClose}>
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl"
           onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}