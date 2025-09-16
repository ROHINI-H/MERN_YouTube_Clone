import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <Link to={`/video/${video._id}`} className="block bg-white rounded shadow">
      <img src={video.thumbnailUrl} alt={video.title} className="rounded-t" />
      <div className="p-2">
        <h3 className="font-semibold">{video.title}</h3>
        <p className="text-sm text-gray-500">{video.views} views</p>
      </div>
    </Link>
  );
}
