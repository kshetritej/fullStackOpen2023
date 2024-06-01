import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs  = async () => {
      const blogs = await blogService.getAll();
    setBlogs(blogs);
    };

    getBlogs();
  }, []);

  return (
    <div>

      <h2>blogs</h2>
      {console.log(blogs)}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
