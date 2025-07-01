import api from "@/utils/api.js";

export const reqAddPayment = (id) => {
    return api.post(`/pay/${id}`)
}