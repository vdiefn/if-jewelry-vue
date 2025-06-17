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
    <h4 class="sub-title">{{ props.title }}</h4>
    <div class="card-wrapper earrings" >
        <div class="card" v-for="product in props.data" :key="product.id">
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
        </div>
    </div>
</template>

<style scoped lang="scss">
h4 {
    text-align: center;
    letter-spacing: 0.3rem;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 400;
}

.card-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 0.5rem;
    margin: 1rem auto;
    width: 100%;
    justify-items: start;

    .card {
        width: 100%;
        overflow: hidden;
        padding: 0 1rem;

        .product-image {
            width: 100%;
            height: 100px;
            display: block;
            object-fit: cover;
        }

        @media (min-width: $breakpoint-tablet) {
            .product-image {
                height: 200px;
            }
        }

        @media (min-width: $breakpoint-desktop) {
            .product-image {
                height: 300px;
            }
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
                    font-style: italic;
                }
            }
        }
    }
}


</style>