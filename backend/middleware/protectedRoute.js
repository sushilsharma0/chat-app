import Jwt from "jsonwebtoken";
import User from "../models/auth.models.js";
const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - you are not login please login first" });
    }
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protected route middleware" + error.message);
    return res.status(401).json({ message: "invalid server error" });
  }
};

export default protectedRoute;
