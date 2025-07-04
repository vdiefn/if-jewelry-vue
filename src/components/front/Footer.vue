<script setup>
import { ref } from 'vue';

</script>

<template>
    <div class="container">
        <div class="about-us footer-item">
            <h4>About Us</h4>
            <a><p>品牌故事</p></a>
            <a><p>會員制度</p></a>
        </div>
        <div class="service footer-item">
            <h4>Service</h4>
            <p><RouterLink :to="{name: 'Faq'}">常見問題</RouterLink></p>
            <RouterLink><p>運送及付款方式</p></RouterLink>
        </div>
        <div class="contact-us footer-item">
            <h4>Contact Us</h4>
            <p>If Jewelry 如果工作室</p>
            <p>客服電話:02-8765-4321</p>
            <p>服務時間:週一~週五 09:00 - 18:30</p>
        </div>
        <div class="follow-us footer-item">
            <h4>Follow Us</h4>
            <div class="icon">
                <i>
                    <font-awesome-icon :icon="['fab', 'facebook']" />
                </i>
                <i>
                    <font-awesome-icon :icon="['fab', 'instagram']" />
                </i>
                <i>
                    <font-awesome-icon :icon="['fab', 'line']" />
                </i>
            </div>
        </div>


    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .footer-item {
        > p{
            margin-top: 3px
        }
    }

    .icon {
        display: flex;
        gap:10px;
    }
}


@media (min-width: $breakpoint-tablet) {
    .container {
        max-width: 1280px;
        flex-direction: row;
        gap: 10px;
        justify-content: space-between;
        margin: 0 auto;
        padding: 1rem 1rem;

        .follow-us {
            .icon {
                justify-content: center;
            }
        }
    }
}
</style>