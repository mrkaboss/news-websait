import { useState, useRef, useEffect } from "react";

const STATIONS = [
  {
    id: 1,
    name: "Radio Rwanda",
    country: "🇷🇼 Rwanda",
    genre: "News & Talk",
    stream: "https://stream.zeno.fm/yn65m68mg18uv",
    color: "#0066CC",
    description: "Itozo rya leta y'u Rwanda",
  },
  {
    id: 2,
    name: "BBC World Service",
    country: "🇬🇧 UK",
    genre: "International News",
    stream: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
    color: "#BB1919",
    description: "World news 24/7",
  },
  {
    id: 3,
    name: "Voice of America",
    country: "🇺🇸 USA",
    genre: "News",
    stream: "https://mediaserver.voanews.com/rwandaservice/playlist.m3u8",
    color: "#003087",
    description: "VOA — Amajwi ya Amerika",
  },
  {
    id: 4,
    name: "Radio France International",
    country: "🇫🇷 France",
    genre: "International",
    stream: "https://icecast.radiofrance.fr/rfi-monde-hifi.aac",
    color: "#003189",
    description: "RFI — Amakuru yo ku isi",
  },
  {
    id: 5,
    name: "Isango Star",
    country: "🇷🇼 Rwanda",
    genre: "Entertainment",
    stream: "https://stream.zeno.fm/f3wvbbqmdg8uv",
    color: "#F59E0B",
    description: "music and'newa",
  },
  {
    id: 6,
    name: "Contact FM",
    country: "🇷🇼 Rwanda",
    genre: "Music & News",
    stream: "https://stream.zeno.fm/0r0xa792kwzuv",
    color: "#10B981",
    description: "Muziki n'amakuru y'u Rwanda",
  },
  {
    id: 7,
    name: "Al Jazeera",
    country: "🇶🇦 Qatar",
    genre: "International News",
    stream: "https://live-hls-audio-aka.getaj.net/VOICE/03.m3u8",
    color: "#EE8000",
    description: "Breaking news worldwide",
  },
  {
    id: 8,
    name: "Deutsche Welle",
    country: "🇩🇪 Germany",
    genre: "News",
    stream: "https://dw-lounge.stream.laut.fm/dw-lounge",
    color: "#C8102E",
    description: "DW — Amakuru mpuzamahanga",
  },
];

const GENRES = ["All", "News & Talk", "International News", "Entertainment", "Music & News", "International", "News"];

function WaveAnimation({ playing }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "20px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            width: "3px",
            borderRadius: "2px",
            background: "#fff",
            animation: playing ? `wave${i} ${0.8 + i * 0.1}s ease-in-out infinite alternate` : "none",
            height: playing ? "100%" : "4px",
            transition: "height 0.3s ease",
          }}
        />
      ))}
      <style>{`
        @keyframes wave1 { from { height: 4px } to { height: 20px } }
        @keyframes wave2 { from { height: 8px } to { height: 16px } }
        @keyframes wave3 { from { height: 4px } to { height: 20px } }
        @keyframes wave4 { from { height: 10px } to { height: 14px } }
        @keyframes wave5 { from { height: 4px } to { height: 18px } }
      `}</style>
    </div>
  );
}

