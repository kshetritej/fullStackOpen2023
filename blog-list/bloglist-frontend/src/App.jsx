import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();


  const handleBlogSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await blogService.add(blogObject, user.token);
      setBlogs(...blogs, blogObject);
    } catch (e) {
      setError("error adding blog");
    }
  };
  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };

    getBlogs();
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
  }, []);

  const logout = () => {
    console.log("clicked");
    window.localStorage.clear();
    setUser(null);
  };

  const handleLogin= async (event) => {
    event.preventDefault();
    try {
      const res = await blogService.login({ username, password });
      setUser(res);
      window.localStorage.setItem("user", JSON.stringify(res));
      blogService.setToken(user.token);
    } catch (e) {
      setError("Invalid Credentials");
      setTimeout(() => {
        setError(null);
      }, [3000]);
    }
  };

  const addBlogForm = () => (
    <form onSubmit={handleBlogSubmit}>
      <h2>Add new blog list</h2>
      <label htmlFor="title">Blog Title</label>
      <input type="text" id="title" name="title" />

      <label htmlFor="url">url</label>
      <input type="text" id="url" name="url" />

      <button type="submit">add</button>
    </form>
  );

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login to continue</h2>
      <label htmlFor="username">Username</label>
      <br />
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label htmlFor="pwd">Password</label>
      <br />
      <input
        type="text"
        id="pwd"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Login</button>
    </form>
  );
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={error} />
      {!user ? loginForm() : `${user.name}'s blog lists`}
      {user && <button onClick={() => logout()}>logout</button>}

      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
