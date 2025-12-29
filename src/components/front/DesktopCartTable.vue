<script setup lang="ts">
import { ElButton, ElCard, ElInput, ElInputNumber } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import { useCartStore } from "@/store/modules/cart.ts";
import { useRouter } from "vue-router";
import type { FullCartData, CartParams } from "@/types/front/cart";
import type { CouponParams } from "@/types/front/coupon"

interface Emits {
  (e: "update-cart"): void;
}

const props = defineProps<{
  data: FullCartData[];
}>();

const emit = defineEmits<Emits>();
const cartStore = useCartStore();
const router = useRouter();
const loading = ref(false);
const perCoupon = ref("");

const handleQtyChange = async (row:CartParams) => {
  await cartStore.editCartProduct(row);
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
  const payload:CouponParams = { code: perInput }
  try {
    await cartStore.getCoupon(payload);
    emit("update-cart");
  } catch (error) {
    console.error(error);
  }
};

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
  <ElTable :data="props.data" table-layout="auto" stripe>
    <ElTableColumn label="圖片" width="100">
      <template #default="{ row }">
        <img
          :src="row.product.imagesUrl[0]"
          alt="product image"
          class="product-img"
        />
      </template>
    </ElTableColumn>
    <ElTableColumn prop="product.title" label="商品名稱">
      <template #default="{ row }">
        <RouterLink :to="{ path: `/product/${row.product.id}` }">
          {{ row.product.title }}
        </RouterLink>
      </template>
    </ElTableColumn>
    <ElTableColumn label="價格" width="1" align="center">
      <template #default="{ row }">
        <span class="new-price">NTD {{ row.product.price }}</span>
        <br />
        <small class="old-price">NTD {{ row.product.origin_price }}</small>
      </template>
    </ElTableColumn>
    <ElTableColumn label="數量" width="1" align="center">
      <template #default="{ row }">
        <ElInputNumber
          v-model="row.qty"
          :min="1"
          @change="handleQtyChange(row)"
          size="small"
        />
      </template>
    </ElTableColumn>
    <ElTableColumn prop="total" label="小計" align="center" width="1" />
    <ElTableColumn prop="" width="50" align="center">
      <template #default="{ row }">
        <i @click="handleDeleteProduct(row.id)" class="delete-icon">
          <font-awesome-icon :icon="['far', 'trash-can']" />
        </i>
      </template>
    </ElTableColumn>
  </ElTable>
  <div class="card-wrapper">
    <ElCard class="cart-coupon">
      <h5>您是否有優惠碼？</h5>
      <ElInput
        v-model="perCoupon"
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
            cartStore.cartData?.final_total > 0
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
  </div>
</template>

<style scoped lang="scss">
.el-table {
  width: 100%;

  :deep(.cell) {
    white-space: nowrap;
  }

  :deep(.new-price) {
    color: $base-primary-color;
    font-weight: bold;
    margin-left: 10px;
  }
  :deep(.old-price) {
    text-decoration: line-through;
  }

  .product-img {
    width: 80px;
    height: auto;
    object-fit: cover;
    aspect-ratio: 1/1;
  }
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;

  .cart-title,
  .cart-price-card,
  .cart-coupon,
  .operation-btn {
    max-width: 80%;
    width: 100%;
  }

  .cart-coupon {
    h5 {
      margin-bottom: 10px;
    }
    .el-input-group__append .el-button {
      margin: 0;
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
    margin-top: 1rem;

    .el-button {
      margin: 0;
    }
  }
}
</style>
