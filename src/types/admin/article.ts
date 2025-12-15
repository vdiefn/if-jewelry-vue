import type { Pagination } from "./coupon";

export interface ArticleData {
    author: string,
    create_at: number,
    description: string,
    id: string,
    image: string,
    isPublic: boolean,
    tag: string[],
    title: string,
    num: number
}

export interface GetArticleResponse {
    success: boolean,
    articles: ArticleData[],
    pagination: Pagination,
    message: string[]
}

export interface GetArticleDetailResponse {
    success: boolean,
    article: ArticleData,
}

export interface EditArticleParams {
    id: string,
    data : {
        title: string,
        description: string,
        image: string,
        tag: string[],
        create_at: number,
        author: string,
        isPublic: boolean,
        content:string
    }
}

export interface MessageResponse {
    success: boolean,
    message: string
}

export interface CreateArticleParams {
    title: string,
    description: string,
    image: string,
    tag: string[],
    create_at: number,
    author: string,
    isPublic: boolean,
    content:string
}