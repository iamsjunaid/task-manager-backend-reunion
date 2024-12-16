const express = require("express");
const {
  getTasks,
  createTask,
  updateTaskStatus,
} = require("../controllers/taskController");
const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/status/:id", updateTaskStatus);

module.exports = router;
