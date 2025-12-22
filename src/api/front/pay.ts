import api from "@/utils/api.js";
import type { CreatePayResponse } from "@/types/front/pay";
import type { AxiosResponse } from "axios";

export const reqAddPayment = (id:string):Promise<AxiosResponse<CreatePayResponse>> => {
  return api.post(`/pay/${id}`)
}