import type { PaginationEmits } from "element-plus"
import type { Pagination } from "./product"

export interface ArticleData {
    title:string,
    description:string,
    image: string,
    tag: string[],
    create_at: number,
    author: string,
    isPublic: boolean,
    content: string
}

export interface GetArticleResponse {
    success: boolean,
    articles: ArticleData[],
    pagination: Pagination
    messages: string[]
}

export interface GetArticleDetailResponse {
    success: boolean,
    articles: ArticleData,
    pagination: Pagination,
    messages: string[]
}


