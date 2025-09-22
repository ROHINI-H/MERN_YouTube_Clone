import express from "express";
import Video from "../models/video.js"
import Channel from "../models/Channel.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get all videos
router.get("/", async (req, res) => {
  const videos = await Video.find().populate("uploader", "username").populate("channelId", "channelName");
  res.json(videos);
});

// Get single video
router.get("/:id", async (req, res) => {
  const video = await Video.findById(req.params.id).populate({
    path: "comments",
    populate: { path: "userId", select: "username" }
  });
  if (!video) return res.status(404).json({ message: "Video not found" });
  res.json(video);
});

// Upload video
router.post("/", protect, async (req, res) => {
  const { title, videoUrl, thumbnailUrl, description, category, channelId } = req.body;
  const video = await Video.create({
    title,
    videoUrl,
    thumbnailUrl,
    description,
    category,
    channelId,
    uploader: req.user
  });

  await Channel.findByIdAndUpdate(channelId, { $push: { videos: video._id } });
  res.json(video);
});

// Update video
router.put("/:id", protect, async (req, res) => {
  const updated = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete video
router.delete("/:id", protect, async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);
  res.json({ message: "Video deleted" });
});

export default router;
