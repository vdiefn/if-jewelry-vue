<script setup>
import { ref } from 'vue';

</script>

<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.container {
    margin-top: $base-header-height;
}
</style>
