import api from "@/utils/api.js";
import type { AxiosResponse } from "axios"
import type { GetArticleResponse, GetArticleDetailResponse } from "@/types/front/article";


export const reqAllArticles = ():Promise<AxiosResponse<GetArticleResponse>> => {
    return api.get("/articles")
}

export const reqArticle = (id:string):Promise<AxiosResponse<GetArticleDetailResponse>> => {
    return api.get(`/article/${id}`)
}