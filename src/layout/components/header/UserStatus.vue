<template>
  <div class="user-status">
    <div class="user-avatar" :class="{ 'notice-dot': hasDot }" v-if="!isHiddenAvatar">
      <van-image
        round
        width="0.8rem"
        height="0.8rem"
        fit="cover"
        position="center"
        :src="userStatusInfo.avatar"
        style="display: block"
        @click="$emit('showSetting')"
      />
    </div>
    <div class="user-status-info" @click="$emit('setOnlineStatus')">
      <div class="user-nickname">{{ autoFix(userStatusInfo.nickname || '_') }}</div>
      <div class="user-online-status"
        ><div
          class="status-dot"
          :style="{ backgroundColor: UserStatusText[userStatusInfo.status]['color'] }"
        ></div>
        {{ UserStatusText[userStatusInfo.status]['text'] }}</div
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useTextOverFlow from '@/hooks/component/useTextOverFlow';
  import { UserStatusEnum } from '@/constants/enums/userEnum';
  import { UserStatusText } from '@/constants/modules/user';
  import { type PropType, computed } from 'vue';
  import { useUserStore } from '@/stores';

  const userStore = useUserStore();

  const userStatusInfo = computed(() => {
    if (props.isShowSelf) {
      const { userStatus } = userStore.$state;
      return {
        nickname: userStore.getUserInfo?.nickName,
        avatar: userStore.getUserInfo?.avatar,
        status: userStatus,
      };
    } else {
      return props.userStatus;
    }
  });

  const props = defineProps({
    hasDot: {
      type: Boolean,
      default: false,
    },
    isHiddenAvatar: {
      type: Boolean,
      default: false,
    },
    userStatus: {
      type: Object as PropType<UserStatusInfo>,
      default: () => ({
        nickname: '_',
        status: UserStatusEnum.ONLINE,
      }),
    },
    isShowSelf: {
      type: Boolean,
      default: true,
    },
  });

  defineEmits(['showSetting', 'setOnlineStatus']);

  const { autoFix } = useTextOverFlow(6);
</script>

<style lang="less" scoped>
  .user-status {
    display: flex;
    height: 1.2rem;
    align-items: center;
    transition: all 0.5s;
    .user-avatar {
      padding: 2px;
      background-color: #fff;
      border-radius: 50%;
      &.notice-dot::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        background-color: #f74c32;
      }
    }
    .user-status-info {
      margin-left: 6px;
      color: #fff;
      .user-nickname {
        font-size: var(--van-font-size-md);
        height: auto;
      }
      .user-online-status {
        display: flex;
        align-items: center;

        font-size: var(--van-font-size-xs);
        line-height: var(--van-line-height-xs);
      }
      .status-dot {
        height: var(--van-font-size-xs);
        width: var(--van-font-size-xs);
        background-color: #aaa;
        border-radius: 50%;
        margin: 0 4px;
      }
    }
  }
</style>
