import express from "express";
import Video from "../models/video.js";

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


export default router;
