const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const { status, priority, sortBy, order } = req.query;
    const where = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    const orderBy = sortBy ? [[sortBy, order || "ASC"]] : [];

    const tasks = await Task.findAll({ where, order: orderBy });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, priority, status, start_time, end_time } = req.body;
    const newTask = await Task.create({
      title,
      priority,
      status,
      start_time,
      end_time,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

exports.updateTaskStatus = async (req, res) => {
  
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(id, status);
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.status = status;
    if (status === "finished") task.end_time = new Date();
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};
