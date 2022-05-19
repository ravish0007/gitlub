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

  static async getRepos () {
    return await axios.get(`${BASE_URL}/repo/list`)
  }

  static async newRepo (repository) {
    return await axios.post(`${BASE_URL}/repo/new`, { repository })
  }

  static async fetchTree (repository, path = '') {
    return await axios.get(`${BASE_URL}/repo/tree/${repository}/${path}`)
  }

  static async getUser () {
    return await axios.get(`${BASE_URL}/auth/user`)
  }
}

export default GitLubService
