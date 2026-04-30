<template>
  <div class="home-view" id="scroll_home_view">
    <!-- home page header -->
    <home-page-header />
    <!--  notice bar  -->
    <van-notice-bar mode="closeable">xxx 新功能已经推出！</van-notice-bar>
    <!-- search componet  -->
    <van-search
      input-align="center"
      placeholder="搜索"
      readonly
      shape="round"
      @click-input="$router.push('/user-search')"
    />
    <!-- down refresh with chatlist-->
    <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
      <!-- <template #loosing> </template> -->
      <van-list
        v-model:loading="isLoading"
        v-model:error="isError"
        :finished="isFinished"
        finished-text="已经到底了 T_T"
        error-text="加载失败，请点击重试"
        @load="onLoad"
        class="chat-list"
      >
        <van-swipe-cell v-for="item in chatList" :key="item" :title="item">
          <template #right>
            <van-button class="right-actions-btn" square type="warning" text="置顶" />
            <van-button class="right-actions-btn" square type="danger" text="删除" />
          </template>
          <van-cell border clickable size="large" :to="`/home/private?chatId=${item}&type=0`">
            <template #title>
              <div class="left-container">
                <van-image
                  round
                  width="1.2rem"
                  height="1.2rem"
                  fit="cover"
                  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                  class="user-avatar"
                />
                <div class="user-simple-info">
                  <div class="user-nickname">{{ '吴彦祖' }}</div>
                  <div class="new-msg">{{ '[离线] 你食饭了没有啊？' }}</div>
                </div>
              </div>
            </template>
            <template #value>
              <span class="date-info">
                {{ getCalendarDate() }}
              </span>
            </template>
          </van-cell>
        </van-swipe-cell>
      </van-list>
      <van-empty v-if="isEmpty" description="暂时没有新消息" />
    </van-pull-refresh>
    <v-back-top target="#scroll_home_view" />
  </div>
</template>

<script lang="ts" setup name="HomePage">
  import { ref } from 'vue';
  import { getCalendarDate } from '@/utils/calendarDate';
  import HomePageHeader from './components/HomePageHeader.vue';

  const chatList = ref<any[]>([]);
  const isLoading = ref(false);
  const isFinished = ref(false);
  const isError = ref(false);
  const isEmpty = ref(false);
  const refreshing = ref(false);

  const onLoad = () => {
    setTimeout(() => {
      if (refreshing.value) {
        chatList.value = [];
        refreshing.value = false;
      }

      for (let i = 0; i < 15; i++) {
        chatList.value.push(chatList.value.length + 1);
      }
      isLoading.value = false;

      if (chatList.value.length >= 60) {
        isFinished.value = true;
      }
    }, 1000);
  };

  const onRefresh = () => {
    // 清空列表数据
    isFinished.value = false;
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    isLoading.value = true;
    onLoad();
  };
</script>

<style lang="less" scoped>
  .text-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .home-view {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 50px;
    overflow: auto;

    .chat-list {
      :deep(.van-cell__value) {
        flex: none;
        margin-left: 10px;
      }
      :deep(.van-cell__title) {
        overflow: hidden;
      }
    }

    .left-container {
      display: flex;
      align-items: center;
      .user-avatar {
        // display: block;
        padding: 2px;
        flex-shrink: 0;
      }

      .user-simple-info {
        flex: 1;
        height: 100%;
        margin-left: 6px;
        overflow: hidden;
        .user-nickname {
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

    .right-actions-btn {
      height: 100%;
    }

    .date-info {
      font-size: var(--van-font-size-sm);
      color: #ccc;
    }

    .deactive-status {
      -webkit-filter: grayscale(80%);
      filter: grayscale(80%);
    }
  }
</style>
