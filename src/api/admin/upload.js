import api from "@/utils/api.js";

export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file-to-upload', file);

    return api.post(`/admin/upload`, formData);
};