export default function Radio() {
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [genre, setGenre] = useState("All");
  const [search, setSearch] = useState("");
  const audioRef = useRef(null);

  const filtered = STATIONS.filter(s =>
    (genre === "All" || s.genre === genre) &&
    (search === "" || s.name.toLowerCase().includes(search.toLowerCase()))
  );

  const playStation = (station) => {
    setError(false);
    if (current?.id === station.id && playing) {
      audioRef.current?.pause();
      setPlaying(false);
      return;
    }
    setCurrent(station);
    setLoading(true);
    setPlaying(false);
  };

  useEffect(() => {
    if (!current) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = current.stream;
    audio.volume = volume / 100;
    audio.load();

    const onPlay = () => { setLoading(false); setPlaying(true); };
    const onError = () => { setLoading(false); setError(true); setPlaying(false); };
    const onWaiting = () => setLoading(true);

    audio.addEventListener("playing", onPlay);
    audio.addEventListener("error", onError);
    audio.addEventListener("waiting", onWaiting);
    audio.play().catch(() => setError(true));

    return () => {
      audio.removeEventListener("playing", onPlay);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("waiting", onWaiting);
    };
  }, [current]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  const togglePlay = () => {
    if (!current) return;
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      audioRef.current?.play();
      setPlaying(true);
    }
  };

  return (
    <div style={{ background: "#0f0f13", minHeight: "100vh", fontFamily: "sans-serif", color: "#fff", paddingBottom: "120px" }}>
      <audio ref={audioRef} preload="none" />

      
      <div style={{ padding: "40px 24px 0", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#EF4444", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "8px" }}>
            🎙 Live Streaming
          </p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1 }}>
            WORLD <span style={{ color: "#EF4444" }}>RADIO</span>
          </h1>
          <p style={{ color: "#666", fontSize: "14px", marginTop: "8px" }}>
            {STATIONS.length} radiyo zo ku isi yose — Kumvira ubuntu
          </p>
        </div>

        
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
          <input
            type="text"
            placeholder="🔍 Shakisha radiyo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: "#1a1a24", border: "1px solid #2a2a38", borderRadius: "12px",
              padding: "10px 16px", color: "#fff", fontSize: "14px", outline: "none",
              width: "220px",
            }}
          />
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["All", "News & Talk", "International News", "Entertainment", "Music & News"].map(g => (
              <button key={g} onClick={() => setGenre(g)} style={{
                padding: "8px 16px", borderRadius: "50px", fontSize: "11px", fontWeight: 700,
                border: "1.5px solid",
                borderColor: genre === g ? "#EF4444" : "#2a2a38",
                background: genre === g ? "#EF4444" : "transparent",
                color: genre === g ? "#fff" : "#666",
                cursor: "pointer", transition: "all 0.2s",
              }}>{g}</button>
            ))}
          </div>
        </div>

        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {filtered.map((station) => {
            const isActive = current?.id === station.id;
            return (
              <div
                key={station.id}
                onClick={() => playStation(station)}
                style={{
                  background: isActive ? "#1a1a24" : "#141418",
                  border: `1.5px solid ${isActive ? station.color : "#2a2a38"}`,
                  borderRadius: "20px", padding: "20px", cursor: "pointer",
                  transition: "all 0.25s ease",
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                  boxShadow: isActive ? `0 8px 32px ${station.color}33` : "none",
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = "#444"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = "#2a2a38"; }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                  {/* Logo circle */}
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "14px",
                    background: station.color, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "18px", fontWeight: 900,
                    color: "#fff", letterSpacing: "-1px",
                  }}>
                    {station.name.charAt(0)}
                  </div>

                  
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: isActive && playing ? station.color : "#2a2a38",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.3s",
                  }}>
                    {isActive && loading ? (
                      <div style={{
                        width: "14px", height: "14px", border: "2px solid #fff",
                        borderTop: "2px solid transparent", borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }} />
                    ) : isActive && playing ? (
                      <WaveAnimation playing={playing} />
                    ) : (
                      <span style={{ fontSize: "12px", color: "#888" }}>▶</span>
                    )}
                  </div>
                </div>

                <h3 style={{ fontWeight: 800, fontSize: "15px", marginBottom: "4px", color: isActive ? "#fff" : "#ddd" }}>
                  {station.name}
                </h3>
                <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>{station.description}</p>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", color: "#555" }}>{station.country}</span>
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#444" }} />
                  <span style={{
                    fontSize: "10px", fontWeight: 700, color: station.color,
                    background: `${station.color}22`, padding: "2px 8px", borderRadius: "4px",
                  }}>{station.genre}</span>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#444" }}>
            <p style={{ fontSize: "40px", marginBottom: "12px" }}>📻</p>
            <p style={{ fontWeight: 700 }}>Nta radiyo iboneka muri iki giciro</p>
          </div>
        )}
      </div>

      
      {current && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "#0f0f13", borderTop: "1px solid #1e1e2a",
          padding: "16px 24px", zIndex: 100,
          backdropFilter: "blur(20px)",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, minWidth: "200px" }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: current.color, display: "flex", alignItems: "center",
                justifyContent: "center", fontWeight: 900, fontSize: "18px", flexShrink: 0,
              }}>
                {current.name.charAt(0)}
              </div>
              <div>
                <p style={{ fontWeight: 800, fontSize: "15px", margin: 0 }}>{current.name}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {playing && <WaveAnimation playing={playing} />}
                  <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                    {loading ? "Irimo gutangira..." : error ? "Ikibazo — gerageza irindi" : playing ? "Live" : "Ininterrupted"}
                  </p>
                </div>
              </div>
            </div>

            
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                onClick={togglePlay}
                style={{
                  width: "52px", height: "52px", borderRadius: "50%",
                  background: playing ? "#EF4444" : "#fff",
                  border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px", transition: "all 0.2s",
                }}
              >
                {loading ? (
                  <div style={{ width: "18px", height: "18px", border: "2px solid #000", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                ) : playing ? "⏸" : "▶"}
              </button>
            </div>

           
            <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "160px" }}>
              <span style={{ fontSize: "14px" }}>{volume === 0 ? "🔇" : volume < 50 ? "🔉" : "🔊"}</span>
              <input
                type="range" min="0" max="100" value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                style={{ flex: 1, accentColor: "#EF4444", cursor: "pointer" }}
              />
              <span style={{ fontSize: "12px", color: "#666", minWidth: "30px" }}>{volume}%</span>
            </div>

          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}
    </div>
  );
}