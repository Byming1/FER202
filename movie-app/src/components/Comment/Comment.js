import React, { useState, useEffect } from "react";
import { instance as axios } from "../../axios/Axios";
import { useUser } from "../../context/UserContext";

const Comment = ({ movieId }) => {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comment theo movieId
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments?movieId=${movieId}`);
        setComments(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, [movieId]);

  const handleAddComment = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }
    if (!newComment.trim()) return;

    const commentData = {
      movieId: Number(movieId),
      userId: Number(user.userId),
      username: user.username,
      text: newComment,
      id: Math.random().toString(16).slice(2, 6)
    };

    try {
      await axios.post("/comments", commentData);
      setComments([...comments, commentData]);
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to add comment");
    }
  };

  return (
    <div className="mt-5">
      <h4>Comments</h4>

      {(!comments || comments.length === 0) && <p>No comments yet.</p>}

      {comments && comments.map((c) => (
        <div
          key={c.id}
          className="mb-3 p-3 rounded"
          style={{ backgroundColor: "#222", borderLeft: "4px solid #E50914" }}
        >
          <strong>{c.username}</strong>
          <p className="mb-0">{c.text}</p>
        </div>
      ))}

      <div className="mt-3 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddComment}>
          Post
        </button>
      </div>
    </div>
  );
};

export default Comment;
