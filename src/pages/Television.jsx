import { useState } from "react";

const CHANNELS = [
  {
    id: 1,
    name: "Al Jazeera English",
    country: "🇶🇦 Qatar",
    genre: "International News",
    color: "#EE8000",
    youtubeId: "gCNeDWCI0vo", 
    description: "Live international news 24/7",
    logo: "AJ",
  },
 {
    id: 2,
    name: "BBC News",
    country: "🇬🇧 UK",
    genre: "World News",
    color: "#BB1919",
    youtubeId: "v77H9_Xsh0c", 
    description: "BBC News live from London",
    logo: "BBC",
  },
  {
    id: 3,
    name: "CNN International",
    country: "🇺🇸 USA",
    genre: "World News",
    color: "#CC0000",
    youtubeId: "sVfHbMqU_Fw",
    description: "CNN live news stream",
    logo: "CNN",
  },
  {
    id: 4,
    name: "DW News",
    country: "🇩🇪 Germany",
    genre: "International",
    color: "#003087",
    youtubeId: "v_M-p678_40", 
    description: "Deutsche Welle live news",
    logo: "DW",
  },
  {
    id: 5,
    name: "France 24 English",
    country: "🇫🇷 France",
    genre: "International",
    color: "#003189",
    youtubeId: "6K6_O_75e0I", 
    description: "France 24 live news in English",
    logo: "F24",
  },
  {
    id: 6,
    name: "CGTN",
    country: "🇨🇳 China",
    genre: "International",
    color: "#C8102E",
    youtubeId: "rlDBFCBlnUU",
    description: "China Global Television Network",
    logo: "CG",
  },
  {
    id: 7,
    name: "TRT World",
    country: "🇹🇷 Turkey",
    genre: "World News",
    color: "#E30A17",
    youtubeId: "oYDFo4AXkMU",
    description: "TRT World live news stream",
    logo: "TRT",
  },
  {
    id: 8,
    name: "NHK World",
    country: "🇯🇵 Japan",
    genre: "Asia News",
    color: "#0072BC",
    youtubeId: "rlDBFCBlnUU",
    description: "Japan's international broadcaster",
    logo: "NHK",
  },
  {
    id: 9,
    name: "RTV (Rwanda TV)",
    country: "🇷🇼 Rwanda",
    genre: "National News",
    color: "#00A3E0", 
    youtubeId: "V_A5YlO2S-g", 
    description: "Televiziyo y'Igihugu y'u Rwanda",
    logo: "RTV",
  },
  {
    id: 10,
    name: "Flash TV",
    country: "🇷🇼 Rwanda",
    genre: "Local News",
    color: "#FFD700", 
    youtubeId: "K1yO1_9G7yY", 
    description: "Amakuru n'imyidagaduro byihuse",
    logo: "FTV",
  },
];

const GENRES = ["All", "World News", "International News", "International", "Asia News"];

export default function Television() {
  const [active, setActive] = useState(CHANNELS[0]);
  const [genre, setGenre] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = CHANNELS.filter(c =>
    (genre === "All" || c.genre === genre) &&
    (search === "" || c.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{
      background: "#080810",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      color: "#fff",
      paddingBottom: "60px",
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.3 } }
        .ch-card { transition: all 0.2s ease; border: 1px solid #1a1a28; }
        .ch-card:hover { transform: scale(1.01); background: #12121e !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>

      <div style={{ padding: "28px 24px 0", maxWidth: "1400px", margin: "0 auto" }}>
        
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "30px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#EF4444", animation: "pulse 1.5s infinite" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#EF4444", letterSpacing: "3px", textTransform: "uppercase" }}>Live News</span>
            </div>
            <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1 }}>
              WORLD <span style={{ color: "#EF4444" }}>TV</span>
            </h1>
          </div>

          <input
            type="text"
            placeholder="🔍 Shakisha channel..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: "#12121e", border: "1px solid #222",
              borderRadius: "12px", padding: "12px 18px",
              color: "#fff", fontSize: "14px", outline: "none", width: "280px",
            }}
          />
        </div>

       
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "30px" }}>
          
         
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <div style={{
              borderRadius: "24px", overflow: "hidden",
              border: `2px solid ${active?.color}55`,
              boxShadow: `0 20px 50px -10px ${active?.color}33`,
              background: "#000",
              aspectRatio: "16/9",
              position: "relative",
            }}>
              <iframe
                key={active?.id}
                src={`https://www.youtube.com/embed/${active?.youtubeId}?autoplay=1&mute=0&rel=0&modestbranding=1&origin=${window.location.origin}`}
                title={active?.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              ></iframe>
            </div>

            
            <div style={{
              marginTop: "20px", padding: "24px",
              background: "#0e0e18", borderRadius: "20px",
              border: "1px solid #1a1a28",
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  width: "55px", height: "55px", borderRadius: "14px",
                  background: active?.color, display: "flex", alignItems: "center",
                  justifyContent: "center", fontWeight: 900, fontSize: "15px", flexShrink: 0,
                  boxShadow: `0 4px 15px ${active?.color}44`
                }}>
                  {active?.logo}
                </div>
                <div>
                  <h2 style={{ fontWeight: 800, fontSize: "22px", margin: 0 }}>{active?.name}</h2>
                  <p style={{ fontSize: "14px", color: "#777", margin: "4px 0 0" }}>{active?.description}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                 <span style={{ fontSize: "12px", background: "#1a1a28", padding: "8px 16px", borderRadius: "10px", fontWeight: 600 }}>{active?.country}</span>
                 <span style={{ fontSize: "12px", background: `${active?.color}22`, color: active?.color, padding: "8px 16px", borderRadius: "10px", fontWeight: 700 }}>{active?.genre}</span>
              </div>
            </div>
          </div>

          
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {GENRES.map(g => (
                <button key={g} onClick={() => setGenre(g)} style={{
                  padding: "8px 16px", borderRadius: "50px",
                  fontSize: "12px", fontWeight: 700, border: "1px solid",
                  borderColor: genre === g ? "#EF4444" : "#222",
                  background: genre === g ? "#EF4444" : "transparent",
                  color: "#fff", cursor: "pointer", transition: "all 0.2s",
                }}>{g}</button>
              ))}
            </div>

            <div style={{ 
              display: "flex", flexDirection: "column", gap: "12px", 
              maxHeight: "68vh", overflowY: "auto", paddingRight: "10px" 
            }}>
              {filtered.map(ch => {
                const isActive = ch.id === active?.id;
                return (
                  <div
                    key={ch.id}
                    onClick={() => setActive(ch)}
                    className="ch-card"
                    style={{
                      display: "flex", alignItems: "center", gap: "15px",
                      padding: "14px", borderRadius: "16px", cursor: "pointer",
                      background: isActive ? "#12121e" : "transparent",
                      borderColor: isActive ? ch.color : "#1a1a28",
                    }}
                  >
                    <div style={{
                      width: "45px", height: "45px", borderRadius: "10px", flexShrink: 0,
                      background: ch.color, display: "flex", alignItems: "center",
                      justifyContent: "center", fontWeight: 900, fontSize: "12px"
                    }}>{ch.logo}</div>
                    
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, fontSize: "15px", margin: 0, color: isActive ? "#fff" : "#ccc" }}>{ch.name}</p>
                      <p style={{ fontSize: "12px", color: "#555", margin: 0 }}>{ch.country}</p>
                    </div>
                    
                    {isActive && (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                         <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#EF4444", animation: "pulse 1.5s infinite" }} />
                         <span style={{ fontSize: "10px", fontWeight: 800, color: "#EF4444" }}>LIVE</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}