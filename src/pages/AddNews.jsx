import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaVideo, FaImage, FaPaperPlane, FaArrowLeft, 
  FaTimes, FaEye, FaSave, FaClock, FaPenNib, 
  FaListAlt 
} from "react-icons/fa";

export default function AddNews() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);

  const wordCount = description.trim() ? description.trim().split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200); 
  useEffect(() => {
    const savedDraft = localStorage.getItem("news_draft");
    if (savedDraft) {
      const { title, description, category, videoUrl } = JSON.parse(savedDraft);
      setTitle(title);
      setDescription(description);
      setCategory(category);
      setVideoUrl(videoUrl);
    }
  }, []);

  const saveDraft = () => {
    setIsDrafting(true);
    const draftData = { title, description, category, videoUrl };
    localStorage.setItem("news_draft", JSON.stringify(draftData));
    
    setTimeout(() => {
      setIsDrafting(false);
      alert("Draft saved locally! 💾");
    }, 1000);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => { 
      alert("Published Successfully! 🚀"); 
      localStorage.removeItem("news_draft"); 
      setLoading(false); 
    }, 2000); 
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 flex items-center gap-3">
              <FaPenNib className="text-blue-600" /> Editor <span className="text-blue-600">.</span>
            </h1>
            <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm font-medium">
              <span className="flex items-center gap-1"><FaClock /> {readingTime} min read</span>
              <span>•</span>
              <span>{wordCount} words</span>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
             <button 
               type="button"
               onClick={saveDraft}
               className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-2xl font-bold text-gray-600 hover:bg-gray-100 transition shadow-sm"
             >
               <FaSave /> {isDrafting ? "Saving..." : "Save Draft"}
             </button>
             <button 
               type="button"
               onClick={() => setShowPreviewModal(true)}
               className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-black transition shadow-lg"
             >
               <FaEye /> Preview
             </button>
          </div>
        </div>

        <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
              <input
                type="text"
                placeholder="The headline goes here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 bg-transparent border-b border-gray-100 focus:border-blue-500 outline-none text-3xl font-black mb-8 transition-colors"
                required
              />
              <textarea
                placeholder="Start telling your story..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 bg-transparent border-none rounded-2xl h-[500px] focus:ring-0 outline-none leading-relaxed text-xl resize-none"
                required
              ></textarea>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center justify-between">
                Publish Settings <FaListAlt className="text-gray-300" />
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  >
                    <option value="">Choose Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Sports">Sports</option>
                    <option value="Health">Health</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Politics">Politics</option>
                    <option value="World">World</option>
                    <option value="Business">Business</option>
                    <option value="Science">Science</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Cover Media</label>
                  <div className="relative group rounded-3xl border-2 border-dashed border-gray-100 aspect-video flex items-center justify-center bg-gray-50 overflow-hidden">
                    {preview ? (
                      <>
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <button onClick={() => {setImage(null); setPreview(null)}} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition"><FaTimes /></button>
                      </>
                    ) : (
                      <div className="text-center">
                        <input type="file" accept="image/*" onChange={(e) => {
                           const file = e.target.files[0];
                           if(file) { setImage(file); setPreview(URL.createObjectURL(file)); }
                        }} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <FaImage size={30} className="mx-auto text-gray-200 mb-2" />
                        <p className="text-[10px] font-bold text-gray-400">UPLOAD IMAGE</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Video URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="YouTube Link..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-blue-100 hover:shadow-blue-200 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  {loading ? "Publishing..." : <><FaPaperPlane /> Publish</>}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex justify-center items-start overflow-y-auto p-4 md:p-10">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden relative shadow-2xl my-auto">
            <button onClick={() => setShowPreviewModal(false)} className="absolute top-8 right-8 bg-gray-100 p-4 rounded-full hover:bg-red-500 hover:text-white transition-all z-50 shadow-sm"><FaTimes size={20} /></button>
            <div className="p-10 md:p-20">
              <span className="text-blue-600 font-black uppercase text-xs tracking-[0.3em]">{category || "Category"}</span>
              <h1 className="text-4xl md:text-6xl font-black mt-6 leading-[1.1] text-gray-900">{title || "Your Epic Title"}</h1>
              <div className="my-12 rounded-[2rem] overflow-hidden shadow-2xl bg-gray-50 aspect-video">
                {preview ? <img src={preview} alt="" className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-gray-300 italic">No media preview</div>}
              </div>
              <div className="prose prose-2xl max-w-none text-gray-800 leading-relaxed font-serif">
                 {description || "Write something amazing..."}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}