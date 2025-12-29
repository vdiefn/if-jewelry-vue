import api from "@/utils/api.ts";
import type { CartParams, CreateCartResponse, GetCartResponse, EditCartResponse, DeleteCartResponse } from "@/types/front/cart";
import type { AxiosResponse } from "axios"

export const reqAddCart = (data:CartParams):Promise<AxiosResponse<CreateCartResponse>> => {
  return api.post("/cart", { data })
}

export const reqGetCart = ():Promise<AxiosResponse<GetCartResponse>> => {
  return api.get("/cart")
}

export const reqEditCart = (payload:CartParams):Promise<AxiosResponse<EditCartResponse>> => {
  const { product_id } = payload
  return api.put(`/cart/${product_id}`, payload)
}

export const reqDeleteCart = (id:string):Promise<AxiosResponse<DeleteCartResponse>> => {
  return api.delete(`/cart/${id}`)
}

