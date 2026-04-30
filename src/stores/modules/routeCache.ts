/*
 * @Author: zq
 * @Date: 2022-11-01 09:38:54
 * @Last Modified by: zq
 * @Last Modified time: 2022-11-01 10:56:42
 * @desc: route cache store.
 * 如何开启单个路由的缓存?
 * 1. 设置路由meta数值中的 isKeepAlive 为 true
 * 2. 需要缓存组件的组件名和路由的name属性一样
 * 3. 组件的组件名会根据组件文件名动态生成, 也可借助 name 属性覆盖
 * ( 支持 <script name="MyComp"> 方式注册)
 * 4. 动态（权限）路由添加完毕之后请重新执行 initCacheList 方法更新缓存列表
 */

import { defineStore } from 'pinia';
import type { Router } from 'vue-router';
import { useRouter } from 'vue-router';

export interface routeCacheState {
  cacheList: Set<string>;
}

export const useRouteCacheStore = defineStore({
  id: 'app-route-cache',
  state: (): routeCacheState => ({
    cacheList: new Set(),
  }),
  getters: {
    getCacheList(): string[] {
      return Array.from(this.cacheList);
    },
  },
  actions: {
    // 获取所有需要被缓存的路由，并添加至白名单中（动态路由添加完毕之后请重新执行该方法）
    initCacheList(router: Router) {
      const routeList = router.getRoutes();
      const keepAliveRoutes = new Set(
        routeList.filter((v) => v.meta?.isKeepAlive).map((v) => v.name),
      ) as Set<string>;
      this.cacheList = new Set([...this.cacheList, ...keepAliveRoutes]);
    },
    // 清除路由缓存列表
    clearAllRouteCache() {
      this.cacheList.clear();
    },
    // 添加新的缓存路由
    addRouteCache(routeName: string) {
      this.cacheList.add(routeName);
    },
    // 移除某个路由缓存
    removeRouteCache(routeName: string) {
      this.cacheList.delete(routeName);
    },
    // 重置路由缓存列表
    resetCacheList() {
      this.clearAllRouteCache();
      this.initCacheList(useRouter());
    },
    // 判断某个路由是否存在缓存中
    hasRouteInCache(routeName: string): boolean {
      return this.cacheList.has(routeName);
    },
  },
});
