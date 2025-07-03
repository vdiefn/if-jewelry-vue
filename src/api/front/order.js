import api from "@/utils/api.js";

export const reqAddOrder = (payload) => {
    return api.post("/order", payload)
}

export const reqGetOrder = (id) => {
    return api.get(`/order/${id}`)
}