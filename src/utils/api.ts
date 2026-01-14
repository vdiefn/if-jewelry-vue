import axios from "axios";
import { useUserStore } from "@/store/modules/user";
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router";

const router = useRouter();

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}`;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
});

api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;

    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let status = error.response?.status
    let message = ""
    const serverMessage = error.response.data.message;
    const userStore = useUserStore();
    switch (status){
      case 401:
        message = "token過期"
        userStore.userLogout()
        router.push('/admin/login')
        break;
      case 404:
        message = serverMessage||"請求地址錯誤"
        break;
      case 500:
        message = "伺服器異常"
        break;
      default:
        message = serverMessage||"網路異常"
    }
    ElMessage({
      type:"error",
      message
    })
    return Promise.reject(error);
  }
);

export default api;
