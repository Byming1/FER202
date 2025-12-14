import React, { useState, useEffect } from "react";
import { instance as axios } from "../../axios/Axios";
import { useUser } from "../../context/UserContext";

const Comment = ({ movieId }) => {
  const { user } = useUser();
  const [movieComments, setMovieComments] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resComments, resUsers] = await Promise.all([
          axios.get(`/comments?movieId=${movieId}`),
          axios.get("/users")
        ]);
        setUsers(resUsers.data || []);
        setMovieComments(
          resComments.data[0] || { movieId, comments: [], id: null }
        );
      } catch (err) {
        console.error(err);
        setUsers([]);
        setMovieComments({ movieId, comments: [], id: null });
      }
    };
    fetchData();
  }, [movieId]);

  const handleAddComment = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }
    if (!newComment.trim()) return;

    const commentData = {
      commentId: Math.random().toString(16).slice(2, 6),
      description: newComment,
      userId: user.userId
    };

    try {
      let updated;

      if (!movieComments.id) {
        updated = {
          id: Math.random().toString(16).slice(2, 6),
          movieId: Number(movieId),
          comments: [commentData]
        };
        await axios.post("/comments", updated);
      } else {
        updated = {
          ...movieComments,
          comments: [...movieComments.comments, commentData]
        };
        await axios.put(`/comments/${movieComments.id}`, updated);
      }

      setMovieComments(updated);
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to add comment");
    }
  };

  if (!movieComments) return <p className="text-white">Loading comments...</p>;

  const getUsername = (userId) => {
    const found = users.find((u) => u.userId === userId);
    return found ? found.username : `User ${userId}`;
  };

  return (
    <div className="container py-4" style={{ zIndex: 5 }}>
      <h4 className="fw-bold mb-3">Comments</h4>

      {(!movieComments.comments || movieComments.comments.length === 0) && (
        <p className="text-secondary">No comments yet.</p>
      )}

      {movieComments.comments &&
        movieComments.comments.map((c) => (
          <div
            key={c.commentId}
            className="mb-3 p-3 rounded"
            style={{
              backgroundColor: "#1c1c1c",
              borderLeft: "4px solid #E50914",
              color: "#fff",
            }}
          >
            <strong className="d-block mb-1">{getUsername(c.userId)}</strong>
            <p className="mb-0">{c.description}</p>
          </div>
        ))}

      <div className="mt-3 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{
            backgroundColor: "#141414",
            border: "1px solid #333",
            color: "#fff",
            borderRadius: "8px",
          }}
        />
        <button
          className="btn"
          onClick={handleAddComment}
          style={{
            backgroundColor: "#E50914",
            color: "#fff",
            borderRadius: "8px",
            minWidth: "80px",
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Comment;
