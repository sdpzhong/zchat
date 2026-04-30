/*
 * @Author: zq
 * @Date: 2022-12-02 09:56:06
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-09 15:53:38
 * 创建 websocket服务
 */

import { HeartCheck } from './helper';
import { CLIENT_EVENTS, WS_CONFIG } from './setting';
import type { WSMsgType } from './type';
import dayjs from 'dayjs';
import { showDialog, showLoadingToast } from 'vant';
import type { ToastWrapperInstance } from 'vant/lib/toast/types';

export * from './type';
export * from './helper';
export * from './setting';

export interface WSConfig {
  url?: string;
  protocols?: string | string[];
}

export type onPublicMsgFuncType = (data: WSMsgType) => void;

export class WebSocketChannel {
  readonly heartCheck = new HeartCheck();
  private client: WebSocket | null = null;
  config: WSConfig = {
    url: WS_CONFIG.URL,
  };
  isConnected = false;
  private reconnectCount = 0;

  toast: ToastWrapperInstance | null = null;

  // 暴露给外部的消息事件回调
  onPublicMsgListener: onPublicMsgFuncType = () => {};

  get instance() {
    return this.client;
  }

  get readyState() {
    console.log(this.client?.readyState);
    return this.client?.readyState;
  }

  constructor(config: WSConfig = {}) {
    this.config = Object.assign(this.config, config);
  }

  initWebSocket() {
    // 销毁连接实例和事件监听
    this.destory();

    return new Promise<any>((resolve, reject) => {
      // 初始化 websocket 实例
      this.client = new WebSocket(this.config.url!, this.config.protocols);

      // 初始化事件监听
      this.client.onopen = (e) => {
        this.onWebSocketOpen(e);
        resolve('websocket conneted successfully!');
      };

      // this.client.addEventListener('message', this.onWebSocketMessage);

      this.client.onmessage = (e) => {
        const res = JSON.parse(e.data) as WSMsgType;
        this.onPublicMsgListener(res);
        if (res.event === CLIENT_EVENTS.CONNECT_SUCCESS) {
          console.log('====== normal connection! ======');
          this.toast?.close();
          this.toast && (this.toast = null);
          resolve('websocket conneted successfully!');
        }
      };

      this.client.onclose = (e) => {
        this.onWebSocketClose(e);
        reject(e);
      };

      this.client.onerror = (e) => {
        this.onWebSocketError(e);
        reject(e);
      };
    });
  }

  private onWebSocketOpen(_e: Event) {
    console.warn('websocket is connected!');
    this.isConnected = true;
    this.reconnectCount = 0;
    this.client?.send(HeartCheck.createHeartMsg());
    this.heartCheck.start(this.isConnected, () => {
      this.client?.send(HeartCheck.createHeartMsg());
    });
  }

  // private onWebSocketMessage(e: Event) {
  //   console.log('msg: ', e);
  // }

  private onWebSocketClose(e: CloseEvent) {
    console.log('close: ', e);
    this.heartCheck.clear();
    this.isConnected = false;

    //被动断开，重新连接
    if (e.code === 1006) {
      if (this.reconnectCount < WS_CONFIG.RECONNECT_COUNT) {
        setTimeout(() => {
          console.log('websocket reconnecting...', this.reconnectCount);
          if (!this.toast) {
            this.toast = showLoadingToast({
              duration: 0,
              forbidClick: true,
              message: '服务重连中...',
            });
          }
          this.reconnectCount++;
          this.toast.message = `服务重连中...${this.reconnectCount}`;

          this.initWebSocket();
        }, 2000);
      } else {
        // closeToast();
        this.toast?.close();
        showDialog({
          title: '服务连接异常',
          message: `服务连接失败了 T_T。请稍后刷新重试，或者联系网站管理员`,
          theme: 'round-button',
        });
        console.error('websocket is disconnected!!');
      }
    }
  }

  private onWebSocketError(e: Event) {
    this.heartCheck.clear();
    this.isConnected = false;
    console.log('websocket connect error:', e);
  }

  sendMsg(msg: WSMsgType) {
    msg.time ??= dayjs().format('YYYY-MM-DD HH:mm:ss');
    switch (this.client?.readyState) {
      //CONNECTING：值为0，表示正在连接。
      case WebSocket.CONNECTING:
        setTimeout(() => {
          this.sendMsg(msg);
        }, 1000);
        break;
      //OPEN：值为1，表示连接成功，可以通信了。
      case WebSocket.OPEN:
        this.client?.send(JSON.stringify(msg));
        break;
      //CLOSING：值为2，表示连接正在关闭。
      case WebSocket.CLOSING:
        setTimeout(() => {
          this.sendMsg(msg);
        }, 1000);
        break;
      //CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
      case WebSocket.CLOSED:
        // do something
        break;
      default:
        // this never happens
        break;
    }
  }

  close() {
    this.isConnected = false;
    this.reconnectCount = 0;
    this.client?.close();
    this.heartCheck?.clear();
    this.client = null;
  }

  destory() {
    if (this.client) {
      this.client.onclose = null;
      this.client.onerror = null;
      this.client.onmessage = null;
      this.client.onopen = null;
      this.client = null;
    }
  }
}
