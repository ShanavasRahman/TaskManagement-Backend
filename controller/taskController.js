const User = require("../model/userModel");
const Task = require("../model/taskModel");

const createTask = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, dueDate, priority, userId } = req.body;


    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      user: userId,
    });

    await task.save();

    user.tasks.push(task._id);
    await user.save();

    return res.status(201).json({ message: "Task created successfully",tasks:task});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const displayTask = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const tasks = await Task.find({ user: id });

    return res.status(200).json({
      message: "Tasks successfully fetched",
      tasks: tasks,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, priority } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: { title, description, priority } },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "task updated successfully", task: updatedTask });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    return res
      .status(200)
      .json({ message: "task deleted successfully", task: deletedTask });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createTask,
  displayTask,
  updateTask,
  deleteTask,
};
