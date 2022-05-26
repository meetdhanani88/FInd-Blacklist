import axios from 'axios'
const baseURL = 'http://localhost:7600/api'
const token = localStorage.getItem("token")



const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Authorization": token ? `Bearer ${localStorage.getItem("token")}` : ''
    }
})

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token")
    config.headers.Authorization = token ? `Bearer ${localStorage.getItem("token")}` : ''
    return config
})


export default axiosInstance;