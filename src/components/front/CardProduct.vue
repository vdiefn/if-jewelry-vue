<script setup>
const props = defineProps({
    data: {
        type: Object
    }
})
</script>

<template>
    <div class="card" >
        <RouterLink :to="{ path: `/product/${props.data.id}` }">
            <img
                :src="props.data.imagesUrl[0]"
                alt="product photo"
                class="product-image"
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
    overflow: hidden;

    .product-image {
        width: 100%;
        height: 100%;
        min-height: 80px;
        max-height: 200px;
        display: block;
        object-fit: cover;
    }

    .card-text {
        display: flex;
        flex-direction: column;
        align-items: center;

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
        .product-image {
            width: 100%;
            height: 100%;
            min-height: 100px;
            max-height: 200px;
        }
    }
}

@media (min-width: $breakpoint-desktop) {
    .card {
        .product-image {
            width: 100%;
            height: 100%;
            min-height: 150px;
            max-height: 200px;
        }
    }
}

</style>