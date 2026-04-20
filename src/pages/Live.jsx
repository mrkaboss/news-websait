import { useState, useEffect, useRef } from "react";

export default function Live() {
  const [mode, setMode] = useState(null);
  const [peerId, setPeerId] = useState("");
  const [hostId, setHostId] = useState("");
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [peerReady, setPeerReady] = useState(false);

  const peerRef = useRef(null);
  const streamRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const connectionsRef = useRef([]);

  useEffect(() => {
    if (window.Peer) { setPeerReady(true); return; }
    const script = document.createElement("script");
    script.src = "https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js";
    script.onload = () => setPeerReady(true);
    script.onerror = () => setError("PeerJS yanze gushyirwa — Reba internet yawe");
    document.head.appendChild(script);
  }, []);

  const startLive = async () => {
    if (!peerReady) { setError("Tegereza gato — PeerJS irashyirwa..."); return; }
    try {
      setLoading(true);
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play();
      }
      const peer = new window.Peer();
      peerRef.current = peer;
      peer.on("open", (id) => { setPeerId(id); setJoined(true); setLoading(false); });
      peer.on("call", (call) => {
        call.answer(stream);
        connectionsRef.current.push(call);
        setViewers(v => v + 1);
        call.on("close", () => setViewers(v => Math.max(0, v - 1)));
        call.on("error", () => setViewers(v => Math.max(0, v - 1)));
      });
      peer.on("error", (err) => { setError("Ikibazo: " + err.message); setLoading(false); });
    } catch (err) {
      setError(err.name === "NotAllowedError" ? "Fungura camera na microphone mu browser wawe!" : "Ikibazo: " + err.message);
      setLoading(false);
    }
  };

  const watchLive = async () => {
    if (!peerReady) { setError("Tegereza gato..."); return; }
    if (!hostId.trim()) { setError("Shyiramo Live ID ya presenter!"); return; }
    try {
      setLoading(true);
      setError("");
      const peer = new window.Peer();
      peerRef.current = peer;
      peer.on("open", () => {
        const call = peer.call(hostId.trim(), null);
        if (!call) { setError("Live ID ntiboneka"); setLoading(false); return; }
        call.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
          setJoined(true);
          setLoading(false);
        });
        call.on("error", () => { setError("Guhuza byanze — Genzura Live ID"); setLoading(false); });
        call.on("close", () => { setError("Live irarangiye"); setJoined(false); });
      });
      peer.on("error", () => { setError("Live ID ntiboneka cyangwa live irarangiye"); setLoading(false); });
    } catch (err) {
      setError("Ikibazo: " + err.message);
      setLoading(false);
    }
  };

  const stopStream = () => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    connectionsRef.current.forEach(c => c.close());
    connectionsRef.current = [];
    if (peerRef.current) { peerRef.current.destroy(); peerRef.current = null; }
    setJoined(false); setMode(null); setPeerId(""); setViewers(0); setError("");
  };

  const toggleMute = () => {
    if (streamRef.current) { streamRef.current.getAudioTracks().forEach(t => { t.enabled = isMuted; }); setIsMuted(!isMuted); }
  };

  const toggleCam = () => {
    if (streamRef.current) { streamRef.current.getVideoTracks().forEach(t => { t.enabled = isCamOff; }); setIsCamOff(!isCamOff); }
  };

  const copyId = () => {
    navigator.clipboard.writeText(peerId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: "#07070f", minHeight: "100vh", fontFamily: "sans-serif", color: "#fff" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .btn { border:none; cursor:pointer; transition:all 0.2s; }
        .btn:hover { filter:brightness(1.12); transform:translateY(-1px); }
        .btn:active { transform:scale(0.97); }
        .mode-card { transition:all 0.25s; }
        .mode-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px #EF444433; border-color:#EF4444 !important; }
        .mode-card-blue:hover { box-shadow:0 12px 40px #3B82F633 !important; border-color:#3B82F6 !important; }
      `}</style>

      <div style={{ padding: "28px 24px", maxWidth: "860px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#EF4444", animation: joined ? "pulse 1s infinite" : "none" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#EF4444", letterSpacing: "3px" }}>
            {joined && mode === "broadcaster" ? "LIVE NOW" : "LIVE STUDIO"}
          </span>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: "#1a0808", border: "1px solid #EF444455", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px", fontSize: "13px", color: "#EF4444" }}>
            ⚠️ {error}
          </div>
        )}

        {/* MODE SELECTION */}
        {!mode && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "70vh", justifyContent: "center", animation: "fadeUp 0.5s ease" }}>
            <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 900, letterSpacing: "-2px", textAlign: "center", marginBottom: "10px" }}>
              GLOBAL NEWS <span style={{ color: "#EF4444" }}>LIVE</span>
            </h1>
            <p style={{ color: "#444", fontSize: "14px", textAlign: "center", marginBottom: "12px" }}>
              Nta konti isabwa — Bure burundu
            </p>
            <p style={{ color: "#333", fontSize: "12px", textAlign: "center", marginBottom: "48px" }}>
              Tangira live → Ohereza Live ID → Abantu bakakureba ari live
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", width: "100%", maxWidth: "480px" }}>
              <div className="mode-card" onClick={() => setMode("broadcaster")} style={{ background: "#0e0e1a", border: "1px solid #1e1e30", borderRadius: "24px", padding: "36px 24px", textAlign: "center", cursor: "pointer" }}>
                <div style={{ fontSize: "44px", marginBottom: "14px" }}>🎥</div>
                <p style={{ fontWeight: 900, fontSize: "17px", marginBottom: "6px" }}>Go Live</p>
                <p style={{ color: "#555", fontSize: "12px", lineHeight: 1.5 }}>Tangira live — Usangire link n'abakureba</p>
              </div>

              <div className="mode-card mode-card-blue" onClick={() => setMode("viewer")} style={{ background: "#0e0e1a", border: "1px solid #1e1e30", borderRadius: "24px", padding: "36px 24px", textAlign: "center", cursor: "pointer" }}>
                <div style={{ fontSize: "44px", marginBottom: "14px" }}>📺</div>
                <p style={{ fontWeight: 900, fontSize: "17px", marginBottom: "6px" }}>Reba Live</p>
                <p style={{ color: "#555", fontSize: "12px", lineHeight: 1.5 }}>Injira live — Koresha Live ID wabonywe</p>
              </div>
            </div>
          </div>
        )}

        {/* BROADCASTER */}
        {mode === "broadcaster" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 900, marginBottom: "20px" }}>🎥 Studio Yawe</h2>

            <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", background: "#000", aspectRatio: "16/9", maxWidth: "720px", border: joined ? "2px solid #EF4444" : "2px solid #1e1e30", boxShadow: joined ? "0 0 50px #EF444422" : "none", marginBottom: "16px" }}>
              <video ref={localVideoRef} muted style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {!joined && (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", color: "#333" }}>
                  <span style={{ fontSize: "48px" }}>🎥</span>
                  <p style={{ fontSize: "13px" }}>Camera izagaragara iyo watangije live</p>
                </div>
              )}
              {joined && (
                <>
                  <div style={{ position: "absolute", top: "14px", left: "14px", display: "flex", alignItems: "center", gap: "7px", background: "#EF4444", padding: "5px 12px", borderRadius: "50px" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#fff", animation: "pulse 1s infinite" }} />
                    <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px" }}>LIVE</span>
                  </div>
                  <div style={{ position: "absolute", top: "14px", right: "14px", background: "rgba(0,0,0,0.65)", padding: "5px 12px", borderRadius: "50px", fontSize: "12px", fontWeight: 700 }}>
                    👁 {viewers} viewers
                  </div>
                </>
              )}
            </div>

            {/* Live ID box */}
            {joined && peerId && (
              <div style={{ background: "#0e0e1a", border: "1px solid #EF444444", borderRadius: "16px", padding: "16px 20px", marginBottom: "16px", maxWidth: "720px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#EF4444", letterSpacing: "2px", marginBottom: "8px" }}>
                  📤 SANGIRA IYI ID N'ABAKUREBA
                </p>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <code style={{ flex: 1, background: "#141420", padding: "10px 14px", borderRadius: "10px", fontSize: "12px", color: "#aaa", wordBreak: "break-all" }}>
                    {peerId}
                  </code>
                  <button className="btn" onClick={copyId} style={{ background: copied ? "#10B981" : "#EF4444", color: "#fff", padding: "10px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "12px", whiteSpace: "nowrap" }}>
                    {copied ? "✓ Copied!" : "📋 Copy"}
                  </button>
                </div>
                <p style={{ fontSize: "11px", color: "#333", marginTop: "8px" }}>
                  Abantu bashaka kukureba bazashyira iyi ID mu "Reba Live"
                </p>
              </div>
            )}

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", maxWidth: "720px" }}>
              {!joined ? (
                <button className="btn" onClick={startLive} disabled={loading} style={{ background: "#EF4444", color: "#fff", padding: "14px 32px", borderRadius: "14px", fontWeight: 900, fontSize: "15px", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", gap: "8px" }}>
                  {loading ? <><div style={{ width: "16px", height: "16px", border: "2px solid #fff", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> Gutangira...</> : "🔴 Tangira Live"}
                </button>
              ) : (
                <>
                  <button className="btn" onClick={toggleMute} style={{ background: isMuted ? "#EF4444" : "#1e1e30", color: "#fff", padding: "12px 22px", borderRadius: "12px", fontWeight: 700, fontSize: "13px" }}>
                    {isMuted ? "🔇 Unmute" : "🎤 Mute"}
                  </button>
                  <button className="btn" onClick={toggleCam} style={{ background: isCamOff ? "#EF4444" : "#1e1e30", color: "#fff", padding: "12px 22px", borderRadius: "12px", fontWeight: 700, fontSize: "13px" }}>
                    {isCamOff ? "📵 Cam Off" : "📷 Futa Cam"}
                  </button>
                  <button className="btn" onClick={stopStream} style={{ background: "#1e1e30", color: "#EF4444", padding: "12px 22px", borderRadius: "12px", fontWeight: 700, fontSize: "13px", border: "1px solid #EF444444" }}>
                    ⏹ Hagarika
                  </button>
                </>
              )}
              <button className="btn" onClick={() => { stopStream(); setMode(null); }} style={{ background: "transparent", color: "#555", padding: "12px 18px", borderRadius: "12px", fontWeight: 700, border: "1px solid #1e1e30", fontSize: "13px" }}>
                ← Subira
              </button>
            </div>
          </div>
        )}

        {/* VIEWER */}
        {mode === "viewer" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 900, marginBottom: "20px" }}>📺 Reba Live</h2>

            <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", background: "#000", aspectRatio: "16/9", maxWidth: "720px", border: joined ? "2px solid #3B82F6" : "2px solid #1e1e30", marginBottom: "16px" }}>
              <video ref={remoteVideoRef} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {!joined && (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", color: "#333" }}>
                  <span style={{ fontSize: "48px" }}>📺</span>
                  <p style={{ fontSize: "13px" }}>Shyiramo Live ID hepfo ukande "Injira"</p>
                </div>
              )}
              {joined && (
                <div style={{ position: "absolute", top: "14px", left: "14px", display: "flex", alignItems: "center", gap: "7px", background: "#EF4444", padding: "5px 12px", borderRadius: "50px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#fff", animation: "pulse 1s infinite" }} />
                  <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px" }}>LIVE</span>
                </div>
              )}
            </div>

            {!joined && (
              <div style={{ maxWidth: "720px", marginBottom: "16px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#3B82F6", letterSpacing: "2px", marginBottom: "8px" }}>SHYIRAMO LIVE ID</p>
                <input
                  type="text"
                  placeholder="Shyiramo Live ID wabonye ku presenter..."
                  value={hostId}
                  onChange={e => setHostId(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && watchLive()}
                  style={{ width: "100%", background: "#0e0e1a", border: "1px solid #1e1e30", borderRadius: "12px", padding: "12px 16px", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            )}

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {!joined ? (
                <button className="btn" onClick={watchLive} disabled={loading} style={{ background: "#3B82F6", color: "#fff", padding: "14px 32px", borderRadius: "14px", fontWeight: 900, fontSize: "15px", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", gap: "8px" }}>
                  {loading ? <><div style={{ width: "16px", height: "16px", border: "2px solid #fff", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> Guhuza...</> : "▶ Injira Live"}
                </button>
              ) : (
                <button className="btn" onClick={stopStream} style={{ background: "#1e1e30", color: "#EF4444", padding: "12px 22px", borderRadius: "12px", fontWeight: 700, fontSize: "13px", border: "1px solid #EF444444" }}>
                  ⏹ Sohoka
                </button>
              )}
              <button className="btn" onClick={() => { stopStream(); setMode(null); }} style={{ background: "transparent", color: "#555", padding: "12px 18px", borderRadius: "12px", fontWeight: 700, border: "1px solid #1e1e30", fontSize: "13px" }}>
                ← Subira
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}