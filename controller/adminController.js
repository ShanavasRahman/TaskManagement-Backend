const User = require("../model/userModel");


const getUsers = async (req, res) => {
    try {
        console.log("Fetching users...");
        
        // Fetch only users where role is "user"
        const users = await User.find({ role: "user" }, "_id name email");

        return res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateUser=async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name, email: req.body.email, role: req.body.role },
        { new: true }
      );
      res.json({ user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  }


const deleteUser = async (req, res) => {
    try {
        console.log("im in the deleteuser")
        const { userId } = req.params; 

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(userId);

        return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};





module.exports = {
    getUsers,
    deleteUser,
    updateUser
}
