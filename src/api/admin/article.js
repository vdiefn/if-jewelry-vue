import api from "@/utils/api"

export const reqArticles = (page=1) => {
    return api.get("/admin/articles")
}

export const reqArticle = (id) => {
    return api.get(`/admin/article/${id}`)
}

export const reqAddArticle = (payload) => {
    return api.post("/admin/article", payload)
}

export const reqEditArticle = (id, payload) => {
    return api.put(`/admin/article/${id}`, payload)
}

export const reqDeleteArticle = (id) => {
    return api.delete(`/admin/article/${id}`)
}