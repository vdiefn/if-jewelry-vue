import axios from "axios"
import { useUserStore } from "@/store/modules/user"

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 5000
})

request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if(userStore.token){
    config.headers.Authorization = userStore.token
  }
  return config
})

request.interceptors.response.use(
  response => response.data, 
  error => {
    return Promise.reject(error) 
  }
)

export default request
