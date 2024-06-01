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
    console.log('clicked')
    window.localStorage.clear();
    setUser(null)
  };

  const handleSubmit = async (event) => {
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

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
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
