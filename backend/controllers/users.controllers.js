import User from "../models/auth.models.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(
      "Something went wrong in getUsersForSidebar, error in getUsersForSidebar controller" +
        error.message
    );
    res.status(500).json({ message: error.message });
  }
};
