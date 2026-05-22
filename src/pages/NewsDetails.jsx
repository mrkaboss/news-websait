import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaRegClock, FaGlobe, FaHeart, FaRegHeart, FaComment, FaUserPlus, FaUserCheck, FaShare } from "react-icons/fa";
import ContactAuthor from "../components/ContactAuthor.jsx";
import API_URL from "../config/api.js";

function AuthGate({ action, onClose }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
           onClick={e => e.stopPropagation()}>
        <p className="text-4xl mb-4">🔐</p>
        <h3 className="text-xl font-black text-slate-900 mb-2">Sign In Required</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          You need an account to <strong>{action}</strong>.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-3 border border-gray-200 text-gray-600 font-bold rounded-2xl text-sm hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={() => navigate("/register")}
            className="flex-1 py-3 bg-slate-900 text-white font-black rounded-2xl text-sm hover:bg-black transition">
            Sign Up
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

export default function NewsDetails() {
  const { id }       = useParams();
  const [article, setArticle]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [notFound, setNotFound]   = useState(false);
  const [token, setToken]         = useState(null);
  const [liked, setLiked]           = useState(false);
  const [likes, setLikes]           = useState(0);
  const [followed, setFollowed]     = useState(false);
  const [comments, setComments]     = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [authGate, setAuthGate]     = useState(null);
  const [relatedNews, setRelated]   = useState([]);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetch_ = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const res  = await fetch(`${API_URL}/api/v1/news/${id}`);
        if (!res.ok) { setNotFound(true); return; }
        const data = await res.json();
        const parsed = data.data || data.news || data;
        if (!parsed || (!parsed._id && !parsed.id)) { setNotFound(true); return; }
        setArticle(parsed);
        setLikes(parsed.likes?.length || parsed.likesCount || 0);
        setComments(parsed.comments || []);

        const r    = await fetch(`${API_URL}/api/v1/news`);
        const rd   = await r.json();
        const arr  = Array.isArray(rd) ? rd : (rd.news || []);
        setRelated(arr.filter(n => n._id !== id && n.category === parsed.category).slice(0, 3));
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, [id]);

  const handleLike = async () => {
    if (!isLoggedIn) { setAuthGate("like this story"); return; }
    setLiked(l => !l);
    setLikes(n => liked ? n - 1 : n + 1);
    try {
      await fetch(`${API_URL}/api/v1/news/${id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) { console.error(err); }
  };

  const handleFollow = async () => {
    if (!isLoggedIn) { setAuthGate("follow this author"); return; }
    setFollowed(f => !f);
    try {
      await fetch(`${API_URL}/api/v1/users/${article.author?._id}/follow`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) { console.error(err); }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) { setAuthGate("comment on this story"); return; }
    if (!commentText.trim()) return;
    setCommentLoading(true);
    try {
      const res  = await fetch(`${API_URL}/api/v1/news/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: commentText }),
      });
      const data = await res.json();
      if (data.success) {
        setComments(prev => [...prev, data.comment]);
        setCommentText("");
      }
    } catch (err) { console.error(err); }
    finally { setCommentLoading(false); }
  };

  const handleShare = () => {
    navigator.share?.({
      title: article?.title,
      url: window.location.href,
    }) ?? navigator.clipboard.writeText(window.location.href);
  };
  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mb-4" />
      <p className="font-bold text-slate-400 text-xs uppercase tracking-widest animate-pulse">Loading article...</p>
    </div>
  );

  if (notFound || !article) return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50 gap-4 px-6 text-center">
      <p className="text-6xl mb-2">📭</p>
      <p className="font-black text-slate-800 text-2xl uppercase">Article Not Found</p>
      <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
        This article may have been deleted or is temporarily unavailable.
      </p>
      <Link to="/"
        className="mt-4 bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition">
        ← Back to Home
      </Link>
    </div>
  );

  const imageSource = article.image?.startsWith("http")
    ? article.image
    : article.image
      ? `${API_URL}${article.image}`
      : article.banner
        ? `${API_URL}/${article.banner}`
        : null;

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans antialiased">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">

        {/* back */}
        <div className="mb-8">
          <Link to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 text-xs font-black uppercase tracking-widest transition-colors">
            <FaArrowLeft /> Back to Home
          </Link>
        </div>

        <div className="space-y-4 mb-8">
          <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            {article.category || "General News"}
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-slate-200/60 py-4 mt-4">
            <div className="flex flex-wrap items-center gap-5">
              {article.author?.name && (
                <span className="flex items-center gap-2 text-xs text-slate-600 font-extrabold uppercase tracking-wider">
                  <FaGlobe className="text-red-600" />
                  By {article.author.name}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider">
                <FaRegClock />
                {article.createdAt
                  ? new Date(article.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                  : "Recent"}
              </span>
            </div>

            {article.author?.name && (
              <button
                onClick={handleFollow}
                className={`flex items-center gap-2 text-xs font-black px-4 py-2 rounded-full border transition-all ${
                  followed
                    ? "bg-slate-900 text-white border-slate-900"
                    : "border-slate-200 text-slate-500 hover:border-red-400 hover:text-red-600"
                }`}
              >
                {followed ? <FaUserCheck /> : <FaUserPlus />}
                {followed ? "Following" : `Follow ${article.author.name}`}
              </button>
            )}
          </div>
        </div>

        {imageSource && (
          <div className="my-8 rounded-3xl overflow-hidden shadow-md bg-slate-200 max-h-[480px]">
            <img
              src={imageSource}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200"; }}
            />
          </div>
        )}

        <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 border border-slate-100 shadow-sm mb-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 text-sm font-black transition-all ${
              liked ? "text-red-600" : "text-slate-400 hover:text-red-500"
            }`}
          >
            {liked ? <FaHeart className="text-lg" /> : <FaRegHeart className="text-lg" />}
            <span>{likes > 0 ? likes : ""} Like</span>
          </button>

          <button
            onClick={() => document.getElementById("comment-input")?.focus()}
            className="flex items-center gap-2 text-sm font-black text-slate-400 hover:text-blue-500 transition-all"
          >
            <FaComment className="text-lg" />
            <span>{comments.length > 0 ? comments.length : ""} Comment</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-sm font-black text-slate-400 hover:text-green-500 transition-all ml-auto"
          >
            <FaShare className="text-lg" />
            <span>Share</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm mb-8">
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base font-medium">
            <p className="whitespace-pre-line leading-loose">
              {article.content || article.description || article.desc || "No content available."}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm mb-8">
          <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
            <FaComment className="text-red-600" />
            Comments ({comments.length})
          </h2>

          <form onSubmit={handleComment} className="flex gap-3 mb-8">
            <div className="w-9 h-9 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-black shrink-0 mt-0.5">
              {isLoggedIn ? "Y" : "?"}
            </div>
            <div className="flex-1 flex gap-2">
              <input
                id="comment-input"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder={isLoggedIn ? "Write your comment..." : "Sign in to comment..."}
                onClick={() => { if (!isLoggedIn) setAuthGate("comment on this story"); }}
                readOnly={!isLoggedIn}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-red-400 transition cursor-pointer"
              />
              <button
                type="submit"
                disabled={commentLoading || !commentText.trim()}
                className="bg-red-600 text-white px-5 py-3 rounded-2xl text-sm font-bold hover:bg-red-700 disabled:opacity-50 transition whitespace-nowrap"
              >
                {commentLoading ? "..." : "Post"}
              </button>
            </div>
          </form>
          {comments.length === 0 ? (
            <p className="text-center text-slate-400 text-sm py-6">
              No comments yet — be the first to share your thoughts!
            </p>
          ) : (
            <div className="space-y-5">
              {comments.map((c, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-9 h-9 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center text-sm font-black shrink-0">
                    {(c.user?.name || c.author || "U")[0].toUpperCase()}
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-2xl px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-black text-slate-700">
                        {c.user?.name || c.author || "Anonymous"}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "Just now"}
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.text || c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mb-8">
          {token ? (
            <ContactAuthor
              authorId={article.author?._id || article.author?.id}
              token={token}
            />
          ) : (
            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 text-center">
              <p className="text-slate-700 font-bold text-sm">
                <Link to="/login" className="text-red-600 underline font-black hover:text-red-700">
                  Sign in
                </Link>{" "}
                to contact the author directly.
              </p>
            </div>
          )}
        </div>

        {relatedNews.length > 0 && (
          <div>
            <h2 className="text-xl font-black text-slate-900 mb-5 border-l-4 border-red-600 pl-4 uppercase tracking-tight">
              Related Stories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedNews.map(n => (
                <Link
                  key={n._id}
                  to={`/NewsDetails/${n._id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
                >
                  <div className="h-36 overflow-hidden">
                    <img
                      src={n.image?.startsWith("http") ? n.image : `${API_URL}${n.image}`}
                      alt={n.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400"; }}
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-wider">{n.category}</span>
                    <h3 className="text-sm font-black text-slate-800 mt-1 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {n.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {authGate && (
        <AuthGate action={authGate} onClose={() => setAuthGate(null)} />
      )}
    </div>
  );
}