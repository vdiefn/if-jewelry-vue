import api from "@/utils/api"
import type { GetArticleDetailResponse, GetArticleResponse, EditArticleParams, CreateArticleParams, MessageResponse } from "@/types/admin/article"
import type { AxiosResponse } from "axios"

export const reqArticles = (page:number):Promise<AxiosResponse<GetArticleResponse>> => {
    return api.get("/admin/articles", { params: page })
}

export const reqArticle = (id:string): Promise<AxiosResponse<GetArticleDetailResponse>> => {
    return api.get(`/admin/article/${id}`)
}

export const reqAddArticle = (payload: CreateArticleParams): Promise<AxiosResponse<MessageResponse>> => {
    return api.post("/admin/article", { data: payload})
}

export const reqEditArticle = (payload: EditArticleParams):Promise<AxiosResponse<MessageResponse>> => {
    const { id, data } = payload
    return api.put(`/admin/article/${id}`, { data })
}

export const reqDeleteArticle = (id:string):Promise<AxiosResponse<MessageResponse>> => {
    return api.delete(`/admin/article/${id}`)
}