import request from "@/utils/request"
import type { UserLoginResponse, MessageResponse } from "@/types/admin/user"
import type { AxiosResponse } from "axios"

export const reqLogin = (data: { username: string, password: string}):Promise<AxiosResponse<UserLoginResponse>> => {
  return request.post("/admin/signin", data)
}

export const reqUserCheck = ():Promise<AxiosResponse<MessageResponse>> => {
  return request.post("/api/user/check")
}