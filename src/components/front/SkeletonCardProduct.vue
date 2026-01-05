<script lang="ts" setup>

</script>
<template>
  <ElSkeleton animated loading class="skeleton-wrapper">
    <template #template>
      <ElSkeletonItem variant="image" class=skeleton-image />
      <div class="text-wrapper">
        <el-skeleton-item variant="text" class="skeleton-text"/>
        <el-skeleton-item variant="text" class="skeleton-text"/>
      </div>
    </template>
  </ElSkeleton>
</template>
<style lang="scss" scoped>
.skeleton-wrapper {
  width:100%;

  .skeleton-image {
    width: 100%;
    height: auto;
    aspect-ratio: 1/0.8;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 5px;

    .skeleton-text:nth-child(1) {
      width: 50%;
    }

    .skeleton-text:nth-child(2) {
      width: 20%;
    }
  }
}

@media (min-width: $breakpoint-tablet) {
  .skeleton-image {
    aspect-ratio: 1/0.8;
    min-height: 100px;
    max-height: 250px;
  }
}

@media (min-width: $breakpoint-desktop) {
  .skeleton-image {
    min-height: 150px;
    max-height: 350px;
  }
}

</style>