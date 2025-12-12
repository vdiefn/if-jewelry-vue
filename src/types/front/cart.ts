import type { ProductData } from "./product"

export interface CartData {
    product_id: string,
    qty: number,
    id: string,
    total: number,
    final_total: number,
    product: ProductData,
}

export interface CreateCartResponse {
    success: boolean,
    message: string,
    data: CartData[],
}

export interface CouponData {
    code: string,
    due_date: number,
    id: string,
    is_enabled: boolean,
    percent: number,
    title: string,
}

export interface FullCartData {
    coupon: CouponData,
    product: ProductData,
    final_total: number,
    id: string,
    product_id: string,
    qty: number,
    total: number, 
}

export interface GetCartResponse {
    success: boolean,
    data: {
        carts: FullCartData[],
        final_total: number,
        total: number,
    }
    messages: string[],
}

export interface CartParams {
    data: {
        product_id: string,
        qty: number,
    }
}

export interface EditCartResponse {
    success: boolean,
    message: string,
    data: CartParams
}

export interface DeleteCartResponse {
    success: boolean,
    message: string,
}