const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();const { sequelize } = require("./models");

sequelize.sync().then(() => {
  console.log("DB Connected");
});
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://store-rating-app-1-t7r5.onrender.com"
  ],
  credentials: true
}));


app.use(express.json());
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/owner", require("./routes/ownerRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));