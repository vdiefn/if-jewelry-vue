<script setup>
import { QuestionAndAnswerForm } from "@/components/front/index.js";
import { shippingAndPayment } from "@/data/shippingAndPayment.js";

</script>

<template>
    <div class="container">
        <h3>運送及付款方式 FAQ</h3>
        <QuestionAndAnswerForm :data="shippingAndPayment"/>
    </div>
</template>

<style scoped lang="scss">
.container {
    padding: 2rem 1rem;
    margin: 40px auto 0 auto;
}

@media(min-width: $breakpoint-tablet){
    .container {
        max-width: 650px;
    }
}

@media(min-width: $breakpoint-desktop){
    .container {
        max-width: 900px;
    }
}
</style>