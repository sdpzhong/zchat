<template>
  <Icon
    class="v-icon"
    :icon="icon"
    :style="style"
    :height="height"
    :width="width"
    :rotate="rotate"
    :color="color"
    @on-load="onLoad"
  />
</template>

<script lang="ts" setup name="VIcon">
  import { Icon } from '@iconify/vue';
  import type { StyleValue, PropType } from 'vue';

  defineProps({
    icon: {
      type: String,
      default: '',
    },
    style: {
      type: Object as PropType<StyleValue>,
      default: () => ({}),
    },
    height: [String, Number],
    width: [String, Number],
    rotate: Number,
    color: String,
  });

  const onLoad = (p, c) => console.log(p, c);
</script>

<style lang="less" scoped>
  .v-icon {
    vertical-align: -10%;
  }
</style>
