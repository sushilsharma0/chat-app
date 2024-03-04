import mongoose from "mongoose";

function connectToDatabase() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("successfully connected to Mongodb");
  } catch (error) {
    console.log("Error connecting to database", error.message);
  }
}

export default connectToDatabase;
