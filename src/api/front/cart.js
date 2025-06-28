import api from "@/utils/api.js";

export const reqAddCart = (data) => {
    return api.post("/cart", {data})
}

export const reqGetCart = () => {
    return api.get("/cart")
}

export const reqEditCart = (id, payload) => {
    return api.put(`/cart/${id}`, payload)
}

export const reqDeleteCart = (id) => {
    return api.delete(`/cart/${id}`)
}

export const reqCoupon = (payload) => {
    return api.post("/coupon", payload)
}