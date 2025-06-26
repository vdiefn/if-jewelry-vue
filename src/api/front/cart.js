import api from "@/utils/api.js";

export const reqAddCart = (data) => {
    return api.post("/cart", {data})
}

export const reqGetCart = () => {
    return api.get("/cart")
}

export const reqEditCart = (data) => {
    return api.put(`/cart/${id}`, {data})
}

export const reqDeleteCart = (id) => {
    return api.delete(`/cart/${id}`)
}