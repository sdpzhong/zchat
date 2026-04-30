<template>
  <div class="chat-group">
    <van-collapse v-model="activeNames">
      <van-collapse-item name="1" icon="chat-o">
        <template #title>我管理的群聊</template>
        <van-cell border clickable v-for="item in 2" :key="item">
          <template #title>
            <div class="left-container">
              <van-image
                round
                width="1.2rem"
                height="1.2rem"
                fit="cover"
                :src="AvatarImage"
                class="chat-group-avatar"
              />
              <div class="chat-group-simple-info">
                <div class="chat-group-nickname">{{ `薅羊毛(${item})群` }}</div>
                <div class="new-msg">{{ '阿迪鞋打骨折贱卖!!' }}</div>
              </div>
            </div>
          </template>
        </van-cell>
      </van-collapse-item>
      <van-collapse-item name="2" icon="chat-o">
        <template #title>我加入的群聊</template>
        <van-cell border clickable v-for="item in 4" :key="item">
          <template #title>
            <div class="left-container">
              <van-image
                round
                width="1.2rem"
                height="1.2rem"
                fit="cover"
                src="https://unpkg.com/@vant/assets/ipad.jpeg"
                class="chat-group-avatar"
              />
              <div class="chat-group-simple-info">
                <div class="chat-group-nickname">{{ `lol开黑(${item})群` }}</div>
                <div class="new-msg">{{ '五排缺人,快来!' }}</div>
              </div>
            </div>
          </template>
          <!-- <template #value> 离线 </template> -->
        </van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-empty v-if="false" image-size="70" description="您还没有加入任何群聊" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import AvatarImage from '@/assets/images/avatar.jpg';

  const activeNames = ref(['1']);
</script>

<style lang="less" scoped>
  .text-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .chat-group {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 1.3333rem;
  }

  .left-container {
    display: flex;
    align-items: center;
    .chat-group-avatar {
      // display: block;
      padding: 2px;
      flex-shrink: 0;
      // box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
    }

    .chat-group-simple-info {
      flex: 1;
      height: 100%;
      margin-left: 6px;
      overflow: hidden;
      .chat-group-nickname {
        font-size: var(--van-font-size-lg);
        color: #222;
        font-weight: 500;
        .text-overflow();
      }
      .new-msg {
        font-size: var(--van-font-size-sm);
        color: #999;
        .text-overflow();
      }
    }
  }

  :deep(.van-collapse-item__content) {
    padding: 0;
  }

  :deep(.van-cell__value) {
    flex: none;
    margin-left: 10px;
  }

  :deep(.van-cell__title) {
    overflow: hidden;
  }
</style>
