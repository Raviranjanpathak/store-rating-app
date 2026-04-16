import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name.length < 20 || form.name.length > 60) {
  return toast.error("Name must be 20-60 chars");
}

if (!/[A-Z]/.test(form.password) || !/[!@#$%^&*]/.test(form.password)) {
  return toast.error("Password must contain uppercase & special char");
}
    try {
      await API.post("/auth/signup", form);
      toast.success("Signup successful 🎉");
      navigate("/login");
    } catch {
      toast.error("Error ❌");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>

        <input
          placeholder="Full Name"
          style={styles.input}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Address"
          style={styles.input}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button style={styles.button}>Signup</button>

        <p style={styles.text}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
  text: {
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#43cea2",
    fontWeight: "bold",
  },
};