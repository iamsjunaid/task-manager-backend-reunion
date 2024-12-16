const express = require("express");
const sequelize = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(express.json());

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
