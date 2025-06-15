import api from "@/utils/api"

export const reqAllProducts = () => {
    return api.get("products/all")
}