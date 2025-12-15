import api from "@/utils/api.js";
import type { AxiosResponse } from "axios"
import type { CreateOrderParams, CreateOrderResponse, GetOrderResponse } from "@/types/front/order";

export const reqAddOrder = (payload:CreateOrderParams):Promise<AxiosResponse<CreateOrderResponse>> => {
    return api.post("/order", payload)
}

export const reqGetOrder = (id:string):Promise<AxiosResponse<GetOrderResponse>> => {
    return api.get(`/order/${id}`)
}