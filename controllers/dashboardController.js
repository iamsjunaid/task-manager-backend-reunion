const sequelize = require("sequelize");
const Task = require("../models/Task");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalTasks = await Task.count();
    console.log("Total Tasks:", totalTasks);

    const completedTasks = await Task.count({ where: { status: "finished" } });
    const pendingTasks = totalTasks - completedTasks;
    console.log("Completed Tasks:", completedTasks);
    console.log("Pending Tasks:", pendingTasks);

    // Pending Task Time Stats
    const timeStats = await Task.findAll({
      where: { status: "pending" },
      attributes: ["priority", "start_time", "end_time"],
    });

    let timeLapsed = 0,
      estimatedRemaining = 0;
    const currentTime = new Date();

    timeStats.forEach((task) => {
      const startTime = new Date(task.start_time).getTime();
      const endTime = new Date(task.end_time).getTime();

      timeLapsed += (currentTime.getTime() - startTime) / 3600000; // Convert ms to hours
      const remaining = (endTime - currentTime.getTime()) / 3600000;
      estimatedRemaining += remaining > 0 ? remaining : 0;
    });

    // Average Completion Time
    const avgCompletionTime = await Task.findAll({
      where: { status: "finished" },
      attributes: [
        [
          sequelize.fn(
            "AVG",
            sequelize.literal(
              "EXTRACT(EPOCH FROM end_time) - EXTRACT(EPOCH FROM start_time)"
            )
          ),
          "averageTime",
        ],
      ],
      raw: true,
    });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      timeLapsed: timeLapsed.toFixed(2),
      estimatedRemaining: estimatedRemaining.toFixed(2),
      avgCompletionTime: avgCompletionTime[0].averageTime
        ? (avgCompletionTime[0].averageTime / 3600).toFixed(2) // Convert seconds to hours
        : 0,
    });
  } catch (error) {
    console.error("Error in Dashboard Stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
