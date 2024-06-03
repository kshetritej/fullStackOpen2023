import { useState } from "react";

const Blog = ({ blog }) => {
  const [like, setLikes] = useState(0);
  const [view, setView] = useState(false);
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
          <p>Likes: {like}</p> <button onClick={() => setLikes(like+1)}>like</button>
        </>
      )}
    </div>
  );
};

export default Blog;
