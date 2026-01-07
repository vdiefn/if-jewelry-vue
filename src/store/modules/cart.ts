import { defineStore } from "pinia";
import {
  reqAddCart,
  reqDeleteCart,
  reqGetCart,
  reqEditCart,
} from "@/api/front/cart.ts";
import { reqCoupon } from "@/api/front/coupon";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import type { FullCartData, ResponseCartData, CartData } from "@/types/front/cart";
import type { CouponParams } from "@/types/front/coupon"

export const useCartStore = defineStore("cart", () => {
  const cartList = ref<FullCartData[]>([]);
  const loading = ref(false);
  const cartData = ref<ResponseCartData>({
    carts: [],
    total: 0,
    final_total: 0,
  });
  const couponCode = ref("");

  const clearCart = () => {
    cartList.value = [];
    cartData.value = {
      carts: [],
      final_total: 0,
      total: 0,
    };
    couponCode.value = "";
  };

  const addToCart = async (data: { product_id: string; qty: number }) => {
    loading.value = true;

    try {
      const res = await reqAddCart(data);

      if (res.data.success) {
        await getCartProducts();
      } else {
        ElMessage({
          type: "error",
          message: res.data.message,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const getCartProducts = async () => {
    loading.value = true;

    try {
      const res = await reqGetCart();
      cartList.value = res.data.data.carts;
      cartData.value = res.data.data;
      couponCode.value = cartList.value[0]?.coupon?.code || "";
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  const deleteCartProduct = async (id: string) => {
    loading.value = true;
    try {
      const res = await reqDeleteCart(id);
      if (res.data.success) {
        await getCartProducts();
      } else {
        ElMessage({
          type: "error",
          message: res.data.message,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const editCartProduct = async (data:CartData) => {
    loading.value = true;
    try {
      const res = await reqEditCart(data);
      if(!res.data.success) {
        ElMessage({ type: "error",message: res.data.message });
        return
      }
      await getCartProducts();
      ElMessage({ type: "success",message: res.data.message })

    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const getCoupon = async (perInput:CouponParams) => {
    try {
      const res = await reqCoupon(perInput);
      if(!res.data.success){
        ElMessage({ type: "error",message: res.data.message });
        return
      }

      ElMessage({ type: "success",message: "已成功使用折價券",});
      await getCartProducts();

    } catch (error) {
      console.error(error);
    }
  };

  return {
    cartList,
    cartData,
    couponCode,
    clearCart,
    addToCart,
    deleteCartProduct,
    getCartProducts,
    editCartProduct,
    getCoupon,
  };
});
