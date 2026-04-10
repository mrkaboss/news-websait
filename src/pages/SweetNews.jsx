import { Link } from "react-router-dom";
import { FaLaughSquint, FaRegHeart, FaShare } from "react-icons/fa";

export default function SweetNews() {
  const funnyStories = [
    {
      id: "s1",
      title: "Umugabo yariye telefone ye aziko ari isandwich!",
      desc: "Byatunguye benshi ubwo uyu mugabo yageragezaga guhekenya iPhone ye saa sita...",
      image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=80&w=1974&auto=format&fit=crop",
      likes: "5.2K",
      category: "Comedy"
    },
    {
      id: "s2",
      title: "Impyisi yagiye mu ishuri rya muzika kwiga kuririmbira abantu",
      desc: "Abanyeshuri batunguwe no kubona impyisi yicaye mu ntebe y'imbere ishaka gukora audition.",
      image: "https://images.unsplash.com/photo-1516624683217-bf24785752ed?q=80&w=2070&auto=format&fit=crop",
      likes: "3.8K",
      category: "Wild & Funny"
    },
    {
      id: "s3",
      title: "Roboti yasezeye akazi ivuga ko itashobora 'Vibe' y'abantu",
      desc: "Nyuma yo gukora amasaha 2, iyi roboti yavuze ko abantu bateye urujijo cyane maze irigendera.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=2012&auto=format&fit=crop",
      likes: "10K",
      category: "Tech Jokes"
    }
  ];

  return (
    <div className="min-h-screen bg-yellow-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-yellow-400 rounded-full mb-4 animate-bounce">
            <FaLaughSquint size={40} className="text-white" />
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">SWEET NEWS 🍭</h1>
          <p className="text-xl text-gray-600 font-medium italic">Amakuru asekeje akura umunaniro!</p>
        </div>

        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {funnyStories.map((item) => (
            <div key={item.id} className="bg-white rounded-[3rem] overflow-hidden shadow-xl hover:rotate-2 transition-transform duration-300 border-4 border-yellow-200">
              <div className="relative h-64">
                <img src={item.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                  {item.category}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-black text-gray-800 leading-tight mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mb-8 line-clamp-3 italic">
                  "{item.desc}"
                </p>

                <div className="flex items-center justify-between border-t pt-6">
                  <div className="flex items-center gap-2 text-pink-500">
                    <FaRegHeart />
                    <span className="font-bold text-sm">{item.likes}</span>
                  </div>
                  <Link 
                    to={`/NewsDetails/${item.id}`}
                    className="bg-yellow-400 text-white px-6 py-2 rounded-2xl font-black text-xs hover:bg-black transition-colors"
                  >
                    READ & LAUGH →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="bg-black text-white px-10 py-4 rounded-full font-black flex items-center gap-3 mx-auto hover:scale-105 transition">
            <FaShare /> SHARE THE SMILE
          </button>
        </div>
      </div>
    </div>
  );
}