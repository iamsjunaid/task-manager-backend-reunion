const express = require("express");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(express.json());

// Middleware
app.use("/auth", authRoutes);

// Routes
app.use("/tasks", taskRoutes);
app.use("/dashboard", dashboardRoutes);

// Database sync and server start
const PORT = 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
