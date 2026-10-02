const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const camionRoutes = require("./src/routes/camionRoutes");
const remorqueRoutes = require("./src/routes/remorqueRoutes");
const pneuRoutes = require("./src/routes/pneuRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/camion", camionRoutes);
app.use("/api/remorque", remorqueRoutes);
app.use("/api/pneu", pneuRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Fleet Management API is running",
  });
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
