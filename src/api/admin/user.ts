import axios from "axios"
import { useUserStore } from "@/store/modules/user"
import type { UserLoginResponse, UserCheckResponse, LoginForm } from "@/types/admin/user"
import type { AxiosResponse } from "axios"

const baseURL = `${import.meta.env.VITE_BASE_URL}`

const request = axios.create({
  baseURL,
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
  response => response,
  error => {
      return Promise.reject(error)
  }
)

export const reqLogin = (data: LoginForm):Promise<AxiosResponse<UserLoginResponse>> => {
  return request.post("/v2/admin/signin", data)
}

export const reqUserCheck = ():Promise<AxiosResponse<UserCheckResponse>> => {
  return request.post("/v2/api/user/check")
}