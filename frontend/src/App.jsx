import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing"; // ✅ import

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* ✅ Login Page */}
        <Route path="/login" element={<Login />} />

        {/* ✅ Signup */}
        <Route path="/signup" element={<Signup />} />

        <Route path="/admin" element={<AdminPanel />} />

        {/* ✅ Protected Dashboard */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
      <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;