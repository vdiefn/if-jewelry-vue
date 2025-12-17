import axios from "axios"
import { useUserStore } from "@/store/modules/user"

const BASE_URL =`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}`;

const api = axios.create({
    baseURL: BASE_URL,
  })

api.interceptors.request.use((config) => {
    const userStore = useUserStore()
    const token = userStore.token
    if(token){
        config.headers.Authorization = token
    }
    return config
},(error) =>{
    return Promise.reject(error);
})

api.interceptors.response.use(
    response => response.data,
    error => {
        return Promise.reject(error)
    }
)

export default api
