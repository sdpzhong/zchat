<template>
  <div class="applets-grid">
    <van-grid border square clickable :gutter="10">
      <van-grid-item class="custom_grid" v-long-press="{ longPressCb }" @click="handleClick">
        <van-image src="https://unpkg.com/@vant/assets/apple-1.jpeg" />
      </van-grid-item>
      <van-grid-item class="custom_grid" v-long-press="{ longPressCb }">
        <van-image src="https://unpkg.com/@vant/assets/custom-icon-light.png" />
      </van-grid-item>
      <van-grid-item class="custom_grid" v-long-press="{ longPressCb }">
        <van-image src="https://unpkg.com/@vant/assets/custom-icon-water.png" />
      </van-grid-item>
      <van-grid-item class="custom_grid" v-long-press="{ longPressCb }">
        <van-image src="https://unpkg.com/@vant/assets/custom-icon-fire.png" />
      </van-grid-item>
      <van-grid-item class="custom_grid" v-long-press="{ longPressCb }">
        <van-image src="https://unpkg.com/@vant/assets/custom-icon-fire.png" />
      </van-grid-item>
      <van-grid-item class="custom_grid" v-long-press="{ longPressCb }">
        <van-image src="https://unpkg.com/@vant/assets/custom-icon-fire.png" />
      </van-grid-item>
      <van-grid-item icon="plus" />
    </van-grid>

    <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" />
  </div>
</template>

<script lang="ts" setup>
  import { showToast } from 'vant';
  import { ref } from 'vue';

  const longPressCb = () => {
    // showToast('长按事件触发!');
    showShare.value = true;
  };

  const handleClick = () => {
    showToast('点击事件触发');
  };

  const showShare = ref(false);
  const options = [
    [
      { name: '微信', icon: 'wechat' },
      { name: '朋友圈', icon: 'wechat-moments' },
      { name: '微博', icon: 'weibo' },
      { name: 'QQ', icon: 'qq' },
    ],
    [
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
      { name: '小程序码', icon: 'weapp-qrcode' },
    ],
  ];
</script>

<style lang="less" scoped>
  .applets-grid {
    margin-top: 0.2703rem;
    padding-bottom: 1.3333rem;
    :deep(.van-grid-item__content) {
      border-radius: 15px;
      // box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.04);
      border: 1px solid #eee;
      padding: 15px;
    }
  }

  :deep(.van-share-sheet__options) {
    justify-content: center;
  }
</style>
