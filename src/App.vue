<script setup>
import { reqLogin } from "./api/user"
import { onMounted } from "vue"

onMounted(() => {
  reqLogin({username: "ddhkxxhxx@hotmail.com", password:"dd310447"})
})
</script>

<template></template>

<style scoped lang="scss">

</style>
