/*
 * @Author: zq
 * @Date: 2023-02-13 15:14:53
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-14 09:43:08
 * @Desc: 全局维护的全局联系人列表
 */
import { getAllContacts, getOnlineContact, getUnreadChatReocrd } from '@/api/modules/chat';
import { CACHE_KEYS } from '@/constants/enums/cacheKeysEnum';
import { createLocalStorage } from '@/utils/cache';
import { defineStore } from 'pinia';

const cacheStorage = createLocalStorage({});

export interface ContactState {
  contactList: ContactListItem[];
}

export const useContactStore = defineStore({
  id: 'app-contact',
  state: (): ContactState => ({
    contactList: cacheStorage.get(CACHE_KEYS.CONTACT_LIST) || [],
  }),
  getters: {
    pubilcChatGroup(): ContactListItem[] {
      return this.contactList.filter((v) => v.type === 1);
    },
    privateContacts(): ContactListItem[] {
      return this.contactList.filter((v) => v.type === 0);
    },
    getContactList(): ContactListItem[] {
      return this.contactList.filter((v) => !v.isHidden);
    },
  },
  actions: {
    //同步列表数据
    async syncContactListFromServer() {
      try {
        const record = await getAllContacts();

        record.forEach((item) => {
          let oldRecord = this.contactList.find((v) => v.contactId === item.contactId);
          const contactName = item.user.nickName || item.user.accountName || '';
          console.log(oldRecord);
          if (oldRecord) {
            oldRecord = {
              ...oldRecord,
              ...item,
              contactName,
            };
          } else {
            this.contactList.push({
              ...item,
              isHidden: false,
              isSetTop: false,
              unreadTotal: 0,
              contactName,
            });
          }
        });

        this.syncUnreadChatRecord();

        this.refreshContactStatus();

        this.setContactListCache();
      } catch (error) {
        console.log(error);
      }
    },
    // 同步离线消息
    async syncUnreadChatRecord() {
      try {
        const { record, total } = await getUnreadChatReocrd();
        console.log(record, total);
        record.forEach((item) => {
          const index = this.contactList.findIndex((v) => v.contactId === item.contact.contactId);

          if (index !== -1) {
            const contactItem = this.contactList[index];
            contactItem.lastMsg = item.lastMsg;
            contactItem.isHidden = false;

            const temp = this.contactList[0];
            this.contactList[0] = contactItem;
            this.contactList[index] = temp;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    // 更新未读信息
    updateChatRecord(chatId: number, lastMsg: LastChatRecord, isUnread = true) {
      const updateItem = this.contactList.find((v) => v.chatId === chatId);
      if (updateItem) {
        updateItem.lastMsg = lastMsg;
        isUnread && updateItem.unreadTotal++;
        updateItem.isHidden = false;
      }
      // console.log('new msg:', this.contactList, lastMsg);
      this.setContactListCache();
    },
    // 同步在线人员状态
    async refreshContactStatus() {
      try {
        const contactIds = await getOnlineContact();
        this.contactList.forEach((item) => {
          item.isOnline = contactIds.includes(item.contactId);
        });
        this.setContactListCache();
      } catch (error) {
        console.log(error);
      }
    },
    // 置顶
    setContactTop(contactId: number, isSetTop: boolean) {
      const removeItem = this.contactList.find((item) => (item.contactId = contactId));
      if (removeItem) {
        removeItem.isSetTop = isSetTop;
      }
      this.setContactListCache();
    },
    // 移除某一条未读记录显示
    removeUnreadStatus(contactId: number) {
      const removeItem = this.contactList.find((item) => (item.contactId = contactId));
      if (removeItem) {
        removeItem.unreadTotal = 0;
      }
      this.setContactListCache();
    },
    removeAllContacts() {
      // 初次登录时，重置列表，避免切换账号后数据不统一
      this.contactList = [];
      this.setContactListCache();
    },
    setContactListCache() {
      cacheStorage.set(CACHE_KEYS.CONTACT_LIST, this.contactList);
    },
    updateContactHiddenStatus(contactId: number, isHidden: boolean) {
      const removeItem = this.contactList.find((v) => v.contactId === contactId);
      if (removeItem) {
        removeItem.isHidden = isHidden;
      }
      this.setContactListCache();
    },
  },
});
