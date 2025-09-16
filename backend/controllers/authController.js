import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req,res)=>{
  const { username, email, password } = req.body;
  if(!username || !email || !password) return res.status(400).json({message:"All fields required"});
  const exists = await User.findOne({ $or: [{email},{username}] });
  if(exists) return res.status(409).json({message:"User exists"});
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hash });
  return res.status(201).json({ id:user._id, username:user.username, email:user.email });
};

export const login = async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(401).json({message:"Invalid credentials"});
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(401).json({message:"Invalid credentials"});
  const token = signToken(user);
  res.json({ token, user: { id:user._id, username:user.username, email:user.email, avatar:user.avatar }});
};
