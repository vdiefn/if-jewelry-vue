import request from "@/utils/request"

export const reqLogin = (data) => {
  request.post("/admin/signin", data)
}