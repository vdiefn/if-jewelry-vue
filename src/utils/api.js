import axios from "axios"
import { useUserStore } from "@/store/modules/user"


const api = axios.create({
    baseURL: '/v2/api/if_jewelry',
    timeout: 5000
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
