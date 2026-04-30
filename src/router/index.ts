import type { App } from 'vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { setupRouterGuard } from './guard';
import { basicRoutes } from './routes';
import { useRouteCacheStore } from '@/stores/modules/routeCache';

export * from './routes';
export * from './constant';
export * from './types';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  // 切换页面后重置页面滚动条
  // scrollBehavior: () => ({ left: 0, top: 0 }),
  scrollBehavior(to, _from, savedPosition) {
    // isKeepAlive 返回缓存页面后记录浏览位置
    if (savedPosition && to.meta?.isKeepAlive) {
      return savedPosition;
    }
    // 异步滚动操作
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 });
      }, 0);
    });
  },
});

export function setupRouter(app: App) {
  app.use(router);
  // 挂载路由守卫
  setupRouterGuard(router);

  const routeCacheStore = useRouteCacheStore();
  // 初始化路由缓存白名单
  routeCacheStore.initCacheList(router);
}
