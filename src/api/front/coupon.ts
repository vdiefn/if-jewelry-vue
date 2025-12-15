import api from "@/utils/api.js";
import type { AxiosResponse } from "axios"
import type { CreateCouponResponse, CouponParams } from "@/types/front/coupon";

export const reqCoupon = (payload:CouponParams):Promise<AxiosResponse<CreateCouponResponse>> => {
    return api.post("/coupon", payload)
}