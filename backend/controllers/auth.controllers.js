import User from "../models/auth.models.js";
import bcrypt from "bcrypt";
import generateJwtTokenAndSetCookie from "../utils/generateJwtToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, email, password, gender, confirmPassword } =
      req.body;
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "confirm password does not match!!" });
    }
    const user = await User.findOne({ userName });
    const userEmail = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "username already exists!!" });
    }
    if (userEmail) {
      return res.status(400).json({ message: "Email already exists!!" });
    }

    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
      gender,
      profilePicture:
        gender === "male" ? boyProfilePicture : girlProfilePicture,
    });

    if (newUser) {
      generateJwtTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        email: newUser.email,
        gender: newUser.gender,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(400).json({ message: "Something went wrong!!" });
    }
  } catch (error) {
    console.log(
      "Something went wrong in signup controller, error in signup controller " +
        error.message
    );
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email and password!!" });
    }

    generateJwtTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      gender: user.gender,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log(
      "Something went wrong in login controller, error in login controller " +
        error.message
    );
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    // res.clearCookie("token"); // Delete the "token" cookie
    res.status(200).json({ message: "Successfully logged out!!" });
  } catch (error) {
    console.log(
      "Something went wrong in logout controller, error in logout controller " +
        error.message
    );
    res.status(500).json({ message: error.message });
  }
};
