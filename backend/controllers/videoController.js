import Video from "../models/video.js";

export const listVideos = async (req,res)=>{
  const { q, category } = req.query;
  const filter = {};
  if(q) filter.title = { $regex: q, $options: "i" };
  if(category) filter.category = category;
  const vids = await Video.find(filter).sort({ createdAt: -1 }).populate("channel","channelName");
  res.json(vids);
};

export const createVideo = async (req,res)=>{
  const { title, description, videoUrl, thumbnailUrl, channelId, category } = req.body;
  const vid = await Video.create({ title, description, videoUrl, thumbnailUrl, channel: channelId, category });
  res.status(201).json(vid);
};

export const getVideo = async (req,res)=>{
  const v = await Video.findById(req.params.id).populate("channel","channelName");
  if(!v) return res.status(404).json({message:"Not found"});
  res.json(v);
};

export const updateVideo = async (req,res)=>{
  const v = await Video.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(v);
};

export const deleteVideo = async (req,res)=>{
  await Video.findByIdAndDelete(req.params.id);
  res.json({ok:true});
};

export const toggleLike = async (req,res)=>{
  const userId = req.user.id;
  const v = await Video.findById(req.params.id);
  if(!v) return res.status(404).json({message:"Not found"});
  v.dislikes = v.dislikes.filter(id=>String(id)!==userId);
  if(v.likes.some(id=>String(id)===userId)) v.likes = v.likes.filter(id=>String(id)!==userId);
  else v.likes.push(userId);
  await v.save();
  res.json({ likes: v.likes.length, dislikes: v.dislikes.length });
};

export const toggleDislike = async (req,res)=>{
  const userId = req.user.id;
  const v = await Video.findById(req.params.id);
  if(!v) return res.status(404).json({message:"Not found"});
  v.likes = v.likes.filter(id=>String(id)!==userId);
  if(v.dislikes.some(id=>String(id)===userId)) v.dislikes = v.dislikes.filter(id=>String(id)!==userId);
  else v.dislikes.push(userId);
  await v.save();
  res.json({ likes: v.likes.length, dislikes: v.dislikes.length });
};
