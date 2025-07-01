import api from "@/utils/api.js";

export const reqAddOrder = (payload) => {
    return api.post("/order", payload)
}