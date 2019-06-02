import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost/studFreemium/'
})

// axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('access_token')

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
