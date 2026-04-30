<template>
  <div class="not-found">
    <layout-header title="404" />
    <van-empty description="抱歉，当前页面不存在！">
      <van-button round type="primary" class="bottom-button" to="/">返回首页</van-button>
    </van-empty>
    <div class="bottom-copyright">
      <copyright :style="{ color: '#aaa' }" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LayoutHeader from '@/layout/components/header/index.vue';
  import copyright from '@/layout/components/copyright/index.vue';
</script>

<style lang="less" scoped>
  .not-found {
    height: 100%;
    display: flex;
    flex-direction: column;
    .bottom-button {
      width: 160px;
      height: 40px;
    }
    .bottom-copyright {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: end;
    }
  }
</style>
