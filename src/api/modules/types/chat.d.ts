declare interface ApplyForm {
  friendUid: string;
  verifyMsg: string;
}

declare interface ChatRecordForm {
  chatId: number;
  current?: number;
  pageSize?: number;
}

declare interface ChatRecordItem {
  msgId: number;
  senderId: string;
  receiverId: string;
  chatId: number;
  msgType: number;
  content: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  isSelf: boolean;
  isEndTime: boolean;
  user: UserSimpleInfo;
  [x: string]: any;
}

declare interface ChatRecordResponse {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
  time: number;
  data: ChatRecordItem[];
}

declare interface ContactItem {
  chatId: number;
  contactId: number;
  contactName: string;
  createdAt: string;
  friendUid: string;
  groupId: number;
  remark: string;
  type: number;
  updatedAt: string;
  isOnline: boolean;
  user: UserInfoResponse;
}

declare interface ContactGroupItem {
  groupId: number;
  uid: string;
  groupName: string;
  groupOrder: number;
  type: number;
  createdAt: string;
  updatedAt: string;
  onlineTotal: number;
  contacts: ContactItem[];
}

declare interface UnreadChatRecordItem {
  unreadCount: number;
  user: UserSimpleInfo;
  lastMsg: LastChatRecord;
  contact: {
    contactId: number;
    uid: string;
    friendUid: string;
    groupId: number;
    chatId: number;
    remark: string;
    type: number;
    createdAt: string;
    updatedAt: string;
    isOnline: boolean;
  };
}

declare interface UnreadChatReocordRes {
  total: number;
  record: UnreadChatRecordItem[];
}

declare interface ContactInfo {
  contactId: number;
  uid: string;
  friendUid: string;
  groupId: number;
  chatId: number;
  remark: string;
  type: number;
  createdAt: string;
  updatedAt: string;
  user: UserSimpleInfo;
  chatRoom: ChatRoomType;
}

declare interface ChatRoomType {
  chatId: number;
  chatName: string;
  chatAvatar: string;
  owner: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

declare interface ContactListItemRes {
  contactId: number;
  uid: string;
  friendUid: string;
  groupId: number;
  chatId: number;
  remark: string;
  type: number;
  createdAt: string;
  updatedAt: string;
  chatRoom: ChatRoomType;
  user: UserSimpleInfo;
  isOnline: boolean;
}
