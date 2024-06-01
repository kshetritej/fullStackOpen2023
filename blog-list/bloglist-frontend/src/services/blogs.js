import axios from 'axios'
const baseUrl = 'http://localhost:8080'

let token = null;

const setToken = newToken => token = `Bearer ${newToken}`
const create = async blogObject => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(`${baseUrl}/api/blogs`, blogObject, config)
  return res.data
}
const getAll = async () => {

  const request = await axios.get(`${baseUrl}/api/blogs`)
  return request.data
}


const login = async ({ username, password }) => {
  try {

    console.log('trying to login')
    const req = await axios.post(`${baseUrl}/api/users/login`, { username, password })
    return req.data;
  }
  catch (e) {
    throw e;
  }

}

export default { getAll, login, setToken, create }