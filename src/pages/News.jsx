import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API_URL from "../config/api.js";

const CATEGORIES = [
  "All","Sports","Technology","World","Politics","Business",
  "Culture","Entertainment","SweetNews","Tech","Finance",
  "Economy","DeepNews","History","Agriculture"
];


function AuthGate({ action, onClose }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
           onClick={e => e.stopPropagation()}>
        <p className="text-4xl mb-4">🔐</p>
        <h3 className="text-xl font-black text-gray-900 mb-2">Sign In Required</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          You need an account to <strong>{action}</strong>. Sign in or create a free account to continue.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-3 border border-gray-200 text-gray-600 font-bold rounded-2xl text-sm hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={() => navigate("/register")}
            className="flex-1 py-3 bg-gray-900 text-white font-black rounded-2xl text-sm hover:bg-black transition">
            Sign Up Free
          </button>
          <button onClick={() => navigate("/login")}
            className="flex-1 py-3 bg-red-600 text-white font-black rounded-2xl text-sm hover:bg-red-700 transition">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

function CommentModal({ item, onClose, isLoggedIn, onAuthRequired }) {
  const [comments, setComments]   = useState(item.comments || []);
  const [text, setText]           = useState("");
  const [loading, setLoading]     = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) { onClose(); onAuthRequired("leave a comment"); return; }
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res  = await fetch(`${API_URL}/api/v1/news/${item._id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.success) {
        setComments(prev => [...prev, data.comment]);
        setText("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
           onClick={e => e.stopPropagation()}>

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-black text-gray-900">Comments ({comments.length})</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black text-2xl leading-none">×</button>
        </div>

        <div className="overflow-y-auto max-h-72 px-6 py-4 space-y-4">
          {comments.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-8">No comments yet. Be the first!</p>
          ) : (
            comments.map((c, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-black shrink-0">
                  {(c.user?.name || c.author || "U")[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-700">{c.user?.name || c.author || "User"}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{c.text || c.content}</p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "Just now"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        
        <form onSubmit={handleSubmit} className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={isLoggedIn ? "Write a comment..." : "Sign in to comment..."}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-sm outline-none focus:border-red-400 transition"
          />
          <button type="submit" disabled={loading || !text.trim()}
            className="bg-red-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-red-700 disabled:opacity-50 transition">
            {loading ? "..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden animate-pulse">
      <div className="h-56 bg-gray-100" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-gray-100 rounded w-1/4" />
        <div className="h-5 bg-gray-100 rounded w-full" />
        <div className="h-5 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
  );
}

function NewsCard({ item, index, featured, onDelete, isLoggedIn, onAuthRequired }) {
  const [liked, setLiked]           = useState(false);
  const [likes, setLikes]           = useState(item.likes?.length || item.likesCount || 0);
  const [followed, setFollowed]     = useState(false);
  const [showComment, setComment]   = useState(false);
  const [commentCount, setCommentCount] = useState(item.comments?.length || 0);

  const handleLike = async () => {
    if (!isLoggedIn) { onAuthRequired("like a story"); return; }
    setLiked(l => !l);
    setLikes(n => liked ? n - 1 : n + 1);
    try {
      await fetch(`${API_URL}/api/v1/news/${item._id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (err) { console.error(err); }
  };

  const handleFollow = async () => {
    if (!isLoggedIn) { onAuthRequired("follow this author"); return; }
    setFollowed(f => !f);
    try {
      await fetch(`${API_URL}/api/v1/users/${item.author?._id}/follow`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (err) { console.error(err); }
  };

  return (
    <>
      <div
        className={`bg-white rounded-3xl overflow-hidden group flex flex-col transition-all duration-300 hover:-translate-y-1 relative ${
          featured ? "md:col-span-2" : ""
        }`}
        style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
      >
        {/* delete btn */}
        <button
          onClick={e => { e.stopPropagation(); onDelete(item._id || item.id); }}
          className="absolute top-4 right-4 z-30 bg-white/90 hover:bg-red-600 p-2 rounded-full text-red-600 hover:text-white transition-colors border border-gray-100 shadow-md backdrop-blur-sm"
        >
          <span className="text-xs block">🗑️</span>
        </button>
        <div className={`overflow-hidden relative ${featured ? "h-72" : "h-52"}`}>
          <img
            src={item.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"; }}
          />
          <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
            {item.category || "News"}
          </span>
          {featured && (
            <span className="absolute top-4 right-14 bg-black/70 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase backdrop-blur-sm">
              ★ Featured
            </span>
          )}
        </div>

        <div className={`p-6 flex flex-col flex-grow ${featured ? "p-8" : ""}`}>

          
          {item.author?.name && (
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-[10px] font-black">
                  {item.author.name[0].toUpperCase()}
                </div>
                <span className="text-xs font-bold text-gray-500">{item.author.name}</span>
              </div>
              <button
                onClick={handleFollow}
                className={`text-[10px] font-black px-3 py-1 rounded-full border transition-all ${
                  followed
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-600"
                }`}
              >
                {followed ? "✓ Following" : "+ Follow"}
              </button>
            </div>
          )}

          <h3 className={`font-black text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-red-600 transition-colors ${
            featured ? "text-2xl" : "text-base"
          }`}>
            {item.title}
          </h3>

          {item.description && (
            <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
              {item.description}
            </p>
          )}

          {/* footer */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wide">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                  : new Date().toDateString()}
              </span>
              <Link
                to={`/NewsDetails/${item._id || item.id || index}`}
                className="bg-gray-900 text-white text-[10px] font-black px-5 py-2.5 rounded-2xl uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95"
              >
                Read More →
              </Link>
            </div>

            {/* like + comment */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 text-xs font-bold transition-all ${
                  liked ? "text-red-600" : "text-gray-400 hover:text-red-500"
                }`}
              >
                <span className="text-base">{liked ? "❤️" : "🤍"}</span>
                {likes > 0 && <span>{likes}</span>}
                <span>Like</span>
              </button>

              <button
                onClick={() => {
                  if (!isLoggedIn) { onAuthRequired("comment on a story"); return; }
                  setComment(true);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-blue-500 transition-all"
              >
                <span className="text-base">💬</span>
                {commentCount > 0 && <span>{commentCount}</span>}
                <span>Comment</span>
              </button>

              <button
                onClick={() => {
                  navigator.share?.({
                    title: item.title,
                    url: `${window.location.origin}/NewsDetails/${item._id}`,
                  });
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-green-500 transition-all ml-auto"
              >
                <span className="text-base">↗️</span>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showComment && (
        <CommentModal
          item={item}
          isLoggedIn={isLoggedIn}
          onAuthRequired={onAuthRequired}
          onClose={() => {
            setComment(false);
            setCommentCount(c => c); 
          }}
        />
      )}
    </>
  );
}

export default function News() {
  const [news, setNews]                   = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch]               = useState("");
  const [authGate, setAuthGate]           = useState(null); 

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(false);
        const res  = await fetch(`${API_URL}/api/v1/news`);
        const data = await res.json();
        const arr  = Array.isArray(data) ? data : (data.data || data.news || data.articles || []);
        setNews(arr);
      } catch (err) {
        console.error("News Fetching Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this story?")) return;
    try {
      const res = await fetch(`${API_URL}/api/v1/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Failed to delete.");
      setNews(prev => prev.filter(item => (item._id || item.id) !== id));
    } catch (err) {
      alert("Failed to delete. Please try again.");
    }
  };

  const filtered = news
    .filter(item => activeCategory === "All" || item.category?.toLowerCase() === activeCategory.toLowerCase())
    .filter(item => search === "" || item.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <div className="max-w-7xl mx-auto py-10 px-6">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b pb-8">
          <div>
            <p className="text-red-600 text-[10px] font-black tracking-[4px] mb-2 uppercase">
              {new Date().toDateString()}
            </p>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">
              GLOBAL <span className="text-red-600">NEWS</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1 font-medium">
              {filtered.length} stories available
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm font-medium outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </div>
            {!isLoggedIn && (
              <Link to="/login"
                className="bg-red-600 text-white text-xs font-black px-5 py-3 rounded-2xl uppercase tracking-wider hover:bg-red-700 transition whitespace-nowrap">
                Sign In
              </Link>
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all ${
                activeCategory === cat
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-red-300 hover:text-red-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-32 bg-white rounded-3xl shadow-sm">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-gray-400 font-bold text-lg mb-6">Failed to connect to server</p>
            <button onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-8 py-3 rounded-2xl font-black text-xs hover:bg-red-700 transition uppercase tracking-wider">
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item, index) => (
              <NewsCard
                key={item._id || item.id || index}
                item={item}
                index={index}
                featured={index === 0}
                onDelete={handleDelete}
                isLoggedIn={isLoggedIn}
                onAuthRequired={(action) => setAuthGate(action)}
              />
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-32 bg-white rounded-3xl shadow-sm">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-gray-400 font-bold text-lg">No news found in this category</p>
          </div>
        )}
      </div>

      {authGate && (
        <AuthGate
          action={authGate}
          onClose={() => setAuthGate(null)}
        />
      )}
    </div>
  );
}