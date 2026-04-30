declare interface ContactListItem extends ContactListItemRes {
  isHidden: boolean;
  // isUnread: boolean;
  isSetTop: boolean;
  unreadTotal: number;
  lastMsg?: LastChatRecord;
  orderNo?: number;
  contactName: string;
}
