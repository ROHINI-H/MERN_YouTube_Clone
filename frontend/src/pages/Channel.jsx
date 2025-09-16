import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import API from "../utils/api";
import VideoCard from "../components/VideoCard";
import Sidebar from "../components/Sidebar";

function Channel() {
  const { user } = useContext(AuthContext);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Inline edit states
  const [editingVideo, setEditingVideo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null);

  // Detect click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setEditingVideo(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch channel
  useEffect(() => {
    if (user) {
      API.get(`/channels/${user._id}`)
        .then((res) => setChannel(res.data))
        .catch(() => setChannel(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  // Create channel
  const createChannel = async () => {
    try {
      const res = await API.post("/channels", {
        channelName: `${user.username}'s Channel`,
      });
      setChannel(res.data);
      setMessage("✅ Channel created successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Channel creation failed");
    }
  };

  // Upload video via URL
  const uploadVideo = async (e) => {
    e.preventDefault();
    if (!videoTitle || !videoUrl) {
      setMessage("❌ Please provide both title and video URL");
      return;
    }

    try {
      const res = await API.post("/videos", {
        title: videoTitle,
        videoUrl,
        channelId: channel._id,
      });
      setChannel({ ...channel, videos: [...channel.videos, res.data] });
      setMessage("✅ Video uploaded successfully!");
      setVideoTitle("");
      setVideoUrl("");
      setShowVideoModal(false);
    } catch {
      setMessage("❌ Video upload failed");
    }
  };

  // Save edit
  const saveEdit = async () => {
    try {
      const res = await API.put(`/videos/${editingVideo}`, { title: editTitle });
      setChannel({
        ...channel,
        videos: channel.videos.map((v) =>
          v._id === editingVideo ? res.data : v
        ),
      });
      setMessage("✅ Video updated!");
      setEditingVideo(null);
    } catch {
      setMessage("❌ Update failed");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!user) return <p className="p-4">Please login to access your channel.</p>;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="flex-1 relative">
        {message && <p className="text-green-600 p-2">{message}</p>}

        {/* Create channel */}
        {!channel && (
          <div className="p-4">
            <button
              onClick={createChannel}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Channel
            </button>
          </div>
        )}

        {channel && (
          <>
            {/* Banner */}
            <div className="relative w-full h-56 md:h-64 bg-gray-300">
              <img
                src="https://cdn.pixabay.com/photo/2017/06/05/10/15/landscape-2373648_1280.jpg"
                alt="Banner"
                className="w-full h-full object-cover"
              />

              {/* Avatar */}
              <div className="absolute -bottom-12 left-8 w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                <img
                  src="https://cdn.pixabay.com/photo/2017/08/26/21/40/people-2684421_1280.jpg"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Channel info */}
            <div className="mt-16 px-8 flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h1 className="text-2xl font-bold">{channel.channelName}</h1>
                <p className="text-gray-500">
                  {channel.subscribers || 0} subscribers
                </p>
              </div>

              {/* Upload Video Button */}
              <button
                onClick={() => setShowVideoModal(true)}
                className="bg-red-600 text-white px-4 py-2 rounded mt-2 md:mt-0"
              >
                Upload Video
              </button>
            </div>

            {/* Video Modal */}
            {showVideoModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <form
                  onSubmit={uploadVideo}
                  className="bg-white p-6 rounded shadow w-96 flex flex-col gap-3"
                >
                  <h2 className="text-xl font-bold">Upload Video</h2>
                  <input
                    type="text"
                    placeholder="Video Title"
                    className="border p-2"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Video URL"
                    className="border p-2"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setShowVideoModal(false)}
                      className="px-3 py-1 border rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Videos */}
            <div className="mt-8 px-8">
              <h2 className="text-xl font-semibold mb-4">Videos</h2>
              {channel.videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {channel.videos.map((video, index) => {
                    const dummyThumbnails = [
                      "https://picsum.photos/320/180?random=1",
                      "https://picsum.photos/320/180?random=2",
                      "https://picsum.photos/320/180?random=3",
                      "https://picsum.photos/320/180?random=4",
                      "https://picsum.photos/320/180?random=5",
                    ];
                    const thumbnailUrl =
                      video.thumbnailUrl ||
                      dummyThumbnails[index % dummyThumbnails.length];

                    return (
                      <div key={video._id} className="relative group">
                        <VideoCard video={{ ...video, thumbnailUrl }} />

                        {/* Edit/Delete buttons on hover */}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              const rect =
                                e.currentTarget.getBoundingClientRect();
                              setPopupPosition({
                                top: rect.bottom + window.scrollY + 5,
                                left: rect.left + window.scrollX,
                              });
                              setEditTitle(video.title);
                              setEditingVideo(video._id);
                            }}
                            className="bg-yellow-400 px-2 py-1 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={async () => {
                              try {
                                await API.delete(`/videos/${video._id}`);
                                setChannel({
                                  ...channel,
                                  videos: channel.videos.filter(
                                    (v) => v._id !== video._id
                                  ),
                                });
                                setMessage("✅ Video deleted!");
                              } catch {
                                setMessage("❌ Delete failed");
                              }
                            }}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No videos uploaded yet.</p>
              )}
            </div>

            {/* Inline Edit Popup */}
            {editingVideo && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-30">
                <div
                  ref={popupRef}
                  className="bg-white shadow-lg rounded p-4 w-80"
                >
                  <h3 className="font-semibold mb-2">Edit Video</h3>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border p-2 w-full mb-2 rounded"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingVideo(null)}
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEdit}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

          </>
        )}
      </div>
    </div>
  );
}

export default Channel;