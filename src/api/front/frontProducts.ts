import api from "@/utils/api.ts"
import type { AllProductsResponse, ProductsResponse, GetProductDetail } from "@/types/front/product"
import type { AxiosResponse } from "axios"

export const reqAllProducts = (): Promise<AxiosResponse<AllProductsResponse>> => {
    return api.get("products/all")
}

export const reqProducts = ( params: { page: number, category: string }): Promise<AxiosResponse<ProductsResponse>> => {
    return api.get("products", { params })
}

export const reqProductDetail = (id: string): Promise<AxiosResponse<GetProductDetail>> => {
    return api.get(`product/${id}`)
}

