import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const u = await API.get("/admin/users");
      const s = await API.get("/admin/stores");
      setUsers(u.data);
      setStores(s.data);
    } catch {
      toast.error("Error loading admin data");
    }
  };

  // 🔍 FILTER + SORT
  const filteredUsers = users
    .filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.address.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const result = a.name.localeCompare(b.name);
      return sortOrder === "asc" ? result : -result;
    });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔽 SORT */}
      <button
        onClick={() =>
          setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        }
      >
        Sort: {sortOrder.toUpperCase()}
      </button>

      {/* 👥 USERS */}
      <h3>Users</h3>

      {filteredUsers.map((u) => (
        <div key={u.id} style={{ marginBottom: "10px" }}>
          <b>{u.name}</b> | {u.email} | {u.address} | {u.role}

          {u.role === "owner" && (
            <span> | ⭐ {u.ownerRating}</span>
          )}

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => setSelectedUser(u)}
          >
            View
          </button>
        </div>
      ))}

      {/* 🪟 MODAL */}
      {selectedUser && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            width: "300px"
          }}>
            <h3>User Details</h3>

            <p><b>Name:</b> {selectedUser.name}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Address:</b> {selectedUser.address}</p>
            <p><b>Role:</b> {selectedUser.role}</p>

            {selectedUser.role === "owner" && (
              <p><b>Store Rating:</b> ⭐ {selectedUser.ownerRating}</p>
            )}

            <button onClick={() => setSelectedUser(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* 🏪 STORES */}
      <h3>Stores</h3>
      {stores.map((s) => (
  <div key={s.id}>
    {s.name} | {s.email} | {s.address} | ⭐ {s.avgRating || 0}
  </div>
))}
    </div>
  );
}