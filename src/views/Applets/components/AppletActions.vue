<template>
  <van-action-sheet
    v-model:show="show"
    :actions="actions"
    cancel-text="取消"
    close-on-click-action
    @cancel="onCancel"
  />
  <!-- <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" /> -->
</template>

<script lang="ts" setup>
  import { showToast } from 'vant';
  import { ref } from 'vue';

  const show = ref(false);
  const actions = [{ name: '选项一' }, { name: '' }, { name: '选项三' }];
  const onCancel = () => showToast('取消');
</script>

<style lang="" scoped></style>
