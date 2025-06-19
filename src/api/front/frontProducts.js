import api from "@/utils/api"

export const reqAllProducts = () => {
    return api.get("products/all")
}

export const reqProducts = (page = 1, category= "") => {
    return api.get(`products?page=${page}&category=${category}`)
}