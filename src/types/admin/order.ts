import type { Pagination } from "./product"

export type ProductData = Record<string, ProductDataItem>

export interface ProductDataItem {
    id: string,
    produce_id: string,
    qty: number
}

export interface UserData {
    address: string,
    email: string,
    name: string,
    tel: string
}

export interface OrderData {
    create_at: number,
    id: string,
    is_paid: boolean,
    message: string,
    products: ProductData
    user: UserData,
    num: number
}

export interface GetOrderResponse {
    success: boolean
    orders: OrderData
    pagination: Pagination,
    message: string[]
}

export interface EditOrderParams {
    create_at: number,
    id: string,
    is_paid: boolean,
    message: string,
    products: ProductData,
    user: UserData,
    num: number,
    paid_date: number | null
}

export interface OrderResponse {
    success: boolean,
    message: string
}