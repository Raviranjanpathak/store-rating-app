import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      
      {/* HERO SECTION */}
      <section
        style={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
          Store Rating Platform ⭐
        </h1>

        <p style={{ fontSize: "18px", maxWidth: "600px" }}>
          Discover stores, rate your experience, and explore what others think.
        </p>

        <div style={{ marginTop: "30px" }}>
          <Link to="/login">
            <button className="btn-primary">Login</button>
          </Link>

          <Link to="/signup">
            <button className="btn-secondary">Signup</button>
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>How It Works</h2>

        <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "30px", flexWrap: "wrap" }}>
          
          <div className="card">
            <h3>👤 Signup</h3>
            <p>Create your account and get started instantly.</p>
          </div>

          <div className="card">
            <h3>🏪 Explore Stores</h3>
            <p>Browse stores and check ratings from users.</p>
          </div>

          <div className="card">
            <h3>⭐ Rate & Review</h3>
            <p>Share your experience and help others decide.</p>
          </div>

        </div>
      </section>

      {/* STORE PREVIEW */}
      <section style={{ padding: "60px 20px", background: "#f5f5f5" }}>
        <h2 style={{ textAlign: "center" }}>Popular Stores</h2>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap"
        }}>
          
          {["Reliance Store", "D-Mart", "Big Bazaar"].map((store, i) => (
            <div key={i} className="store-card">
              <h3>{store}</h3>
              <p>📍 Prime Location</p>
              <p>⭐ 4.{i + 2}</p>
            </div>
          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "20px",
        textAlign: "center",
        background: "#111",
        color: "#fff"
      }}>
        <p>© 2026 Raviranjan Pathak</p>

        <div style={{ marginTop: "10px" }}>
          <a href="https://github.com/Raviranjanpathak" target="_blank" style={linkStyle}>GitHub</a>
          <a href="https://www.linkedin.com/in/raviranjan-pathak" target="_blank" style={linkStyle}>LinkedIn</a>
        </div>
      </footer>

      {/* STYLES */}
      <style>{`
        .btn-primary {
          padding: 12px 24px;
          margin: 10px;
          border-radius: 8px;
          border: none;
          background: white;
          color: black;
          font-weight: bold;
          cursor: pointer;
        }

        .btn-secondary {
          padding: 12px 24px;
          margin: 10px;
          border-radius: 8px;
          border: none;
          background: #ffcc00;
          font-weight: bold;
          cursor: pointer;
        }

        .card {
          width: 250px;
          padding: 20px;
          border-radius: 12px;
          background: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .store-card {
          width: 220px;
          padding: 20px;
          border-radius: 12px;
          background: white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          text-align: center;
        }

        a {
          margin: 0 10px;
          color: #ffcc00;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}

const linkStyle = {
  margin: "0 10px",
  color: "#ffcc00",
  textDecoration: "none"
};