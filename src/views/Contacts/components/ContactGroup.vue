<template>
  <div class="contact-group">
    <van-cell :border="false" clickable is-link icon="setting-o" title="分组管理" />
    <van-collapse v-model="activeItems">
      <van-collapse-item
        v-for="item of contactGroups"
        :key="item.groupId"
        :name="item.groupId"
        icon="friends-o"
      >
        <template #title>{{ item.groupName }}</template>
        <template #value>{{ `${item.onlineTotal}/${item.contacts.length}` }}</template>
        <van-cell
          border
          clickable
          v-for="contact of item.contacts"
          :key="contact.chatId"
          @click="handleChat(contact)"
        >
          <template #title>
            <div class="left-container">
              <van-image
                round
                width="1.2rem"
                height="1.2rem"
                fit="cover"
                :src="contact.user.avatar"
                class="user-avatar"
                :class="{ 'deactive-status': !contact.isOnline }"
              />
              <div class="user-simple-info">
                <div class="user-nickname">{{ contact.user.nickName }}</div>
                <div class="new-msg">{{
                  `[${contact.isOnline ? '在线' : '离线'}]` + ` ${contact.user.sign}`
                }}</div>
              </div>
            </div>
          </template>
          <!-- <template #value> VIP3 </template> -->
        </van-cell>
      </van-collapse-item>
      <!-- <van-collapse-item name="2" icon="friends-o">
        <template #title>朋友</template>
        <template #value>4/18</template>
        <van-cell border clickable v-for="item in 2" :key="item">
          <template #title>
            <div class="left-container">
              <van-image
                round
                width="1.2rem"
                height="1.2rem"
                fit="cover"
                :src="AvatarImage"
                class="user-avatar deactive-status"
              />
              <div class="user-simple-info">
                <div class="user-nickname">{{ '陌上花开' }}</div>
                <div class="new-msg">{{ '[离线] 长路漫漫, 唯剑作伴' }}</div>
              </div>
            </div>
          </template>
          <template #value> 离线 </template>
        </van-cell>
      </van-collapse-item>
      <van-collapse-item name="3" icon="friends-o">
        <template #title>家人</template>
        <template #value>6/8</template>
        <van-empty image-size="70" description="该分组为空" />
      </van-collapse-item> -->
    </van-collapse>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  // import AvatarImage from '@/assets/images/avatar.jpg';
  import { getContactGroups } from '@/api/modules/chat';
  import { useNoticeStore } from '@/stores';
  import { useRouter } from 'vue-router';

  const noticeStore = useNoticeStore();
  const router = useRouter();

  const activeItems = ref([]);
  const contactGroups = ref<ContactGroupItem[]>([]);

  async function requestContactGroups() {
    try {
      const res = await getContactGroups();
      contactGroups.value = res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  requestContactGroups();

  const handleChat = ({ chatId, type, contactId, isOnline, user }: ContactItem) => {
    noticeStore.setMsgListenerConfig({
      chatId,
      type,
      contactId,
      chatRoomName: user.nickName || user.accountName || '',
      userStatus: 0,
      isOnline,
    });
    router.push('/home/private');
  };

  defineExpose({
    refreshRecord: requestContactGroups,
  });
</script>

<style lang="less" scoped>
  .text-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .contact-group {
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
