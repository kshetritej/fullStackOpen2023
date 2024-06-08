import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [view, setView] = useState(false);
  const [like, setLike] = useState(blog.votes || 0);
  const user = JSON.parse(window.localStorage.getItem("user"));

  const handleLikes = async () => {
    const blogId = blog.id;
    const incrementLike = like + 1;
    setLike(incrementLike);
    try {
      blogService.setToken(user.token);
      const updatedLike = { votes: incrementLike };
      const likeUpdates = await blogService.likeBlog({
        blogId,
        updatedLike,
      });
      return likeUpdates;
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    const blogId = blog.id;
    try {
      blogService.setToken(user.token);
      const prompt = window.confirm(
        `Do you really want to delete ${blog.title}?`
      );
      if (prompt) {
        const deleteResponse = await blogService.deleteBlog({ blogId });
        console.warn(`${blog.title} deleted!`);
        return deleteResponse;
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div style={{ border: "1px solid white", padding: "2px" }} className="blog">
      <h3>{blog.title}</h3>
      <button onClick={() => setView(!view)}>
        {!view ? "view details" : "hide details"}
      </button>
      {view && (
        <>
          <p>
            Link :{" "}
            <a href={blog.url} style={{ color: "white" }}>
              {blog.url}
            </a>
          </p>
          <p>Likes: {like}</p> <p>Added by: {blog.author.name}</p>
          <button onClick={() => handleLikes()}>like</button>
          {user && (
            <button
              onClick={() => handleDelete()}
              style={{ background: "red" }}
            >
              delete
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
