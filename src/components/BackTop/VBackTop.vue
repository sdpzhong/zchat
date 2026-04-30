<template>
  <div
    class="back-top"
    :class="{
      'btn-hidden': !isShow,
    }"
    :style="{ backgroundColor: color }"
  >
    <van-icon name="back-top" size="0.6757rem" class="inner-icon" @click="handleBackTop" />
  </div>
</template>

<script lang="ts" setup name="VBackTop">
  import { nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue';

  const props = defineProps({
    maxScrollTop: {
      type: Number,
      default: 1600,
    },
    target: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
  });

  const isShow = ref(false);

  const handleBackTop = async () => {
    const el = document.querySelector(props.target) as HTMLDivElement;
    // el.style['scrollBehavior'] = 'smooth';
    el && (el!.scrollTop = 0);
    // el.style['scrollBehavior'] = 'auto';
  };

  function scrollEventCallBack(e) {
    isShow.value = e.target.scrollTop > props.maxScrollTop;
  }

  onMounted(() => {
    const el = document.querySelector(props.target);
    el?.addEventListener('scroll', scrollEventCallBack);
  });

  onBeforeUnmount(() => {
    document.querySelector(props.target)?.removeEventListener('scroll', scrollEventCallBack);
  });

  onActivated(async () => {
    await nextTick();
    const el = document.querySelector(props.target) as HTMLDivElement;
    el && (el.style['scrollBehavior'] = 'smooth');
  });

  onDeactivated(() => {
    const el = document.querySelector(props.target) as HTMLDivElement;
    el && (el.style['scrollBehavior'] = 'auto');
  });
</script>

<style lang="less" scoped>
  .back-top {
    width: 1.3rem;
    height: 1.3rem;
    position: fixed;
    bottom: 2rem;
    right: 1rem;
    color: #fff;
    background-color: var(--theme-primary-color);
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    opacity: 1;
    transition: 0.5s;
    z-index: 100;
    cursor: pointer;
    .inner-icon {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .btn-hidden {
    opacity: 0;
    transform: scale(0);
  }
</style>
