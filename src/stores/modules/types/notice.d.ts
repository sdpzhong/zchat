declare interface chatRecordResItem {
  chatId: number;
  contactId: number;
  msgType: number;
  status: number;
  msgId: number;
  senderId: string;
  receiverId: string;
  content: string;
  type: number;
  updatedAt: string;
  createdAt: string;
  user: UserSimpleInfo;
}

declare interface ChatRoomTypes {
  chatId: number;
  type: number;
  chatRoomName: string;
  contactId: number;
  userStatus: number;
  isOnline: boolean;
  [x: string]: any;
}

declare interface LastChatRecord {
  msgId: number;
  senderId: string;
  receiverId: string;
  chatId: number;
  msgType: number;
  content: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

declare type listenerCb<T = any> = (res?: WSMsgType<T>) => void;
