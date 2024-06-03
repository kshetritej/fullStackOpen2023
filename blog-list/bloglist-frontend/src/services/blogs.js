import axios from 'axios'
const baseUrl = 'http://localhost:8080'

let token;

const setToken = newToken => {
  console.log('received new token')
  token = `Bearer ${newToken}`
  console.log('final token', token)
}
const create = async blogObject => {
  console.log('creating config...')
  const config = {
    headers: { Authorization: token },
  }
  console.log('set auth header ', token)
  console.log('posting data...')
  const res = await axios.post(`${baseUrl}/api/blogs/`, blogObject, config)
  return res.data
}
const getAll = async () => {

  const request = await axios.get(`${baseUrl}/api/blogs`)
  return request.data
}


const login = async ({ username, password }) => {
  try {
    const req = await axios.post(`${baseUrl}/api/users/login`, { username, password })
    return req.data;
  }
  catch (e) {
    throw e;
  }

}

export default { getAll, login, setToken, create }