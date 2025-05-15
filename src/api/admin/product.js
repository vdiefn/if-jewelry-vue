import api from "@/utils/api"

export const reqProducts = (page = 1, category="") => {
  return api.get(`/admin/products?page=${page}&category=${category}`)
}

export const reqAddNewProduct = (data) => {
  return api.post("/admin/product", data)
}

export const reqEditProduct = (data) => {
  return api.put(`/admin/product/${data.id}`, data)
}

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file-to-upload', file);

  return api.post(`/admin/upload`, formData);
};

export const reqDeleteProduct = (id) => {
  return api.delete(`/admin/product/${id}`)
}