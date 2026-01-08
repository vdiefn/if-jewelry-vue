<script setup lang="ts">
import { ElButton, ElCard, ElInput, ElInputNumber } from "element-plus";
import { watch, ref } from "vue";
import { useCartStore } from "@/store/modules/cart.ts";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import { useCartItem } from "@/composables/useCartItem"
import type { FullCartData } from "@/types/front/cart";

interface Emits {
  (e: "update-cart"): void;
}

const props = defineProps<{
  data: FullCartData[];
}>();

const emit = defineEmits<Emits>();
const cartStore = useCartStore();
const router = useRouter();
const perCoupon = ref("");

const {
  handleQtyChange,
  handleDeleteProduct,
  handleGetCoupon,
} = useCartItem(emit)

watch(
  () => cartStore.couponCode,
  (value) => {
    if (value) {
      perCoupon.value = value;
    }
  },
  { immediate: true }
);
</script>

<template>
  <ElCard class="cart-card" v-for="item in props.data" :key="item.id">
    <div class="card-content">
      <div class="image">
        <img :src="item.product.imagesUrl[0]" alt="商品圖片" />
      </div>
      <div class="info">
        <RouterLink :to="{ path: `/product/${item.product.id}` }">
          <h3 class="title">{{ item.product.title }}</h3>
        </RouterLink>
        <div class="price">
          <span class="price-old">NTD {{ item.product.origin_price }}</span>
          <span class="price-now">NTD {{ item.product.price }}</span>
        </div>
        <div class="operation">
          <ElInputNumber
            v-model="item.qty"
            :min="1"
            :max="99"
            size="small"
            @change="handleQtyChange(item)"
          />
          <i @click="handleDeleteProduct(item.id)">
            <font-awesome-icon :icon="['far', 'trash-can']" />
          </i>
        </div>
        <div class="subtotal">
          <p>小計: NTD {{ item.total }}</p>
        </div>
      </div>
    </div>
  </ElCard>
  <CouponCard :perCoupon="perCoupon" :handleGetCoupon="handleGetCoupon"/>
  <ElCard class="cart-coupon">
    <h5>您是否有優惠碼？</h5>
    <ElInput
      v-model.trim="perCoupon"
      placeholder="請輸入優惠碼"
      class="input-with-search"
      @keyup.enter="handleGetCoupon(perCoupon)"
    >
      <template #append>
        <ElButton
          @click="handleGetCoupon(perCoupon)"
          type="text"
          :icon="Search"
          class="icon-button"
        />
      </template>
    </ElInput>
  </ElCard>
  <ElCard class="cart-price-card">
    <h5>購物車清單</h5>
    <div class="discount" v-if="cartStore.couponCode.length > 0">
      <p>優惠碼</p>
      <p>{{ cartStore.couponCode }}</p>
    </div>
    <div class="final-total">
      <p>小計</p>
      <p>
        NTD {{ cartStore.cartData.total > 0 ? cartStore.cartData.total : 0 }}
      </p>
    </div>
    <div class="final-total-discount">
      <p>總計</p>
      <p>
        NTD
        {{
          cartStore.cartData.final_total > 0
            ? Math.round(cartStore.cartData.final_total)
            : 0
        }}
      </p>
    </div>
  </ElCard>
  <div class="operation-btn">
    <ElButton type="primary" @click="router.push('/checkout')"
      >前往結帳</ElButton
    >
    <ElButton @click="router.back()">繼續購物</ElButton>
  </div>
</template>

<style scoped lang="scss">
.cart-card,
.cart-price-card,
.cart-coupon,
.operation-btn {
  border-radius: 3px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}

.cart-card {
  .card-content {
    display: flex;
    gap: 10px;

    .image {
      flex: 0 0 90px;

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        aspect-ratio: 1/1;
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        font-size: 16px;
        font-weight: bold;
        color: $base-brand-color;
      }

      .content {
        font-size: 13px;
        color: $base-muted-text-color;
        margin: 4px 0;
      }

      .price {
        display: flex;
        gap: 5px;

        .price-old {
          margin-left: 0.5rem;
          color: $base-muted-text-color;
          text-decoration: line-through;
          font-size: 12px;
        }

        .price-now {
          color: $base-primary-color;
          font-weight: bold;
        }
      }

      .operation {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        i {
          cursor: pointer;
        }
      }

      .subtotal {
        margin-top: 1rem;
      }
    }
  }
}

.cart-coupon {
  .input-with-search {
    margin-top: 0.5rem;

    .icon-button {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
  }
}

.cart-price-card {
  h5 {
    margin-bottom: 0.5rem;
  }

  .final-total,
  .final-total-discount,
  .discount {
    display: flex;
    margin-bottom: 5px;

    :first-child {
      flex: 1;
    }
  }

  .final-total-discount {
    font-weight: 700;
    font-size: 1.1rem;
  }
}

.operation-btn {
  display: flex;
  flex-direction: column;
  gap: 5px;

  .el-button {
    margin: 0;
    width: 100%;
  }
}
</style>
