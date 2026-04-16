import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #667eea, #764ba2)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
          Store Rating App ⭐
        </h1>

        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Rate stores and explore reviews
        </p>

        <div>
          <Link to="/login">
            <button
              style={{
                padding: "10px 20px",
                margin: "10px",
                borderRadius: "8px",
                border: "none",
                background: "#fff",
                color: "#333",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button
              style={{
                padding: "10px 20px",
                margin: "10px",
                borderRadius: "8px",
                border: "none",
                background: "#ffcc00",
                color: "#000",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}