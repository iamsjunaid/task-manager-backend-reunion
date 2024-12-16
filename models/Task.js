const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
  status: {
    type: DataTypes.ENUM("pending", "finished"),
    defaultValue: "pending",
  },
  start_time: { type: DataTypes.DATE, allowNull: false },
  end_time: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Task;
