import { getUserInfo, userLogin } from '@/api/modules/user';
import { defineStore } from 'pinia';
import { router } from '@/router';
import { getCacheToken, setCacheToken } from '../auth';
import { PageEnum } from '@/constants/enums/pageEnum';
import { useWebSocketStore } from './websocket';
import { useContactStore } from './contact';

export interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  refreshToken?: string;
  userStatus: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    refreshToken: undefined,
    userStatus: 0,
  }),
  getters: {
    getUserInfo(): Nullable<UserInfo> {
      return this.userInfo;
    },
    getToken(): string {
      if (!this.token) {
        this.token = getCacheToken();
      }
      return this.token || '';
    },
  },
  actions: {
    async login(submitForm: UserLoginForm): Promise<UserInfo | null> {
      try {
        const contactStore = useContactStore();
        const websocketStore = useWebSocketStore();

        const { token } = await userLogin(submitForm);
        this.setToken(token);
        // 初始化websocket
        websocketStore.connectWebSocketService();
        // 同步联系人列表
        contactStore.syncContactListFromServer();

        setTimeout(() => {
          router.push('/');
        }, 600);
        return this.refreshUserInfo();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    logout() {
      const contactStore = useContactStore();
      // 清除用户信息和token, 并重新返回登录页面
      this.setToken('');
      this.userInfo = null;
      // 移除联系人列表数据
      contactStore.removeAllContacts();

      router.push('/login');
    },

    async afterLoginAction() {
      try {
        await router.replace(
          (router.currentRoute.value.query.redirect as string) || PageEnum.BASE_HOME,
        );
      } catch (error) {
        return Promise.reject(error);
      }
    },

    setToken(token: string) {
      this.token = token || '';
      setCacheToken(token);
    },

    async refreshUserInfo(): Promise<Nullable<UserInfo>> {
      try {
        const userInfo = (await getUserInfo()) as unknown as UserInfo;

        this.userInfo = userInfo;
        return userInfo;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
});
