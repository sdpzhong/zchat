/*
 * @Author: zq
 * @Date: 2023-01-12 16:15:33
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-13 16:28:02
 */

import type { ErrorMessageMode } from '#/axios';
import { http } from '../config';

enum Api {
  APPLY = '/chat/apply',
  APPLY_PASS = '/chat/apply/pass',
  CONTACTS = '/chat/contacts',
  RECORD = '/chat/record',
  CONTACT_GROUPS = '/chat/contact-groups',
  UNREAD_RECORD = '/chat/unread-record',
  CONTACT_INFO = '/chat/contact-info',
  CHAT_ROOM_INFO = '/chat/chat-room',
  ALL_CONTACTS = '/chat/contact/list',
  ONLINE_CONTACT = '/chat/contact/online',
}

/**
 * @description: sendNewApplication
 */
export function sendNewApplication(data: ApplyForm, mode: ErrorMessageMode = 'notify') {
  return http.post<any>(
    {
      url: Api.APPLY,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: passApplication
 */
export function passApplication(data: { id: number }, mode: ErrorMessageMode = 'notify') {
  return http.post<any>(
    {
      url: Api.APPLY_PASS,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getContacts
 */
export function getContacts(params = {}, mode: ErrorMessageMode = 'notify') {
  return http.get<ContactItem[]>(
    {
      url: Api.CONTACTS,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: get chat record
 */
export function getChatRecord(data: ChatRecordForm, mode: ErrorMessageMode = 'notify') {
  return http.post<ChatRecordResponse>(
    {
      url: Api.RECORD,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: get contact groups
 */
export function getContactGroups(params = {}, mode: ErrorMessageMode = 'notify') {
  return http.get<ContactGroupItem[]>(
    {
      url: Api.CONTACT_GROUPS,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: get unread chat record
 */
export function getUnreadChatReocrd(params = {}, mode: ErrorMessageMode = 'notify') {
  return http.get<UnreadChatReocordRes>(
    {
      url: Api.UNREAD_RECORD,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: get unread chat record
 */
export function getContactInfo(data: { contactId: number }, mode: ErrorMessageMode = 'notify') {
  return http.post<ContactInfo>(
    {
      url: Api.CONTACT_INFO,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: get unread chat record
 */
export function getChatRoomInfo(data: { chatId: number }, mode: ErrorMessageMode = 'notify') {
  return http.post<any>(
    {
      url: Api.CHAT_ROOM_INFO,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: get all contacts
 */
export function getAllContacts(params = {}, mode: ErrorMessageMode = 'notify') {
  return http.get<ContactListItemRes[]>(
    {
      url: Api.ALL_CONTACTS,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: get all online  contacts
 */
export function getOnlineContact(params = {}, mode: ErrorMessageMode = 'notify') {
  return http.get<number[]>(
    {
      url: Api.ONLINE_CONTACT,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
