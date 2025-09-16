import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <Link to={`/video/${video._id}`} className="block bg-white rounded shadow aspect-video ">
      <img src={video.thumbnailUrl || "https://cdn.pixabay.com/photo/2017/09/03/00/19/flowers-2708995_1280.png"} alt={video.title} className="rounded-t w-full h-full object-cover" />
      <div className="p-2">
        <h3 className="font-semibold">{video.title}</h3>
        <p className="text-sm text-gray-500">{video.views} views</p>
      </div>
    </Link>
  );
}
