import { Layout } from '@/router/constant';
import type { AppRouteModule } from '@/router/types';

const home: AppRouteModule = {
  name: 'HomeModule',
  path: '/home',
  redirect: '/home',
  component: Layout,
  meta: {
    title: 'Home',
  },
  children: [
    {
      path: '',
      name: 'HomePage',
      component: () => import('@/views/system/Home/index.vue'),
      meta: {
        title: 'Home',
        isKeepAlive: true,
      },
    },
    {
      path: 'private',
      name: 'PrivateChat',
      component: () => import('@/views/ChatRoom/PrivateChat.vue'),
      meta: {
        title: 'PrivateChat',
        isKeepAlive: false,
      },
    },
    {
      path: 'group',
      name: 'GroupChat',
      component: () => import('@/views/ChatRoom/GroupChat.vue'),
      meta: {
        title: 'GroupChat',
        isKeepAlive: false,
      },
    },
  ],
};

export default home;
