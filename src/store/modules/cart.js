import { defineStore } from "pinia"
import { reqAddCart, reqDeleteCart, reqGetCart, reqEditCart } from "@/api/front/cart.js";
import { ref } from "vue"
import { ElMessage } from "element-plus"

export const useCartStore = defineStore("cart", () => {
    const cartList = ref([])
    const loading = ref(false)
    const cartData = ref({})

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

    return { cartList, cartData, addToCart, deleteCartProduct, getCartProducts, editCartProduct }
})