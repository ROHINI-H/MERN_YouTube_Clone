import { useState } from "react";

function CommentBox({ c, mine, onEdit, onDelete, onReply }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(c.text);

  const saveEdit = () => {
    if (text.trim()) {
      onEdit(text);
      setEditing(false);
    }
  };

  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <img
        src={c.user?.avatar || "/default-avatar.png"}
        alt={c.user?.username}
        className="w-10 h-10 rounded-full"
      />

      {/* Content */}
      <div className="flex-1">
        {/* Username + Timestamp */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{c.user?.username}</span>
          <span className="text-xs text-gray-500">
            {new Date(c.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Comment Text */}
        {editing ? (
          <div className="flex gap-2 mt-1">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 border px-2 py-1 text-sm"
            />
            <button
              onClick={saveEdit}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setText(c.text);
              }}
              className="px-3 py-1 bg-gray-200 text-sm rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <p className="text-sm mt-1">{c.text}</p>
        )}

        {/* Actions */}
        <div className="flex gap-4 text-xs text-gray-500 mt-1">
          <button
            onClick={() => onReply(c._id)}
            className="hover:text-black"
          >
            Reply
          </button>
          {mine && !editing && (
            <>
              <button
                onClick={() => setEditing(true)}
                className="hover:text-black"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="hover:text-red-500"
              >
                Delete
              </button>
            </>
          )}
        </div>

        {/* Replies */}
        {c.replies?.length > 0 && (
          <div className="mt-3 pl-10 border-l">
            {c.replies.map((r) => (
              <CommentBox
                key={r._id}
                c={r}
                mine={mine && r.user?._id === c.user?._id}
                onEdit={() => {}}
                onDelete={() => {}}
                onReply={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentBox;