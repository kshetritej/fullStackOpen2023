import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [view, setView] = useState(false);
  const [like, setLike] = useState(blog.votes);

  const handleLikes = async () => {
    const blogId = blog.id;
    const incrementLike = like + 1;
    setLike(incrementLike);
    try {
      const auth = JSON.parse(window.localStorage.getItem("user")).token;
      const updatedLike = { votes: incrementLike };
      const likeUpdates = await blogService.likeBlog({
        blogId,
        updatedLike,
        auth,
      });
      return likeUpdates;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div style={{ border: "1px solid white", padding: "2px" }}>
      <h3>{blog.title}</h3>
      <button onClick={() => setView(!view)}>
        {!view ? "view details" : "hide details"}
      </button>
      {view && (
        <>
          <p>
            Link : <a href={blog.url}>{blog.url}</a>
          </p>
          <p>Likes: {like}</p>{" "}
          <button onClick={() => handleLikes()}>like</button>
        </>
      )}
    </div>
  );
};

export default Blog;
