import axios from 'axios'
const baseUrl = 'http://localhost:8080'

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

export default { getAll, login }