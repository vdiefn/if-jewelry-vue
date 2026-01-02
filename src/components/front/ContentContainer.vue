<script lang="ts" setup>

</script>
<template>
<div class="content">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.content {
  margin: 0 auto;
}

@media (min-width: $breakpoint-tablet) {
  .content {
    max-width: 650px;
  }
}

@media (min-width: $breakpoint-desktop) {
  .content {
    max-width: 900px;
  }
}
</style>