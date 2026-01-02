<script setup lang="ts">
import { QuestionAndAnswerForm,DefaultContainer, ContentContainer } from "@/components/front";
import { shippingAndPayment } from "@/data/shippingAndPayment.ts";
</script>

<template>
  <DefaultContainer>
    <ContentContainer>
      <h3>運送及付款方式</h3>
      <QuestionAndAnswerForm :data="shippingAndPayment" />
    </ContentContainer>
  </DefaultContainer>
</template>

<style scoped lang="scss">
h3 {
  padding-top:1.5rem;
}
</style>
