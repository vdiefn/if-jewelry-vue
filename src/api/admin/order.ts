import api from "@/utils/api"
import type { GetOrderResponse, EditOrderParams, OrderResponse } from "@/types/admin/order"
import type { Axios, AxiosResponse } from "axios"

export const reqOrders = (params: { page:number }):Promise<AxiosResponse<GetOrderResponse>> => {
    return api.get(`/admin/orders`, { params })
}

export const reqEditOrder = (params: EditOrderParams):Promise<AxiosResponse<OrderResponse>> => {
    const { data } = params
    return api.put(`/admin/order/${data.products.id}`, { data })
}

export const reqDeleteOrder = (id:string):Promise<AxiosResponse<OrderResponse>> => {
    return api.delete(`/admin/order/${id}`)
}