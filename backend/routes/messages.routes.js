import express from "express";
const router = express.Router();
import { getMessages, sendMessage } from "../controllers/messages.controllers.js";
import protectedRoute from "../middleware/protectedRoute.js";

router.get("/:id", protectedRoute, getMessages);
router.post("/send/:id", protectedRoute, sendMessage);

export default router;
