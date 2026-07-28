require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;
const githubRoutes = require("./src/routes/githubRoutes");
app.use("/api/github", githubRoutes);

// Connect Database
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
