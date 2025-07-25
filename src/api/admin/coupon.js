import api from "@/utils/api"

export const reqCoupons = (page=1) => {
    return api.get(`admin/coupons?page=${page}`)
}

export const reqAddNewCoupon = (data) => {
    return api.post("/admin/coupon",  data )
}

export const reqEditCoupon = (id, data) => {
    return api.put(`/admin/coupon/${id}`,  data )
}

export const reqDeleteCoupon = (id) => {
    return api.delete(`/admin/coupon/${id}`)
}