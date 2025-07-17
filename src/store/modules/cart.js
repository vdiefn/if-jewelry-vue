import { defineStore } from "pinia"
import { reqAddCart, reqDeleteCart, reqGetCart, reqEditCart, reqCoupon } from "@/api/front/cart.js";
import { ref } from "vue"
import { ElMessage } from "element-plus"

export const useCartStore = defineStore("cart", () => {
    const cartList = ref([])
    const loading = ref(false)
    const cartData = ref({})
    const couponCode = ref("")

    const clearCart = () => {
        cartList.value = []
        cartData.value = {}
        couponCode.value = ""
    }

    const addToCart = async (id, qty) => {
        loading.value = true

        try {
            const res = await reqAddCart(id, qty)

            if(res.success) {
                await getCartProducts()
            } else {
                ElMessage({
                    type: "error",
                    message : res.message
                })
            }
        } catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    const getCartProducts = async () => {
        loading.value = true

        try {
            const res = await reqGetCart()
            cartList.value = res.data.carts
            cartData.value = res.data
            couponCode.value = cartList.value[0]?.coupon?.code || ""
        } catch(error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }

    const deleteCartProduct = async(id) => {
        loading.value = true
        try {
            const res = await reqDeleteCart(id)
            if(res.success) {
                await getCartProducts()
            } else {
                ElMessage({
                    type: "error",
                    message : res.message
                })
            }
        } catch(error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    const editCartProduct = async(data) => {
        loading.value = true
        try {
            const res = await reqEditCart(data.id, {
                data: {
                    product_id: data.product_id,
                    qty: data.qty,
                }
            })
            if(res.success) {
                await getCartProducts()
            } else {
                ElMessage({
                    type: "error",
                    message : res.message
                })
            }
        } catch(error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    const getCoupon = async(perInput) => {
        try {
            const res = await reqCoupon({
                data: {
                    code: perInput
                }
            })
            if(res.success) {
                ElMessage({
                    type:"success",
                    message: "已成功使用折價券"
                })
                await getCartProducts()
            } else {
                ElMessage({
                    type: "error",
                    message: res.message
                })
            }
        } catch(error) {
            console.error(error)
        }
    }

    return { cartList, cartData, couponCode, clearCart, addToCart, deleteCartProduct, getCartProducts, editCartProduct, getCoupon }
})