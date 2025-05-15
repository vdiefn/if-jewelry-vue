import axios from "axios"
import { useUserStore } from "@/store/modules/user"


const api = axios.create({
  baseURL: '/v2/api/if_jewelry', 
  timeout: 5000
})

api.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if(userStore.token){
    config.headers.Authorization = userStore.token
  }
  return config
})

api.interceptors.response.use(
  response => response.data, 
  error => {
    return Promise.reject(error) 
  }
)

export default api
