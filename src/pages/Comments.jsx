import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function Comments() {
  const { id } = useParams();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Demo User",
      text: "Initial repository setup looks good!",
      date: "Today",
    },
    {
      id: 2,
      author: "Team Member",
      text: "We can add more features here.",
      date: "Yesterday",
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!comment.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now(),
        author: "Demo User",
        text: comment,
        date: "Just now",
      },
    ]);

    setComment("");
  };

  return (
    <DashboardLayout>
      <div className="comments-header">
        <div>
          <p className="eyebrow">REPOSITORY COMMENTS</p>
          <h1>Comments</h1>
          <p>Discuss and collaborate on this repository.</p>
        </div>

        <Link to={`/repositories/${id}`} className="secondary-button">
          ← Back to Repository
        </Link>
      </div>

      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Write a comment..."
          rows="4"
        />

        <button type="submit" className="primary-button">
          Post Comment
        </button>
      </form>

      <div className="comments-list">
        {comments.map((item) => (
          <div className="comment-card" key={item.id}>
            <div className="comment-avatar">{item.author.charAt(0)}</div>

            <div className="comment-content">
              <div className="comment-top">
                <strong>{item.author}</strong>
                <span>{item.date}</span>
              </div>

              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Comments;
