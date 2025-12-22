import api from "@/utils/api.js";
import type { CartParams, CreateCartResponse, GetCartResponse, EditCartResponse, DeleteCartResponse } from "@/types/front/cart";
import type { AxiosResponse } from "axios"

export const reqAddCart = (data:CartParams):Promise<AxiosResponse<CreateCartResponse>> => {
  return api.post("/cart", {data})
}

export const reqGetCart = ():Promise<AxiosResponse<GetCartResponse>> => {
  return api.get("/cart")
}

export const reqEditCart = (id:string, payload:CartParams):Promise<AxiosResponse<EditCartResponse>> => {
  return api.put(`/cart/${id}`, payload)
}

export const reqDeleteCart = (id:string):Promise<AxiosResponse<DeleteCartResponse>> => {
  return api.delete(`/cart/${id}`)
}

