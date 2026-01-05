<script setup lang="ts">
import type { ProductData } from "@/types/front/product";
const props = defineProps<{
  data: ProductData;
}>();
</script>

<template>
  <div class="card">
    <RouterLink
      :to="{ name: 'ProductDetail', params: { id: String(props.data.id) } }"
    >
      <img
        :src="props.data.imagesUrl[0]"
        alt="product photo"
        class="product-image"
        loading="lazy"
      />
      <div class="card-text">
        <h5 class="card-title">{{ props.data.title }}</h5>
        <div class="price-wrapper">
          <span class="price-origin">${{ props.data.origin_price }}</span>
          <p class="price">${{ props.data.price }}</p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  overflow: contain;

  .product-image {
    width: 100%;
    height: auto;
    aspect-ratio: 1/0.8;
    display: block;
    object-fit: cover;
  }

  .card-text {
    display: flex;
    flex-direction: column;
    align-items: center;

    h5 {
      font-size: 0.8rem;
    }

    .price-wrapper {
      display: flex;
      flex-direction: row;
      gap: 5px;

      .price-origin {
        text-decoration: line-through;
        color: #999;
        font-size: 10px;
      }

      .price {
        color: $base-primary-color;
        font-size: 1.1 rem;
        font-style: italic;
      }
    }
  }
}

@media (min-width: $breakpoint-tablet) {
  .card {
    height: 100%;

    .product-image {
      width: 100%;
      aspect-ratio: 1/0.8;
      height: auto;
      min-height: 100px;
      max-height: 250px;
    }

    .card-text {
      display: flex;
      flex-direction: column;
      align-items: center;

      h5 {
        font-size: 0.9rem;
      }
    }
  }
}

@media (min-width: $breakpoint-desktop) {
  .card {
    .product-image {
      width: 100%;
      aspect-ratio: 1/0.8;
      height: auto;
      min-height: 150px;
      max-height: 350px;
    }

    .card-text {
      display: flex;
      flex-direction: column;
      align-items: center;

      h5 {
        font-size: 1rem;
      }
    }
  }
}
</style>
