import axios from 'axios'

axios.defaults.withCredentials = true

const BASE_URL = 'http://192.168.0.110:5000/api'

class GitLubService {
  static async registerUser (user) {
    console.log(user)
    return await axios.post(`${BASE_URL}/auth/signup`, user)
  }

  static async verifyUser (user) {
    return await axios.post(`${BASE_URL}/auth/signin`, user)
  }
}

export default GitLubService
