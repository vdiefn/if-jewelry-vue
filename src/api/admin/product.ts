import api from "@/utils/api"
import type { AxiosResponse } from "axios"
import type { GetProductsResponse, CreateProductParams, ProductResponse, EditProductParams } from "@/types/admin/product"

export const reqProducts = (params: { page:number, category:string}):Promise<AxiosResponse<GetProductsResponse>> => {
    return api.get(`/admin/products`, { params })
}

export const reqAddNewProduct = (params:CreateProductParams):Promise<AxiosResponse<ProductResponse>> => {
    return api.post("/admin/product", { params })
}

export const reqEditProduct = ( params: EditProductParams ):Promise<AxiosResponse<ProductResponse>> => {
    const { data, id } = params
    return api.put(`/admin/product/${id}`, {data})
}

export const reqDeleteProduct = (id:string):Promise<AxiosResponse<ProductResponse>> => {
    return api.delete(`/admin/product/${id}`)
}