<script setup>
const props = defineProps({
    title : {
        type: String
    },
    data: {
        type: Object
    }
})
</script>

<template>
    <div class="card-wrapper">
        <div class="card" v-for="product in props.data" :key="product.id">
            <RouterLink :to="{ path: `/product/${product.id}` }">
                <img
                    :src="product.imagesUrl[0]"
                    alt="product photo"
                    class="product-image"
                />
                <div class="card-text">
                    <h5 class="card-title">{{ product.title }}</h5>
                    <div class="price-wrapper">
                        <span class="price-origin">${{ product.origin_price }}</span>
                        <p class="price">${{ product.price }}</p>
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card-wrapper {
    display: grid;
    grid-template-columns: repeat(2, minmax(150px, 1fr));
    grid-gap: 1rem;
    margin: 1rem auto;
    width: 100%;
    justify-items: center;

    .card {
        width: 100%;
        overflow: hidden;

        .product-image {
            width: 100%;
            height: 100%;
            min-height: 80px;
            max-height: 120px;
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
}

@media (min-width: $breakpoint-tablet) {
    .card-wrapper {
        display: grid;
        grid-template-columns: repeat(3, minmax(200px, 1fr));

        .card {
            .product-image {
                width: 100%;
                height: 100%;
                min-height: 100px;
                max-height: 150px;
            }
        }
    }
}

@media (min-width: $breakpoint-desktop) {
    .card-wrapper {
        display: grid;
        grid-template-columns: repeat(4, minmax(200px, 1fr));

        .card {
            .product-image {
                width: 100%;
                height: 100%;
                min-height: 150px;
                max-height: 200px;
            }
        }
    }
}


</style>