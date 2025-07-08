import axios from "axios"
import { useUserStore } from "@/store/modules/user"

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 5000
})

request.interceptors.request.use((config) => {
    const userStore = useUserStore()
    const token = userStore.token
    if(token){
        config.headers.Authorization = token
    }
    return config
},(error) =>{
    return Promise.reject(error);
})

request.interceptors.response.use(
    response => response.data,
    error => {
        return Promise.reject(error)
    }
)

export default request
