<script setup lang="ts">
import { QuestionAndAnswerForm, ContentContainer } from "@/components/front";
import { shippingAndPayment } from "@/data/shippingAndPayment.ts";
</script>

<template>
  <ContentContainer>
    <div class="container">
      <h3>運送及付款方式</h3>
      <QuestionAndAnswerForm :data="shippingAndPayment" />
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
.container {
  margin: 0 10px;

  h3 {
    padding-top:1.5rem;
  }
}
</style>
