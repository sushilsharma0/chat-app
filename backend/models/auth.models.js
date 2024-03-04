import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "name should be required"],
    },
    userName: {
      type: String,
      required: [true, "username should be required"],
      unique: [true, "username should be unique"],
    },
    email: {
      type: String,
      required: [true, "email should be required"],
      unique: [true, "email should be unique"],
    },
    password: {
      type: String,
      required: [true, "password should be required"],
      trim: true,
      minlength: [8, "password length must be greater than 8"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", authSchema);

export default User;
