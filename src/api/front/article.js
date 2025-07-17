import api from "@/utils/api.js";

export const reqAllArticles = () => {
    return api.get("/articles")
}

export const reqArticle = (id) => {
    return api.get(`/article/${id}`)
}