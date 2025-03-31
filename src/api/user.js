import request from "@/utils/request"

export const reqLogin = async (data) => {
  return await request.post("/admin/signin", data)
}