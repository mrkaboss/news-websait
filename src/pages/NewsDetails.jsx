import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaRegClock, FaGlobe } from "react-icons/fa";
import ContactAuthor from "../components/ContactAuthor.jsx";
import API_URL from "../config/api.js";

export default function NewsDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [token, setToken] = useState(null);

  // ✅ Fata token uyikuye muri localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // ✅ Fetch inkuru imwe gusa ifunguye ukoresheje /:id
  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const response = await fetch(`${API_URL}/api/v1/news/${id}`);
        
        if (!response.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const data = await response.json();

        // ✅ Fata data uko backend isubiza (Gukosora niba iza nk'urukurikirane rw'ibintu)
        const parsedArticle = data.data || data.news || data;

        if (!parsedArticle || (!parsedArticle._id && !parsedArticle.id)) {
          setNotFound(true);
        } else {
          setArticle(parsedArticle);
        }
      } catch (err) {
        console.error("NewsDetails Fetching Error Context:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // Loading View Layout Frame
  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50 font-sans">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mb-4" />
      <p className="font-bold text-slate-500 text-xs uppercase tracking-widest animate-pulse">Fetching Article Stream...</p>
    </div>
  );

  // Not Found State Shield
  if (notFound || !article) return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50 gap-4 font-sans px-6 text-center">
      <p className="text-6xl mb-2">📭</p>
      <p className="font-black text-slate-800 text-2xl uppercase tracking-tight">Article Not Found</p>
      <p className="text-slate-400 text-sm max-w-sm leading-relaxed">The article you are searching for might have been deleted, moved, or is temporarily unavailable.</p>
      <Link
        to="/"
        className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition shadow-md"
      >
        ← Return To Dashboard
      </Link>
    </div>
  );

  // Isomo ry'aho ishusho ituruka (Url Resolution Handler)
  const imageSource = article.image || (article.banner ? `${API_URL}/${article.banner}` : null);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans antialiased">
      <div className="max-w-4xl mx-auto px-6 pt-10">

        {/* Back navigation button link wrapper */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 text-xs font-black uppercase tracking-widest transition-colors"
          >
            <FaArrowLeft /> Back to home
          </Link>
        </div>

        {/* Category + Title + Metadata Display Row */}
        <div className="space-y-4 mb-8">
          <span className="inline-block bg-slate-200 text-slate-800 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
            {article.category || "General News"}
          </span>
          
          <h1 className="text-3xl md:text-5xl font-black font-serif text-slate-900 leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Meta Info Logs */}
          <div className="flex flex-wrap items-center gap-6 pt-2 border-y border-slate-200/60 py-4 mt-6">
            {article.author?.name && (
              <span className="flex items-center gap-2 text-xs text-slate-600 font-extrabold uppercase tracking-wider">
                <FaGlobe className="text-red-600 text-sm" />
                By {article.author.name}
              </span>
            )}
            
            <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider">
              <FaRegClock className="text-sm" />
              {article.createdAt || article.publishedAt ? (
                new Date(article.createdAt || article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric"
                })
              ) : (
                "Recent Publication"
              )}
            </span>
          </div>
        </div>

        {/* Dynamic Image Wrapper Grid Frame */}
        {imageSource && (
          <div className="my-8 rounded-3xl overflow-hidden shadow-md bg-slate-200 max-h-[480px]">
            <img
              src={imageSource}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={e => { 
                // Niba ishusho yanzwe cyangwa yanze gufunguka, ishyiraho fallback image yizewe aho gufunga page yose
                e.currentTarget.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200"; 
              }}
            />
          </div>
        )}

        {/* Main Text Content Body Area */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base font-medium">
            <p className="whitespace-pre-line leading-loose">
              {article.content || article.description || article.desc || "No comprehensive content detail reported for this index track configuration log."}
            </p>
          </div>
        </div>

        {/* Safe Verification Contact Author Block */}
        <div className="mt-12">
          {token ? (
            <ContactAuthor
              authorId={article.author?._id || article.author?.id}
              token={token}
            />
          ) : (
            <div className="p-6 bg-amber-50/60 rounded-2xl border border-amber-100 text-center">
              <p className="text-slate-700 font-bold text-xs sm:text-sm uppercase tracking-wide">
                Please{" "}
                <Link to="/login" className="text-red-600 underline font-black hover:text-red-700">
                  Login Here
                </Link>{" "}
                to initiate a correspondence thread with the editor.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}