<template>
  <div class="copyright-info" :style="style"> Copyright © 2021-2022 xx All Rights Reserved. </div>
</template>

<script lang="ts" setup>
  import type { StyleValue, PropType } from 'vue';

  defineProps({
    style: {
      type: Object as PropType<StyleValue>,
      default: () => {},
    },
  });
</script>

<style lang="less" scoped>
  .copyright-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: end;
    flex-shrink: 1;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 12px;
    color: #fff;
  }
</style>
