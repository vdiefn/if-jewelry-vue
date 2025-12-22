import api from "@/utils/api"
import type {
  GetCouponResponse,
  CreateCouponParams,
  CreateCouponResponse,
  EditCouponParams,
  EditCouponResponse,
  DeleteCouponResponse,
} from '@/types/admin/coupon'
import type { AxiosResponse } from 'axios'

export const reqCoupons = (params: {page?:number}):Promise<AxiosResponse<GetCouponResponse>> => {
  return api.get(`admin/coupons`, { params })
}

export const reqAddNewCoupon = (params: CreateCouponParams):Promise<AxiosResponse<CreateCouponResponse>> => {
  return api.post("/admin/coupon",  { data: params })
}

export const reqEditCoupon = (params: EditCouponParams):Promise<AxiosResponse<EditCouponResponse>> => {
  const { id, ...data } = params
  return api.put(`/admin/coupon/${ id }`,  { data } )
}

export const reqDeleteCoupon = (id:string):Promise<AxiosResponse<DeleteCouponResponse>> => {
  return api.delete(`/admin/coupon/${ id }`)
}