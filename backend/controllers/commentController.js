import Comment from "../models/Comment.js";

export const listComments = async (req,res)=>{
  const { videoId } = req.query;
  const comments = await Comment.find({ video: videoId }).sort({ createdAt: -1 }).populate("user","username");
  res.json(comments);
};

export const addComment = async (req,res)=>{
  const { videoId, text } = req.body;
  const c = await Comment.create({ video: videoId, text, user: req.user.id });
  const populated = await c.populate("user","username");
  res.status(201).json(populated);
};

export const updateComment = async (req,res)=>{
  const { text } = req.body;
  const c = await Comment.findOneAndUpdate({ _id:req.params.id, user:req.user.id }, { text }, { new:true });
  if(!c) return res.status(404).json({message:"Not found"});
  res.json(c);
};

export const deleteComment = async (req,res)=>{
  const c = await Comment.findOneAndDelete({ _id:req.params.id, user:req.user.id });
  if(!c) return res.status(404).json({message:"Not found"});
  res.json({ok:true});
};
