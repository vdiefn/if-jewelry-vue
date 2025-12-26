import type { Pagination } from "./product"

export interface Coupon {
  id: string
  code: string
  title: string
  percent: number
  due_date: number
  is_enabled: number
}

export interface Product {
  id: string
  title: string
  category: string
  content: string
  description: string
  unit: string
  price: number
  origin_price: number
  is_enabled: number
  imageUrl: string
  imagesUrl: string[]
}

export interface OrderProductData {
  id: string
  product_id: string
  qty: number
  total: number
  final_total: number
  product: Product
  coupon?: Coupon
}

export type OrderProducts = Record<string, OrderProductData>

export interface UserData {
  address: string,
  email: string,
  name: string,
  tel: string
}

export interface OrderData {
  id: string
  create_at: number
  is_paid: boolean
  paid_date?: number
  message?: string
  num: number
  total: number
  user: UserData
  products: OrderProducts
}

export interface GetOrderResponse {
  success: boolean
  orders: OrderData[]
  pagination: Pagination,
  message: string[]
}

export interface EditProductData {
  id: string,
  product_id: string,
  qty: number
}

export interface EditOrderParams {
  create_at: number,
  id: string,
  is_paid: boolean,
  message: string,
  products: {
    [key: string]:EditProductData
  },
  user: UserData,
  num: number,
  paid_date: number | undefined,
  total: number
}

export interface OrderResponse {
  success: boolean,
  message: string
}