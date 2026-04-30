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
      <van-swipe-cell
        v-for="item in chatRecordList"
        v-show="!item.isHidden"
        :key="item.chatId"
        :name="item.chatId"
      >
        <template #right>
          <van-button
            class="right-actions-btn"
            square
            type="warning"
            :text="item.isSetTop ? '取消置顶' : '置顶'"
            @click="handleSetTop(item)"
          />
          <van-button
            class="right-actions-btn"
            square
            type="danger"
            text="删除"
            @click="handleRemoveReocord(item.contactId)"
          />
        </template>
        <van-cell border clickable size="large" @click="handleChat(item)">
          <template #title>
            <div class="left-container">
              <van-image
                round
                width="1.2rem"
                height="1.2rem"
                fit="cover"
                :src="item.type === 0 ? item.user.avatar : item.chatRoom.chatAvatar"
                class="user-avatar"
                :class="{ 'deactive-status': !item.isOnline }"
              />
              <div class="user-simple-info">
                <div class="user-nickname">{{
                  (item.type === 0 ? item.user.nickName : item.chatRoom.chatName) || ''
                }}</div>
                <div class="new-msg">
                  <span v-if="item.type === 0">
                    {{ `[${item.isOnline ? '在线' : '离线'}]` }}
                  </span>
                  <span v-if="item.type === 1"> [{{ item.user.nickName }}] </span>
                  {{ item.lastMsg?.content || '' }}</div
                >
              </div>
            </div>
          </template>
          <template #value>
            <span class="date-info">
              {{ item.lastMsg?.createdAt ? getCalendarDate(item.lastMsg?.createdAt) : '' }}
            </span>
          </template>
        </van-cell>
      </van-swipe-cell>
      <van-empty v-if="isEmpty" description="暂时没有新消息" />
    </van-pull-refresh>
    <v-back-top target="#scroll_home_view" />
  </div>
</template>

<script lang="ts" setup name="HomePage">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { getCalendarDate } from '@/utils/calendarDate';
  import HomePageHeader from './components/HomePageHeader.vue';
  import { useNoticeStore, useContactStore } from '@/stores';

  const noticeStore = useNoticeStore();
  const contactStore = useContactStore();
  const router = useRouter();

  const chatRecordList = computed(() => contactStore.contactList);
  // const isError = ref(false);
  const isEmpty = computed(() => !chatRecordList.value.filter((v) => !v.isHidden).length);
  const refreshing = ref(false);

  const onRefresh = async () => {
    // 重新加载数据
    try {
      refreshing.value = true;

      await contactStore.syncContactListFromServer();
    } catch (error) {
      console.log(error);
    } finally {
      refreshing.value = false;
    }
  };

  const handleChat = ({
    chatId,
    type,
    contactId,
    user: { nickName },
    chatRoom: { chatName },
    isOnline,
  }: ContactListItem) => {
    noticeStore.setMsgListenerConfig({
      chatId,
      type,
      chatRoomName: type === 0 ? nickName : chatName,
      userStatus: 0,
      isOnline,
      contactId,
    });
    router.push('/home/private');
  };

  const handleSetTop = (item: ContactListItem) => {
    contactStore.setContactTop(item.contactId, !item.isSetTop);
    return false;
  };

  const handleRemoveReocord = (contactId: number) => {
    contactStore.updateContactHiddenStatus(contactId, true);
    return false;
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
