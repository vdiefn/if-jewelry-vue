import api from "@/utils/api"

export const reqOrders = (page=1) => {
    return api.get(`/admin/orders?page=${page}`)
}

export const reqEditOrder = (data) => {
    return api.put(`/admin/order/${data.id}`, {data})
}

export const reqDeleteOrder = (id) => {
    return api.delete(`/admin/order/${id}`)
}