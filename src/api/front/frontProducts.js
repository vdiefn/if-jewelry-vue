import api from "@/utils/api"

export const reqAllProducts = () => {
    return api.get("products/all")
}

export const reqProducts = (page = 1, category= "") => {
    return api.get(`products?page=${page}&category=${category}`)
}

export const reqProductDetail = (id) => {
    return api.get(`product/${id}`)
}

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