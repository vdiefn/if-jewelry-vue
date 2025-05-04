import request from "@/utils/request"

export const reqLogin = (data) => {
  return request.post("/admin/signin", data)
}

export const reqUserCheck = () => {
  return request.post("/api/user/check")
}