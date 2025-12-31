import axios from "axios"
import { useUserStore } from "@/store/modules/user"
import type { UserLoginResponse, UserCheckResponse, LoginForm } from "@/types/admin/user"
import type { AxiosResponse } from "axios"
import { ElMessage } from "element-plus"

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
    let status = error.response?.status
    let message = ""
    const serverMessage = error.response?.data?.message;
    switch (status){
      case 401:
        message = "token過期"
        break;
      case 404:
        message = "請求地址錯誤"
        break;
      case 500:
        message = "伺服器異常"
        break;
      default:
        message = serverMessage||"網路異常"
    }
    ElMessage({
      type:"error",
      message
    })
    return Promise.reject(error)
  }
)

export const reqLogin = (data: LoginForm):Promise<AxiosResponse<UserLoginResponse>> => {
  return request.post("/v2/admin/signin", data)
}

export const reqUserCheck = ():Promise<AxiosResponse<UserCheckResponse>> => {
  return request.post("/v2/api/user/check")
}