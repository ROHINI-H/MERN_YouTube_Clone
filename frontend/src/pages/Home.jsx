import { useEffect, useState } from "react";
import API from "../utils/api";
import VideoCard from "../components/VideoCard";
import Sidebar from "../components/Sidebar";

function Home({ searchQuery }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    API.get("/videos").then((res) => setVideos(res.data));
  }, []);

  const filtered = searchQuery
    ? videos.filter((v) =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : videos;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </main>
    </div>
  );
}

export default Home;