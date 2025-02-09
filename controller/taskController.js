const User = require("../model/userModel");
const Task = require("../model/taskModel");

const createTask = async (req, res) => {
    try {
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
            user: userId 
        });
    
        await task.save();
    
        user.tasks.push(task._id);
        await user.save();  
    
        return res.status(201).json({ message: "Task created successfully" });
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

const displayTask = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const tasks = await Task.find({ user: userId });

        return res.status(200).json({
            message: "Tasks successfully fetched",
            tasks: tasks  
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateTask = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
 
    }
};



module.exports = {
    createTask,
    displayTask
}