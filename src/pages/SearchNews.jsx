import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
// REBA NEZA IYI IMPORT: Nshyizemo FaRegHeart
import { FaHeart, FaRegHeart, FaRegComment, FaCheckCircle, FaShareAlt, FaArrowLeft } from "react-icons/fa";

export default function NewsDetails() {
  const { id } = useParams(); 
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(120);
  const [isFollowing, setIsFollowing] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([
    { id: 1, user: "Kevine", text: "Iyi nkuru ni ukuri rwose! 👏", date: "2 mins ago" },
    { id: 2, user: "Jean", text: "Ntabwo mbyemera neza ariko reka dutegereze.", date: "10 mins ago" }
  ]);

  useEffect(() => {
    // Logic yo gusoma inkuru muri localStorage cyangwa API...
    const allNews = JSON.parse(localStorage.getItem("allNews")) || [];
    
    if (allNews.length > 0 && allNews[id]) {
      setArticle(allNews[id]);
    } else {
      // Sample Data niba ntayo muri localStorage
      const dummyData = {
        title: id === "0" ? "Uburyo bushya bwo gukoresha AI mu Rwanda" : `Inkuru nshya numero ${id}`,
        author: "Byiringiro Moses",
        authorRole: "Senior Tech Journalist",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        videoUrl: id === "0" ? "https://www.youtube.com/embed/dQw4w9WgXcQ" : null, 
        content: `Iyi ni inkuru irambuye y'inkuru numero ${id}...`,
        date: new Date().toLocaleDateString(),
        category: "Technology"
      };
      setArticle(dummyData);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    const newCommentObj = {
      id: Date.now(),
      user: "Mwe (You)",
      text: comment,
      date: "Just now"
    };
    setCommentsList([newCommentObj, ...commentsList]);
    setComment("");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Navigation */}
      <div className="max-w-4xl mx-auto px-4 pt-6 flex justify-between items-center">
        <Link to="/News" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-bold transition">
          <FaArrowLeft /> Back to News
        </Link>
        <span className="text-xs font-mono bg-gray-200 px-3 py-1 rounded-full text-gray-500">
          Ref: #{id}
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-10">
        
        {/* Author Card */}
        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl uppercase">
              {article.author ? article.author.charAt(0) : "A"}
            </div>
            <div>
              <h4 className="font-bold text-gray-800 flex items-center gap-1">
                {article.author} <FaCheckCircle className="text-blue-500 text-xs" />
              </h4>
              <p className="text-xs text-gray-500">{article.authorRole}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
              isFollowing ? "bg-gray-200 text-gray-600" : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isFollowing ? "Following" : "Follow +"}
          </button>
        </div>

        {/* Category & Title */}
        <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-widest">
          {article.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-4 text-gray-400 text-sm mt-6 border-b pb-6">
          <span>{article.date}</span>
          <span>•</span>
          <span>5 min read</span>
        </div>

        {/* Media (Video or Image) */}
        <div className="my-10 rounded-3xl overflow-hidden shadow-2xl">
          {article.videoUrl ? (
            <div className="aspect-video">
              <iframe 
                className="w-full h-full"
                src={article.videoUrl} 
                title="Video news"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <img src={article.image || "https://via.placeholder.com/800x400"} alt="" className="w-full h-auto object-cover" />
          )}
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
          {article.content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </div>

        {/* --- Interaction Buttons (KOSORA HANO) --- */}
        <div className="flex items-center gap-8 py-6 border-t border-b bg-white rounded-3xl px-8 shadow-sm">
          <button 
            onClick={() => {setLiked(!liked); setLikesCount(liked ? likesCount - 1 : likesCount + 1)}}
            className="flex items-center gap-2 group"
          >
            {/* Hano ibara rirahinduka igihe wayikandye */}
            <div className={`p-4 rounded-full transition-all duration-300 ${liked ? "bg-pink-100 text-pink-600" : "bg-gray-100 text-gray-400 group-hover:bg-pink-50 group-hover:text-pink-600"}`}>
              {/* IYI NSHYA: Niba ari liked yerekana Umutima wuzuye (FaHeart), niba ntayo yerekana Outline (FaRegHeart) */}
              {liked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </div>
            <span className={`font-black text-sm uppercase tracking-widest ${liked ? "text-pink-600" : "text-gray-500"}`}>
              {likesCount} Likes
            </span>
          </button>

          <button className="flex items-center gap-2 group text-gray-600">
            <div className="p-4 rounded-full bg-gray-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
              <FaRegComment size={24} />
            </div>
            <span className="font-black text-sm uppercase tracking-widest text-gray-500">{commentsList.length} Comments</span>
          </button>

          <button className="ml-auto p-4 bg-gray-100 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-700 transition">
            <FaShareAlt size={20} />
          </button>
        </div>

        {/* Comment Section */}
        <div className="mt-12 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-gray-900">Thoughts on this article</h3>
          
          <form onSubmit={handleCommentSubmit} className="mb-10">
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What do you think?"
              className="w-full p-5 bg-gray-50 border-none rounded-2xl h-32 focus:ring-2 focus:ring-blue-500 outline-none transition text-gray-700"
            ></textarea>
            <button className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg active:scale-95">
              Post Comment
            </button>
          </form>

          <div className="space-y-8">
            {commentsList.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-blue-600 uppercase text-xs">
                  {item.user.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-sm text-gray-800">{item.user}</h5>
                    <span className="text-[10px] text-gray-400 font-medium">{item.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1 bg-gray-50 p-4 rounded-r-2xl rounded-bl-2xl">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}