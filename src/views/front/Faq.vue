<script setup lang="ts">
import { faqs } from "@/data/faqs.ts";
import { QuestionAndAnswerForm, DefaultContainer, ContentContainer } from "@/components/front";
</script>

<template>
  <DefaultContainer>
    <ContentContainer>
      <h3>常見問題</h3>
      <QuestionAndAnswerForm :data="faqs" />
    </ContentContainer>
  </DefaultContainer>
</template>

<style scoped lang="scss">
h3 {
  padding-top:1.5rem;
}
</style>
