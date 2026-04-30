<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition :name="transitionName">
        <keep-alive :include="cacheList">
          <component class="router-view" :name="route.name" :is="Component" :key="route.fullPath" />
        </keep-alive>
        <!-- <component v-else :is="Component" :key="route.fullPath" /> -->
      </transition>
    </template>
  </RouterView>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { onBeforeRouteUpdate } from 'vue-router';
  import { useRouteCacheStore } from '@/stores/modules/routeCache';

  const routeCacheStore = useRouteCacheStore();

  const cacheList = routeCacheStore.getCacheList;

  const transitionName = ref('slide-right');

  onBeforeRouteUpdate((to, from) => {
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    // 切换动画
    transitionName.value = toDepth < fromDepth ? 'slide-right' : 'slide-left';
  });
</script>

<style lang="less" scoped>
  .router-view {
    height: 100%;
    transition: all 0.377s ease;
    will-change: transform opacity;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .slide-left-enter-from,
  .slide-right-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-to,
  .slide-right-enter-from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>
