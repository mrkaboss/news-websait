import { Link } from "react-router-dom";
import { FaRegEye, FaRegClock, FaInfoCircle } from "react-icons/fa";

export default function DeepNews() {
  const sadStories = [
    {
      id: "d1",
      title: "Inkangu yibasiye ibice by'imisozi: Imiryango itari mike yakuwe mu byayo",
      desc: "Nyuma y'imvura idasanzwe yaguye mu ijoro ryakeye, abaturage barasaba ubutabazi bwihuse kuko ibintu byabo byangiritse cyane.",
      image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=2070&auto=format&fit=crop",
      date: "Mar 30, 2026",
      category: "Disaster"
    },
    {
      id: "d2",
      title: "Umuhanzi ukunzwe cyane yitabye Imana azize uburwayi butungurane",
      desc: "Isi y'imyidagaduro iri mu kigandalo nyuma y'urupfu rw'uyu muhanzi wari umaze igihe gito asohoye alubumu nshya.",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop",
      date: "Mar 29, 2026",
      category: "Obituary"
    },
    {
      id: "d3",
      title: "Ubukungu bw'isi bugeramiwe: Ibiciro by'ibiribwa bikomeje kuzamuka",
      desc: "Raporo nshya yerekanye ko imiryango ikomeje kugorwa no kubona ibiribwa by'ibanze bitewe n'ihindagurika ry'ibihe.",
      image: "https://images.unsplash.com/photo-1611974714658-058f40da23fb?q=80&w=2070&auto=format&fit=crop",
      date: "Mar 28, 2026",
      category: "Economy"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        
        <div className="border-b-2 border-slate-300 pb-10 mb-12">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">DEEP NEWS</h1>
          <p className="text-slate-500 font-medium uppercase tracking-widest text-sm flex items-center gap-2">
            <FaInfoCircle className="text-slate-400" /> Inkuru z'ukuri kandi zikomeye
          </p>
        </div>

        
        <div className="space-y-12">
          {sadStories.map((item) => (
            <div key={item.id} className="grid md:grid-cols-3 gap-8 items-center group">
              {/* Image */}
              <div className="md:col-span-1 overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={item.image} 
                  alt="" 
                  className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
              </div>

              
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter border px-2 py-0.5 border-slate-300">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <FaRegClock /> {item.date}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-900 transition-colors">
                  {item.title}
                </h2>
                
                <p className="text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {item.desc}
                </p>

                <Link 
                  to={`/NewsDetails/${item.id}`}
                  className="text-slate-900 font-black text-sm border-b-2 border-slate-900 pb-1 hover:text-slate-500 hover:border-slate-500 transition-all"
                >
                  Soma byose
                </Link>
              </div>
            </div>
          ))}
        </div>

        
        <div className="mt-20 py-10 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-xs italic">
            "Amakuru atubera umuyoboro wo kumva no gufasha abari mu kaga."
          </p>
        </div>

      </div>
    </div>
  );
}