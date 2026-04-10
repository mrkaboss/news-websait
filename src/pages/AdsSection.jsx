const AdsSection = () => {
  const ads = [
    {
      id: 1,
      title: "Promote Your Business",
      desc: "Anasika hano amatangazo yawe agere kubantu benshi mu buryo bwihuse.",
      buttonText: "Twandikire",
      bg: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)", // Blue
    },
    {
      id: 2,
      title: "World TV Live",
      desc: "Kureba amateleviziyo yose yo ku isi imbona nkubone kuri News Rwanda.",
      buttonText: "Reba TV",
      bg: "linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)", // Red
    }
  ];

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "20px" 
      }}>
        {ads.map((ad) => (
          <div key={ad.id} style={{
            background: ad.bg,
            borderRadius: "20px",
            padding: "30px",
            color: "white",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease"
          }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            
            <span style={{ 
              fontSize: "10px", 
              background: "rgba(255,255,255,0.2)", 
              padding: "4px 10px", 
              borderRadius: "50px",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>Itangazo</span>
            
            <h3 style={{ fontSize: "24px", margin: "15px 0 10px", fontWeight: "800" }}>{ad.title}</h3>
            <p style={{ fontSize: "14px", opacity: 0.9, marginBottom: "20px", lineHeight: "1.5" }}>{ad.desc}</p>
            
            <button style={{
              background: "white",
              color: "black",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "13px"
            }}>
              {ad.buttonText}
            </button>

            
            <div style={{
              position: "absolute",
              right: "-20px",
              bottom: "-20px",
              width: "100px",
              height: "100px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%"
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};