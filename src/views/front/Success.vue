<template>
    <div class="container">
        <div class="checkout-success">
            <h2>訂購完成</h2>
            <p>感謝您的購買！您的訂單已成功送出。</p>
            <RouterLink to="/">
                <ElButton type="primary">回到首頁</ElButton>
            </RouterLink>
        </div>

        <div class="image-wrapper">
            <img src="https://images.unsplash.com/photo-1480399129128-2066acb5009e?auto=format&fit=crop&w=1950&q=80" alt="photo"/>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    margin-top: 46px;
    height: 100%;
    flex:1;

    .checkout-success {
        padding: 2rem;
        border: 1px solid red;
    }

    .image-wrapper {
        overflow: hidden;
        border: 1px solid green;

        img {
            width: 100%;
            height: 100%;
            display: block;
            max-height: none;
            object-fit: cover;
        }
    }
}

@media(min-width: $breakpoint-tablet) {
    .container {
        display: grid;
        grid-template-columns: 70% 30%;

        .image-wrapper {
            border: 1px solid green;

            img {
                width: 100%;
                height: 500px;
            }
        }
    }
}
</style>