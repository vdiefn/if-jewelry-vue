<script setup lang="ts">
import {
  ElInputNumber,
  ElButton,
  ElTabs,
  ElTabPane,
  ElDivider,
  ElBreadcrumb,
  ElBreadcrumbItem,
} from "element-plus";
import { ref, watch, useTemplateRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { reqProductDetail, reqProducts } from "@/api/front/frontProducts.js";
import { CardProduct, DrawerCartList, ContentContainer } from "@/components/front";
import { useCartStore } from "@/store/modules/cart.ts";
import { useIsMobile } from "@/composables/useIsMobile";
import { paymentAndDeliveryMethod, jewelryCare } from "@/data";
import type { ProductData } from "@/types/front/product";

const route = useRoute();
const router = useRouter();
const count = ref(1);
const productData = ref<ProductData>();
const activeName = ref("first" as string);
const currentCategory = ref("");
const currentId = ref("");
const similarProducts = ref<ProductData[]>([]);
const activeImage = ref(0);
const imageList = ref<string[]>([]);
const loading = ref(false);
const cartStore = useCartStore();
const drawerCartListRef =
  useTemplateRef<InstanceType<typeof DrawerCartList>>("drawerCartListRef");
const { isMobile } = useIsMobile();

const getProductDetail = async (id: string) => {
  loading.value = true;

  try {
    const res = await reqProductDetail(id);
    productData.value = res.data.product;
    currentCategory.value = res.data.product.category;
    currentId.value = res.data.product.id;
    await getSimilarProducts();
    imageList.value = res.data.product.imagesUrl;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const MAX_SIMILAR = 4;
const getSimilarProducts = async () => {
  if (currentCategory.value.length === 0) return;
  try {
    const res = await reqProducts({ page: 1, category: currentCategory.value });
    similarProducts.value = res.data.products
      .filter((product) => product.id !== currentId.value)
      .slice(0, MAX_SIMILAR);
  } catch (error) {
    console.error(error);
  }
};

const handleClickImage = (index: number) => {
  activeImage.value = index;
};

const addToCart = async (id: string, count: number) => {
  await cartStore.addToCart({
    product_id: id,
    qty: count,
  });

  if (isMobile.value) {
    await drawerCartListRef.value?.open();
  }
};

const goToCheckout = async (id: string, count: number) => {
  await cartStore.addToCart({
    product_id: id,
    qty: count,
  });

  await router.push("/cart");
};

watch(
  () => route.params.id,
  (id) => {
    if (!id) return;
    console.log("change");
    getProductDetail(id as string);
  },
  { immediate: true }
);
</script>

<template>
  <div class="container" v-if="productData" v-loading="loading">
    <ElBreadcrumb separator="/">
      <ElBreadcrumbItem>
        <RouterLink :to="{ path: '/products' }" style="font-weight: normal"
          >全部商品</RouterLink
        >
      </ElBreadcrumbItem>
      <ElBreadcrumbItem :to="`/products?category=${currentCategory}`">
        {{ currentCategory }}
      </ElBreadcrumbItem>
    </ElBreadcrumb>
    <div class="top">
      <div class="image-section">
        <div class="big-image">
          <img
            :src="imageList[activeImage] || ''"
            alt="target product picture"
          />
        </div>
        <div class="small-image">
          <div
            v-for="(image, index) in imageList"
            :key="index"
            class="image-wrapper"
            @click="handleClickImage(index)"
            :class="{ active: index === activeImage }"
          >
            <img :src="image" alt="product picture" />
          </div>
        </div>
      </div>
      <div class="purchase-section">
        <h5>{{ productData.title }}</h5>
        <div class="price-info">
          <p>$NTD {{ productData.origin_price }}</p>
          <h6>$NTD {{ productData.price }}</h6>
        </div>
        <h6>
          {{ productData.description }}
        </h6>
        <ElInputNumber v-model="count" :min="1" :max="10" />
        <div class="button-wrapper">
          <ElButton type="primary" @click="addToCart(productData.id, count)"
            >加入購物車</ElButton
          >
          <ElButton type="warning" @click="goToCheckout(productData.id, count)"
            >立即購買</ElButton
          >
        </div>
      </div>
    </div>

    <ElTabs v-model?="activeName as string" class="tabs-wrapper">
      <ElTabPane label="商品描述" name?="first" class="product-info">
        <p>{{ productData.content }}</p>
      </ElTabPane>
      <ElTabPane
        label="送貨與付款方式"
        name?="second"
        class="payment-and-delivery-method"
      >
        <div
          v-for="section in paymentAndDeliveryMethod"
          :key="section.title"
          class="text"
        >
          <h6>{{ section.title }}</h6>
          <p v-for="item in section.items" :key="item">
            {{ item }}
          </p>
        </div>
      </ElTabPane>
      <ElTabPane label="保養方式" name?="third" class="jewelry-care">
        <div
          v-for="section in jewelryCare"
          :key="section.title"
          class="jewelry-care-section"
        >
          <h5>{{ section.title }}</h5>

          <p v-for="(item, index) in section.items" :key="index">
            {{ index + 1 }}. {{ item }}
          </p>
        </div>
      </ElTabPane>
    </ElTabs>

    <div class="other-products" v-if="similarProducts.length > 0">
      <ElDivider content-position="center"><h5>你可能也會喜歡</h5></ElDivider>
      <div class="card-wrapper">
        <CardProduct
          :data="product"
          v-for="product in similarProducts.slice(0, 3)"
          :key="product.id"
        />
      </div>
    </div>
  </div>

  <DrawerCartList ref="drawerCartListRef" />
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;

  .el-breadcrumb {
    height: 30px;
    padding: 0 1rem;
    line-height: 30px;
    margin: 0.5rem 0;
  }

  .top {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    .image-section {
      display: grid;
      grid-template-columns: 80% 20%;
      gap: 0.5rem;
      margin: 10px;

      .big-image {
        aspect-ratio: 1 / 1;
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .small-image {
          flex-direction: column;
          display: flex;
          gap: 0.5rem;

          .image-wrapper {
            padding: 5px;
            cursor: pointer;

            &.active img {
              border: 2px solid $base-primary-color;
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              display: block;
            }
          }
        }
      }
    }

    .purchase-section {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 1rem;
      margin: 1rem 0;
      padding: 0 1rem;

      h5 {
        font-size: 1.5rem;
        font-weight: bold;
      }

      .price-info {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;

        h6 {
          font-size: 1.1rem;
          font-weight: bold;
        }

        > :first-child {
          text-decoration: line-through;
          opacity: 0.7;
          font-style: italic;
        }
      }

      h6 {
        white-space: pre-line;
        word-break: break-word;
      }

      .el-input-number {
        width: 100%;
      }

      .button-wrapper {
        display: flex;
        width: 100%;
        gap: 0.5rem;

        .el-button {
          width: 100%;
          margin: 0;
        }
      }
    }
  }

  .tabs-wrapper {
    width: 100%;
    margin: 0 auto;

    .product-info,
    .payment-and-delivery-method,
    .jewelry-care {
      padding: 10px;
    }

    :deep(.el-tabs__header) {
      margin: 0 auto;
    }

    .jewelry-care {
      width: 90%;
      margin: 0 auto;
    }

    .payment-and-delivery-method,
    .product-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      white-space: pre-line;
      word-break: break-word;

      .text {
        margin: 0.5rem auto;

        h6,
        p {
          text-align: center;
        }

        h6 {
          margin-bottom: 5px;
          font-weight: bold;
        }
      }
    }

    .jewelry-care {
      h5 {
        margin: 10px 0;
        font-weight: 700;
        color: $base-brand-color;
      }
    }
  }

  .other-products {
    width: 100%;

    :deep(.el-divider) {
      .el-divider__text {
        background-color: $base-background-color;
      }
    }

    > h5 {
      text-align: center;
    }

    .card-wrapper {
      display: flex;
      gap: 1.5rem;
      padding: 0 1rem;
      margin: 1rem auto;
    }
  }
}

@media (min-width: $breakpoint-tablet) {
  .container {
    .el-breadcrumb, .top{
      max-width: 1000px;
      width: 100%;
      padding: 0 1rem;
    }
    .el-breadcrumb {
      margin: 0.5rem auto;
    }
    .top {
      margin: 0 auto;
      display: grid;
      grid-template-columns: minmax(200px, 1fr) minmax(150px, 1fr);

      .image-section {
        aspect-ratio: 1 / 1;
        width: 100%;
        height: auto;
        max-width: 480px;
        position: relative;
        display: flex;
        padding: 1rem 1rem;

        .big-image {
          aspect-ratio: 1 / 1;
          width: 80%;
          height: 80%;
          object-fit: cover;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        }

        .small-image {
          width: 20%;
          height: 80%;
          text-decoration: none;
          margin-left: 5px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          .image-wrapper {
            width: 100%;
            height: 20%;
            cursor: pointer;

            &.active {
              border: 2px solid $base-primary-color;
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              display: block;
              margin: auto;
            }
          }
        }
      }

      .purchase-section {
        display: block;

        h4 {
          font-size: 2rem;
        }

        .price-info,
        .el-input-number,
        .button-wrapper {
          margin: 1rem 0;
        }

        .button-wrapper {
          display: flex;
          justify-content: center;
        }
      }
    }

    .tabs-wrapper {
      width: 80%;
      margin: 0 auto;
      :deep(.el-tabs__header) {
        margin: 0 auto;
      }

      .jewelry-care {
        max-width: 80%;
        width: 100%;
        padding: 20px 20px;
        margin: 10px auto;
      }
    }

    .other-products {
      width: 70%;
      margin: 0 auto;
    }
  }
}

@media (min-width: $breakpoint-desktop) {
  .container {
    .other-products {
      width: 50%;
      margin: 0 auto;
    }
  }
}
</style>
