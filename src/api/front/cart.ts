import api from "@/utils/api.ts";
import type { CartParams, CreateCartResponse, GetCartResponse, EditCartResponse, DeleteCartResponse, CartData } from "@/types/front/cart";
import type { AxiosResponse } from "axios"

export const reqAddCart = (data:CartParams):Promise<AxiosResponse<CreateCartResponse>> => {
  return api.post("/cart", { data })
}

export const reqGetCart = ():Promise<AxiosResponse<GetCartResponse>> => {
  return api.get("/cart")
}

export const reqEditCart = (data:CartData):Promise<AxiosResponse<EditCartResponse>> => {
  const payload:CartParams = {
    product_id: data.product_id,
    qty: data.qty
  }
  const id = data.id
  return api.put(`/cart/${id}`, { data: payload})
}

export const reqDeleteCart = (id:string):Promise<AxiosResponse<DeleteCartResponse>> => {
  return api.delete(`/cart/${id}`)
}

