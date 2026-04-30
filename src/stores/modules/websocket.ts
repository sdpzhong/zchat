import { defineStore } from 'pinia';
import { WebSocketChannel, CLIENT_EVENTS } from '@/events/ws';
import { useUserStore } from './user';
import { getAppEnvConfig } from '@/utils/env';
import { ref } from 'vue';

import { useNoticeStore } from './notice';

export interface chatRoomParams {
  chatId: number;
  type: number;
  contactId: number;
}

export const useWebSocketStore = defineStore('app-websocket', () => {
  const userStore = useUserStore();
  const noticeStore = useNoticeStore();

  const channel = ref<WebSocketChannel>();
  const { VITE_WS_URL } = getAppEnvConfig();

  function connectWebSocketService() {
    channel.value = new WebSocketChannel({
      url: VITE_WS_URL,
      protocols: [userStore.getToken],
    });

    if (channel.value) {
      channel.value.initWebSocket();
      channel.value.onPublicMsgListener = (res) => {
        if (res.event === CLIENT_EVENTS.RECEIVE_CHAT_MSG) {
          noticeStore.handleOnlineChatRecord(res);
        }
      };
    }
  }

  function closeWebSocketService() {
    channel.value?.close();
  }

  return {
    connectWebSocketService,
    channel,
    closeWebSocketService,
  };
});
