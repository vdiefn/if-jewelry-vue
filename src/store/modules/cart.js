import { defineStore } from "pinia"
import { ref } from "vue"

export const useCartStore = defineStore("cart", () => {
    const cartList = ref([])

    const addToCart = (product) => {
        const item = cartList.value.find(i => i.id === product.id)
        if(item) {
            item.qty+=product.qty
        } else {
            cartList.value.push(product)
        }
    }

    return { cartList, addToCart}
})