import { ElMessage } from "element-plus";
import { useDebounceFn } from "@vueuse/core"
import { useCartStore } from "@/store/modules/cart.ts";
import { ref } from "vue"
import type { CartData } from "@/types/front/cart";
import type { CouponParams } from "@/types/front/coupon"

export function useCartItem(emit: (event: 'update-cart') => void) {
  const loading = ref(false);
  const cartStore = useCartStore();

  const debounceUpdateQty = useDebounceFn(async(row:CartData) => {
    await cartStore.editCartProduct(row);
  }, 300)

  const handleQtyChange = async (row:CartData) => {
    debounceUpdateQty(row)
  };

  const handleDeleteProduct = async (id:string) => {
    loading.value = true;
    try {
      await cartStore.deleteCartProduct(id);
    } finally {
      loading.value = false;
    }
  };

  const handleGetCoupon = async (perInput:string) => {
    if(perInput.length === 0) {
      ElMessage({ type:"error", message:"請輸入優惠券碼"})
      return
    }
    const payload:CouponParams = { code: perInput }
    try {
      await cartStore.getCoupon(payload);
      emit("update-cart");
    } catch (error) {
      console.error(error);
    }
  };
  return {
    loading,
    handleQtyChange,
    handleDeleteProduct,
    handleGetCoupon
  }
}