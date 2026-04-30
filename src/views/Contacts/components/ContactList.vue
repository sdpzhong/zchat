<template>
  <div class="contact-list">
    <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
    <van-index-bar :sticky="false" :index-list="indexList">
      <template v-for="item of contectIndexGroupRecord" :key="item">
        <van-index-anchor v-if="item.data.length" :index="item.letter" />
        <!-- <van-cell v-for="itemText of 6" :title="`${item}-${itemText}`" :key="itemText" /> -->
        <van-cell
          border
          clickable
          :key="contactItem.contactId"
          v-for="contactItem in item.data"
          @click="handleChat(contactItem)"
        >
          <template #title>
            <div class="left-container">
              <van-image
                round
                width="1.2rem"
                height="1.2rem"
                fit="cover"
                :src="contactItem.user.avatar || AvatarImage"
                class="user-avatar"
                :class="{ 'deactive-status': !contactItem.isOnline }"
              />
              <div class="user-simple-info">
                <div class="user-nickname"
                  >{{ contactItem.contactName
                  }}{{ contactItem.remark ? `(${contactItem.remark})` : '' }}</div
                >
                <div class="new-msg">{{
                  `[${contactItem.isOnline ? '在线' : '离线'}]` + ` ${contactItem.user.sign}`
                }}</div>
              </div>
            </div>
          </template>
        </van-cell>
      </template>
    </van-index-bar>
    <!-- </van-pull-refresh> -->
    <van-empty v-if="isNoContact" image-size="70" description="真可怜, 您还没有一个好友" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import AvatarImage from '@/assets/images/avatar.jpg';
  import { indexGroup } from '@/utils/indexGroup';
  import { getContacts } from '@/api/modules/chat';
  import { useNoticeStore } from '@/stores';
  import { useRouter } from 'vue-router';

  const noticeStore = useNoticeStore();
  const router = useRouter();

  const contactList = ref<ContactItem[]>([]);
  const contectIndexGroupRecord = computed(() =>
    indexGroup(contactList!.value || [], 'contactName'),
  );
  const indexList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
  const isNoContact = ref(false);

  async function requestContactList() {
    try {
      contactList.value = await getContacts();
      contactList.value.forEach((v) => {
        v.contactName = v.user.nickName || v.user.accountName || '';
      });
      isNoContact.value = !contactList.value.length;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  requestContactList();

  const handleChat = ({ chatId, type, contactId, contactName, isOnline }: ContactItem) => {
    noticeStore.setMsgListenerConfig({
      chatId,
      type,
      contactId,
      chatRoomName: contactName,
      userStatus: 0,
      isOnline,
    });
    router.push('/home/private');
  };

  defineExpose({
    refreshRecord: requestContactList,
  });
</script>

<style lang="less" scoped>
  .text-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .contact-list {
    // background-color: #eee;
    padding-bottom: 1.3333rem;
  }

  .left-container {
    display: flex;
    align-items: center;
    .user-avatar {
      // display: block;
      padding: 2px;
      flex-shrink: 0;
      // box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
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

  .deactive-status {
    -webkit-filter: grayscale(80%);
    filter: grayscale(80%);
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
