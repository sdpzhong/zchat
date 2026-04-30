/*
 * @Author: zq
 * @Date: 2022-12-02 10:31:22
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-11 11:34:02
 */

import dayjs from 'dayjs';
import { SERVER_EVENTS, WS_CONFIG } from './setting';

export class HeartCheck {
  static readonly timeout = WS_CONFIG.PING_TIME;
  static timer: any = null;

  static createHeartMsg(): string {
    return JSON.stringify({
      event: SERVER_EVENTS.PING,
      data: 'heart check',
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
  }

  start(isConnected?: boolean, heartCheckCb?: Function) {
    clearInterval(HeartCheck.timer);
    HeartCheck.timer = setInterval(() => {
      if (isConnected) {
        heartCheckCb?.();
      } else {
        this.clear();
      }
    }, HeartCheck.timeout);
  }

  reset() {
    clearInterval(HeartCheck.timer);
    this.start();
  }

  clear() {
    clearInterval(HeartCheck.timer);
  }
}
