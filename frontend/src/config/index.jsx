import axios from 'axios'
const baseURL = 'http://localhost:7600/api'
const token = localStorage.getItem("token")


const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Authorization": token ? `Bearer ${token}` : ''
    }
})
export default axiosInstance