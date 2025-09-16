import express from "express";
import Comment from "../models/Comment.js";
import Video from "../models/video.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Add comment
router.post("/:videoId", protect, async (req, res) => {
  const { text } = req.body;
  const comment = await Comment.create({
    userId: req.user,
    videoId: req.params.videoId,
    text
  });

  await Video.findByIdAndUpdate(req.params.videoId, { $push: { comments: comment._id } });
  res.json(comment);
});

export default router;
