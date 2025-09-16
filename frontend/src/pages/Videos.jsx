import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import API from "../utils/api";
import { AuthContext } from "../Context/AuthContext";

function Videos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [video, setVideo] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [comment, setComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch video
  useEffect(() => {
    API.get(`/videos/${id}`).then((res) => setVideo(res.data));
  }, [id]);

  // Fetch suggested videos
  useEffect(() => {
    API.get("/videos").then((res) => setSuggested(res.data));
  }, []);

  // Add comment
  const addComment = async (e) => {
    e.preventDefault();
    if (!comment) return;
    const res = await API.post(`/comments/${id}`, { text: comment });
    setVideo({ ...video, comments: [...video.comments, res.data] });
    setComment("");
  };

  // Edit comment
  const updateComment = async (commentId) => {
    try {
      const res = await API.put(`/comments/${commentId}`, { text: editText });
      setVideo({
        ...video,
        comments: video.comments.map((c) => (c._id === commentId ? res.data : c)),
      });
      setEditingComment(null);
      setEditText("");
    } catch {
      alert("❌ Failed to update comment");
    }
  };

  // Delete comment
  const deleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);
      setVideo({
        ...video,
        comments: video.comments.filter((c) => c._id !== commentId),
      });
    } catch {
      alert("❌ Failed to delete comment");
    }
  };

  if (!video) return <p className="p-4">Loading...</p>;

  // Check if YouTube or direct file
  const isYouTubeUrl =
    video.videoUrl.includes("youtube.com") || video.videoUrl.includes("youtu.be");

  let embedUrl = "";
  if (isYouTubeUrl) {
    const videoId = video.videoUrl.includes("youtube.com")
      ? new URL(video.videoUrl).searchParams.get("v")
      : video.videoUrl.split("/").pop();
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 gap-6">
      {/* Main video section */}
      <div className="flex-1">
        {/* Video Player */}
        {isYouTubeUrl ? (
          <iframe
            src={embedUrl}
            title={video.title}
            className="w-full aspect-video rounded-lg"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <video
            src={video.videoUrl}
            controls
            className="w-full aspect-video rounded-lg bg-black"
          />
        )}

        {/* Title */}
        <h1 className="text-2xl font-bold mt-4">{video.title}</h1>

        {/* Channel Info */}
        <div className="flex justify-between items-center mt-3 border-b pb-3">
          <div className="flex items-center gap-3">
            <img
              src={
                video.channelId?.avatar ||
                "https://cdn.pixabay.com/photo/2017/08/26/21/40/people-2684421_1280.jpg"
              }
              alt="channel avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-semibold">
                {video.channelId?.channelName || "Unknown Channel"}
              </h2>
              <p className="text-gray-500 text-sm">
                {video.channelId?.subscribers || 0} subscribers
              </p>
            </div>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-full font-medium">
            Subscribe
          </button>
        </div>

        {/* Like / Dislike / Share */}
        <div className="flex gap-3 mt-3">
          <button className="bg-gray-200 px-4 py-2 rounded-full">
            👍 {video.likes || 0}
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full">
            👎 {video.dislikes || 0}
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full">🔗 Share</button>
        </div>

        {/* Description */}
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <p>{video.description || "No description available."}</p>
        </div>

        {/* Comments */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-3">
            {video.comments?.length || 0} Comments
          </h3>

          {user && (
            <form onSubmit={addComment} className="flex gap-3 items-start mb-4">
              <img
                src={
                  user.avatar ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="your avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="border-b w-full p-2 outline-none"
                />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Comment
              </button>
            </form>
          )}

          <ul className="space-y-4">
            {video.comments?.map((c) => (
              <li key={c._id} className="flex gap-3">
                <img
                  src={
                    c.userId?.avatar ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="user avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-semibold">{c.userId?.username || "User"}</p>
                  {editingComment === c._id ? (
                    <div className="flex gap-2 mt-1">
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="border p-1 flex-1"
                      />
                      <button
                        onClick={() => updateComment(c._id)}
                        className="bg-green-500 text-white px-2 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingComment(null)}
                        className="bg-gray-400 text-white px-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p>{c.text}</p>
                  )}
                  {user && user._id === c.userId?._id && editingComment !== c._id && (
                    <div className="flex gap-2 mt-1 text-sm">
                      <button
                        onClick={() => {
                          setEditingComment(c._id);
                          setEditText(c.text);
                        }}
                        className="text-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteComment(c._id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggested videos */}
      <div className="w-full lg:w-1/3">
        <h3 className="font-semibold mb-3">Up Next</h3>
        <div className="space-y-3">
          {suggested
            .filter((v) => v._id !== video._id) // exclude current video
            .slice(0, 6)
            .map((v) => (
              <div
                key={v._id}
                className="flex gap-3 cursor-pointer"
                onClick={() => navigate(`/video/${v._id}`)}
              >
                <img
                  src={
                    v.thumbnailUrl ||
                    `https://picsum.photos/320/180?random=${Math.floor(
                      Math.random() * 1000
                    )}`
                  }
                  alt={v.title}
                  className="w-40 h-24 rounded object-cover"
                />
                <div>
                  <p className="font-semibold line-clamp-2">{v.title}</p>
                  <p className="text-gray-500 text-sm">{v.channelId?.channelName}</p>
                  <p className="text-gray-500 text-sm">123K views</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}


export default Videos;