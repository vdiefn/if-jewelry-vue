import type { CouponData } from "./cart"

export interface UserData {
    name: string,
    email: string,
    tel: string,
    address: string
}

export interface CreateOrderParams {
    data: {
        user: UserData,
        message: string
    }
}

export interface CreateOrderResponse {
    success: boolean,
    message: string,
    total: number,
    create_at: number,
    orderId: string
}

export type OrderProduct = Record<string, OrderProductItem>

export interface CouponProductData extends CouponData {
    num: number
}

export interface ProductData {
    category: string,
    content:string,
    description: string,
    id: string,
    imageUrl: string,
    is_enabled: number,
    num: number,
    origin_price: number,
    price: number,
    title: string,
    unit: string
}

export interface OrderProductItem {
    coupon?: CouponProductData,
    final_total: number,
    id: string,
    product: ProductData
    product_id:string,
    qty:number,
    total:number
}

export interface OrderData {
    create_at: number,
    id: string,
    is_paid: boolean,
    message: string,
    paid_date: number,
    products: OrderProduct,
    total: number,
    user: UserData
}

export interface GetOrderResponse {
    success: boolean,
    order: OrderData,
}