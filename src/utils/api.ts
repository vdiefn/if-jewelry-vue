import axios from "axios"
import { useUserStore } from "@/store/modules/user"

const baseURL =
    import.meta.env.MODE === 'development'
        ? '/v2/api/if_jewelry'
        : `${import.meta.env.VITE_APP_API_URL}v2/api/${import.meta.env.VITE_APP_API_PATH}`;

const api = axios.create({
    baseURL,
    timeout: 5000
})

// const api = axios.create({
//     baseURL: '/v2/api/if_jewelry',
//     timeout: 5000
// })

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
