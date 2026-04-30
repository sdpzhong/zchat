import type { SERVER_EVENTS } from './setting';

export interface WSMsgType<T = any> {
  event: SERVER_EVENTS | string;
  data: T;
  time?: string;
  status?: number;
  meta?: object;
}
