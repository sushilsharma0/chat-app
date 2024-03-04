import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectToDatabase from "./mongoDB/mongoDb.js";
import authRoutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import usersRoutes from "./routes/users.routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to chat app");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});

