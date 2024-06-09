import PropTypes from "prop-types";
const Login = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login to continue</h2>
        <label htmlFor="username">Username</label>
        <br />
        <input
          data-testid="username"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="pwd">Password</label>
        <br />
        <input
          data-testid="password"
          type="text"
          id="pwd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default Login;
