import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  //  NEW (ADMIN USERS)
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");

  //  FETCH DATA
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        if (user.role === "user") {
          const res = await API.get("/user/stores");
          setData(res.data);
        }

        if (user.role === "admin") {
          const res = await API.get("/admin/dashboard");
          setData(res.data);

          //  FETCH USERS
          const u = await API.get("/admin/users");
          setUsers(u.data);
        }

        if (user.role === "owner") {
          const res = await API.get("/owner/dashboard");
          setData(res.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error loading data");
      }
    };

    fetchData();
  }, [user]);

  //  USER STORE FILTER
  let filteredStores = [];

  if (user?.role === "user" && Array.isArray(data)) {
    filteredStores = data.filter(
      (store) =>
        store.name?.toLowerCase().includes(search.toLowerCase()) ||
        store.address?.toLowerCase().includes(search.toLowerCase())
    );
  }

  //  ADMIN USER FILTER
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.address?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.role?.toLowerCase().includes(userSearch.toLowerCase())
  );

  //  RATE STORE
  const rate = async (storeId, value) => {
    try {
      await API.post("/user/rate", {
        store_id: storeId,
        rating: value,
      });

      toast.success("Rating submitted ⭐");

      const res = await API.get("/user/stores");
      setData(res.data);
    } catch {
      toast.error("Error rating ");
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        {user.role.toUpperCase()} DASHBOARD
      </h1>

      <button onClick={logout} style={styles.logout}>
        Logout
      </button>

      {/*  PASSWORD UPDATE */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          style={styles.input}
        />
        <button
          style={{ ...styles.button, background: "#28a745", marginLeft: "10px" }}
          onClick={async () => {
            try {
              await API.put("/auth/update-password", {
                password: data.password,
              });
              toast.success("Password updated");
            } catch {
              toast.error("Error updating password");
            }
          }}
        >
          Update Password
        </button>
      </div>

      {/* ================= USER ================= */}
      {user.role === "user" && (
        <>
          <input
            placeholder="🔍 Search stores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />

          <div style={styles.grid}>
            {filteredStores.map((store) => (
              <div
                key={store.id}
                style={styles.card}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <h3>{store.name}</h3>
                <p>📍 {store.address}</p>

                <p>
                  ⭐ Avg:{" "}
                  <b>
                    {parseFloat(store.avgRating || 0).toFixed(1)}
                  </b>
                </p>

                <div style={{ display: "flex", gap: "6px" }}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <FaStar
                      key={num}
                      size={20}
                      color={
                        num <= (store.userRating || 0)
                          ? "#ffc107"
                          : "#ccc"
                      }
                      onClick={() => rate(store.id, num)}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= ADMIN ================= */}
      {user.role === "admin" && (
        <>
          <div style={styles.grid}>
            <div style={styles.card}>
              <h2>{data.users}</h2>
              <p>Total Users</p>
            </div>

            <div style={styles.card}>
              <h2>{data.stores}</h2>
              <p>Total Stores</p>
            </div>

            <div style={styles.card}>
              <h2>{data.ratings}</h2>
              <p>Total Ratings</p>
            </div>
          </div>

          {/*  USER SEARCH */}
          <input
            placeholder="🔍 Search users..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            style={styles.search}
          />

          {/*  USER LIST */}
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ color: "#fff" }}>Users</h3>

            {filteredUsers.map((u) => (
              <div key={u.id} style={styles.userCard}>
                <b>{u.name}</b> | {u.email} | {u.address} | {u.role}

                {u.role === "owner" && (
                  <span> | ⭐ {u.ownerRating || 0}</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= OWNER ================= */}
      {user.role === "owner" && (
        <>
          <div style={styles.card}>
            <h2>{data.avgRating || 0}</h2>
            <p>Average Rating</p>
          </div>

          {data.ratings?.map((r) => (
            <div key={r.id} style={styles.userCard}>
              <b>{r.User.name}</b> | {r.User.email}
              <p>⭐ {r.rating}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  heading: {
    color: "#fff",
    marginBottom: "10px",
  },
  logout: {
    background: "#ff4d4d",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    float: "right",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "rgba(255,255,255,0.9)",
    padding: "20px",
    borderRadius: "16px",
    textAlign: "center",
    transition: "0.3s",
  },
  search: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    borderRadius: "10px",
    border: "none",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  userCard: {
    background: "#fff",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "10px",
  },
};