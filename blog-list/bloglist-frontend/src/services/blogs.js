import axios from "axios";
const baseUrl = "http://localhost:8080";

let token;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const create = async blogObject => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(`${baseUrl}/api/blogs/`, blogObject, config);
  return res.data;
};
const getAll = async () => {

  const request = await axios.get(`${baseUrl}/api/blogs`);
  return request.data;
};

const likeBlog = async ({ blogId, updatedLike, auth }) => {
  const secret = {
    headers: { Authorization: token },
  };
  const res = await axios.put(`${baseUrl}/api/blogs/${blogId}`, updatedLike, secret);
  return res.data;
};
const deleteBlog = async ({ blogId }) => {
  const secret = {
    headers: { Authorization: token }
  };
  const req = await axios.delete(`${baseUrl}/api/blogs/${blogId}`, secret);
  return req.data;
};


const login = async ({ username, password }) => {
  const req = await axios.post(`${baseUrl}/api/users/login`, { username, password });
  return req.data;
};

export default { getAll, login, setToken, create, likeBlog, deleteBlog };