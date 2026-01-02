<script setup lang="ts">
import { faqs } from "@/data/faqs.ts";
import { QuestionAndAnswerForm, ContentContainer } from "@/components/front";
</script>

<template>
  <ContentContainer>
    <div class="container">
      <h3>常見問題</h3>
      <QuestionAndAnswerForm :data="faqs" />
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
