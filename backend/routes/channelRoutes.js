import express from "express";
import Channel from "../models/Channel.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Create Channel
router.post("/", protect, async (req, res) => {
  const { channelName, description } = req.body;
  const channel = await Channel.create({
    channelName,
    description,
    owner: req.user
  });
  res.json(channel);
});

// Get Channel by User
router.get("/:userId", async (req, res) => {
  const channel = await Channel.findOne({ owner: req.params.userId }).populate("videos");
  if (!channel) return res.status(404).json({ message: "Channel not found" });
  res.json(channel);
});

export default router;
