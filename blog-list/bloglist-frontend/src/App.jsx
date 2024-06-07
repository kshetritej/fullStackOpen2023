import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogData, setBlogData] = useState({
    title: "",
    url: "",
  });
  const [error, setError] = useState();

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      const sortedBlogs = blogs.sort((a, b) => b.votes - a.votes);
      setBlogs(sortedBlogs);
    };
    getBlogs();
  }, [blogs]);

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    try {
      blogService.setToken(user.token);
      const res = await blogService.create(blogData);
      setBlogs([...blogs, blogData]);
      setBlogData({ title: "", url: "" });
      setOpen(!open);
    } catch (e) {
      console.log("error:", e);
      setError("error while adding blogs");
    }
  };

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
  }, []);

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await blogService.login({ username, password });
      setUser(res);
      window.localStorage.setItem("user", JSON.stringify(res));
    } catch (e) {
      setError("Invalid Credentials");
      setTimeout(() => {
        setError(null);
      }, [3000]);
    }
  };

  const addBlogForm = () => (
    <BlogForm
      open={open}
      setOpen={setOpen}
      blogData={blogData}
      setBlogData={setBlogData}
      handleBlogSubmit={handleBlogSubmit}
    />
  );

  const loginForm = () => (
    <Login
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );

  return (
    <div>
      <h2>Blog List</h2>
      <p>Articles and blogs to read!</p>
      <Notification message={error} />
      {!user ? loginForm() : `username: ${user.name}'s blog lists`}
      {user && <button onClick={() => logout()}>logout</button>}
      <div>
        {user && open
          ? addBlogForm()
          : user && (
            <button onClick={() => setOpen(!open)}>add new blog</button>
          )}
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
