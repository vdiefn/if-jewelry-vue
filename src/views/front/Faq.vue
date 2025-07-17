<script setup>
import { faqs } from "@/data/faqs.js"
import { QuestionAndAnswerForm } from "@/components/front/index.js";

</script>

<template>
<div class="container">
    <h3>常見問題 FAQ</h3>
    <QuestionAndAnswerForm :data="faqs"/>
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