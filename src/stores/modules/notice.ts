/*
 * @Author: zq
 * @Date: 2023-02-04 09:50:13
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-14 09:23:21
 * @Desc: 接收并处理实时消息 & 未读 & 通知消息
 */
import { defineStore } from 'pinia';
import { ChatRoomTypeEnum } from '@/constants/enums/chatEnum';
import { CACHE_KEYS } from '@/constants/enums/cacheKeysEnum';
import { createLocalStorage } from '@/utils/cache';
import type { WSMsgType } from '@/events/ws';
import { useUserStore } from './user';
import { useContactStore } from './contact';
import { pickPropsFormObject } from '@/utils/picker';

const chatCacheStorage = createLocalStorage({});

export interface NoticeState {
  currentChatRoom: ChatRoomTypes;
  onMsgCallback: listenerCb;
  unreadChatReordCache: any[];
}

export const useNoticeStore = defineStore({
  id: 'app-notice',
  state: (): NoticeState => ({
    currentChatRoom: chatCacheStorage.get(CACHE_KEYS.CHAT_ROOM) || {
      chatId: 0,
      contactId: 0,
      type: ChatRoomTypeEnum.PRIVATE,
      chatRoomName: '',
    },
    onMsgCallback: () => {},
    unreadChatReordCache: [],
  }),
  getters: {
    unreadRocordTotal(): number {
      return this.unreadChatReordCache.length;
    },
  },
  actions: {
    setMsgListener(callback: listenerCb) {
      this.onMsgCallback = callback;
    },
    handleOnlineChatRecord(res: WSMsgType<chatRecordResItem>) {
      const userStore = useUserStore();
      const contactStore = useContactStore();

      const chatRecordData = pickPropsFormObject(res.data, [
        'msgId',
        'senderId',
        'receiverId',
        'chatId',
        'msgType',
        'content',
        'status',
        'createdAt',
        'updatedAt',
      ]);

      if (res.data?.chatId === this.currentChatRoom.chatId) {
        contactStore.updateChatRecord(res.data.chatId, chatRecordData, false);
        this.onMsgCallback(res);
      } else {
        // 非当前房间的实时消息会收录到未读消息仓库中
        this.unreadChatReordCache.push(res.data);
        // 生成会话记录
        if (userStore.getUserInfo?.uid !== res.data?.senderId) {
          contactStore.updateChatRecord(res.data.chatId, chatRecordData, true);
        }
      }
    },
    clearMsgListener() {
      this.currentChatRoom.value = {
        chatId: 0,
        type: ChatRoomTypeEnum.PRIVATE,
        contactId: 0,
        chatRoomName: '',
      };
      this.onMsgCallback = () => {};
      chatCacheStorage.set(CACHE_KEYS.CHAT_ROOM, {
        chatId: 0,
        type: ChatRoomTypeEnum.PRIVATE,
        contactId: 0,
        chatRoomName: '',
      });
    },
    setMsgListenerConfig(chatRoomInfo: ChatRoomTypes) {
      const contactStore = useContactStore();
      this.currentChatRoom = chatRoomInfo;
      contactStore.updateContactHiddenStatus(chatRoomInfo.contactId, false);
      chatCacheStorage.set(CACHE_KEYS.CHAT_ROOM, chatRoomInfo);
    },
  },
});
