<script setup>

</script>
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

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    margin-top: 46px;

    .checkout-success {
        padding: 2rem;

        .el-button {
            margin-top: 2rem;
        }
    }

    .image-wrapper {
        height: 100%;
        overflow: hidden;

        img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            display: block;
        }
    }
}

@media(min-width: $breakpoint-tablet) {
    .container {
        display: grid;
        grid-template-columns: 60% 40%;
        height: calc(100vh - $base-footer-height);

        .checkout-success {
            padding: 2rem 10%;

            .el-button {
                width: 100px;
                margin-top:2rem;
            }
        }

        .image-wrapper {
            height: 100%;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}

@media(min-width: $breakpoint-desktop) {
    .container {
        display: grid;
        grid-template-columns: 70% 30%;
    }
}
</style>