<template>
  <van-config-provider :theme="'light'" :theme-vars="THEME_VARS" class="config-provider">
    <router-view />
  </van-config-provider>
</template>

<script setup lang="ts">
  import { THEME_VARS } from '@/constants/modules/theme';
</script>

<style lang="less" scoped>
  .config-provider {
    height: 100%;
    width: 100%;
  }
</style>
