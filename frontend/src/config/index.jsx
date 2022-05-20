import axios from 'axios'
const baseURL = 'http://localhost:7600/api'


const axiosInstance = axios.create({
    baseURL: baseURL
})
export default axiosInstance