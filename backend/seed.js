import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import User from "./models/User.js";
import Channel from "./models/Channel.js";
import Video from "./models/video.js";
import Comment from "./models/Comment.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Create users
    const password = await bcrypt.hash("p@ssword123", 10);
    const users = await User.insertMany([
      { username: "Rohini", email: "rohini@example.com", password },
      { username: "Priya", email: "priya@example.com", password },
      { username: "Shamya", email: "shamya@example.com", password },
    ]);

    console.log("👤 Users created");

    // Create channels
    const channels = await Channel.insertMany([
      {
        channelName: "Rohini Tech",
        owner: users[0]._id,
        description: "Tech tutorials and coding",
      },
      {
        channelName: "Priya Vlogs",
        owner: users[1]._id,
        description: "Daily vlogs and lifestyle content",
      },
      {
        channelName: "Shamya Reviews",
        owner: users[2]._id,
        description: "Product reviews and unboxings",
      },
    ]);

    console.log("📺 Channels created");

    // Create 6 videos
    const videos = await Video.insertMany([
      {
        title: "Learn React in 10 Minutes",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnailUrl: "https://cdn.pixabay.com/photo/2020/05/30/10/01/tutorials-5238355_1280.jpg",
        description: "Quick guide to React basics",
        category: "Education",
        channelId: channels[0]._id,
        uploader: users[0]._id,
        views: 120,
        likes: 10,
      },
      {
        title: "Node.js Crash Course",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnailUrl: "https://cdn.pixabay.com/photo/2015/06/24/15/45/code-820275_1280.jpg",
        description: "Intro to Node.js and Express",
        category: "Education",
        channelId: channels[0]._id,
        uploader: users[0]._id,
        views: 95,
        likes: 7,
      },
      {
        title: "My Morning Routine",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnailUrl: "https://cdn.pixabay.com/photo/2023/04/24/15/22/straw-transport-7948338_1280.jpg",
        description: "A day in my life vlog",
        category: "Lifestyle",
        channelId: channels[1]._id,
        uploader: users[1]._id,
        views: 80,
        likes: 5,
      },
      {
        title: "Traveling to Japan",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnailUrl: "https://cdn.pixabay.com/photo/2025/01/20/20/11/shrine-9348003_1280.jpg",
        description: "My trip to Tokyo and Kyoto",
        category: "Travel",
        channelId: channels[1]._id,
        uploader: users[1]._id,
        views: 200,
        likes: 15,
      },
      {
        title: "iPhone 15 Review",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnailUrl: "https://cdn.pixabay.com/photo/2024/02/24/19/00/phone-8594571_1280.jpg",
        description: "Hands-on review of the new iPhone",
        category: "Technology",
        channelId: channels[2]._id,
        uploader: users[2]._id,
        views: 500,
        likes: 50,
      },
      {
        title: "Best Budget Laptops 2025",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnailUrl: "https://cdn.pixabay.com/photo/2016/11/21/15/46/computer-1846056_1280.jpg",
        description: "Top affordable laptops for students",
        category: "Technology",
        channelId: channels[2]._id,
        uploader: users[2]._id,
        views: 340,
        likes: 28,
      },
    ]);

    console.log("🎥 Videos created");

    // Link videos to channels
    await Channel.findByIdAndUpdate(channels[0]._id, { $push: { videos: [videos[0]._id, videos[1]._id] } });
    await Channel.findByIdAndUpdate(channels[1]._id, { $push: { videos: [videos[2]._id, videos[3]._id] } });
    await Channel.findByIdAndUpdate(channels[2]._id, { $push: { videos: [videos[4]._id, videos[5]._id] } });

    // Create comments
    await Comment.insertMany([
      {
        userId: users[2]._id,
        videoId: videos[0]._id,
        text: "This was super helpful, thanks!",
      },
      {
        userId: users[1]._id,
        videoId: videos[0]._id,
        text: "Great tutorial 👍",
      },
      {
        userId: users[0]._id,
        videoId: videos[2]._id,
        text: "Nice vlog!",
      },
      {
        userId: users[1]._id,
        videoId: videos[4]._id,
        text: "Wow, love this review!",
      },
    ]);

    console.log("💬 Comments created");

    console.log("✅ Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
    process.exit(1);
  }
};

seedData();
