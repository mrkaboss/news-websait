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

  // ✅ Fata token uvane localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // ✅ Fetch inkuru imwe gusa ifunguye /:id
  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const response = await fetch(`${API_URL}/api/v1/news/${id}`);
        const data = await response.json();

        // ✅ Fata data uko backend yawe isubiza
        const article = data.data || data.news || data;

        if (!article || !article._id) {
          setNotFound(true);
        } else {
          setArticle(article);
        }
      } catch (err) {
        console.error("NewsDetails Error:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // Loading
  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4" />
      <p className="font-bold text-gray-500 italic">Gushaka inkuru...</p>
    </div>
  );

  // Not found
  if (notFound || !article) return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 gap-4">
      <p className="text-5xl">📭</p>
      <p className="font-black text-gray-700 text-xl">Inkuru ntiboneka</p>
      <p className="text-gray-400 text-sm">Inkuru washakaga ishobora gusibwa cyangwa itagihari</p>
      <Link
        to="/News"
        className="mt-4 bg-red-600 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-red-700 transition"
      >
        ← Subira kuri News
      </Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-6 pt-10">

        {/* Back button */}
        <Link
          to="/News"
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 font-bold transition mb-8"
        >
          <FaArrowLeft /> Subira kuri News
        </Link>

        {/* Category + Title */}
        <div className="space-y-4 mb-8">
          <span className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
            {article.category || "Global News"}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
            {article.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {article.author?.name && (
              <span className="flex items-center gap-1.5 text-sm text-gray-500 font-bold">
                <FaGlobe className="text-red-500" />
                {article.author.name}
              </span>
            )}
            {article.createdAt && (
              <span className="flex items-center gap-1.5 text-sm text-gray-400">
                <FaRegClock />
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric"
                })}
              </span>
            )}
          </div>
        </div>

        {/* Image */}
        {article.image && (
          <div className="my-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto object-cover max-h-[500px]"
              onError={e => { e.currentTarget.style.display = "none"; }}
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
          <p className="mb-6 text-lg leading-loose whitespace-pre-line">
            {article.content || "Nta makuru arambuye aboneka."}
          </p>
        </div>

        {/* Contact Author */}
        <div className="mt-16 border-t pt-10">
          {token ? (
            <ContactAuthor
              authorId={article.author?._id}
              token={token}
            />
          ) : (
            <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100 text-center">
              <p className="text-gray-700 font-bold">
                Wabanje{" "}
                <Link to="/login" className="text-red-600 underline">
                  ukinjira (Login)
                </Link>{" "}
                kugira ngo wandikire umunyamakuru.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}