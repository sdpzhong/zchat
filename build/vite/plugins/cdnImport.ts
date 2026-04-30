/*
 * @Author: zq
 * @Date: 2023-01-10 17:00:14
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-06 09:19:21
 */
import { cdn } from 'vite-plugin-cdn2';

const CDN_BASE_URL = 'https://cdn.jsdelivr.net/npm/';

export function createCdnUrl(cdnPath: string): string {
  return `${CDN_BASE_URL}${cdnPath}`;
}

export function cdnImportPlugin(isBuild: boolean) {
  return cdn({
    isProduction: isBuild,
    modules: [
      {
        name: 'vue',
        global: 'Vue',
        spare: [createCdnUrl('vue@3.2.38/dist/vue.global.prod.js')],
      },
      {
        name: 'vue-demi',
        global: 'VueDemi',
        spare: [createCdnUrl('vue-demi@0.13.11/lib/index.iife.min.js')],
      },
      {
        name: 'pinia',
        global: 'Pinia',
        spare: [createCdnUrl('pinia@2.0.21/dist/pinia.iife.min.js')],
      },
      {
        name: 'vue-router',
        global: 'VueRouter',
        spare: [createCdnUrl('vue-router@4.1.5/dist/vue-router.global.min.js')],
      },
      {
        name: 'dayjs',
        global: 'dayjs',
        spare: [createCdnUrl('dayjs@1.11.6/dayjs.min.js')],
      },
      {
        name: 'crypto-js',
        global: 'crypto-js',
        spare: [createCdnUrl('crypto-js@4.1.1/index.min.js')],
      },
      // {
      //   name: 'vant',
      //   global: 'vant',
      //   spare: [
      //     createCdnUrl('vant@4.0.8/lib/vant.min.js'),
      //     createCdnUrl('vant@4.0.8/lib/index.css'),
      //   ],
      // },
      {
        name: 'axios',
        global: 'axios',
        spare: [createCdnUrl('axios@1.1.3/dist/axios.min.js')],
      },
    ],
    logInfo: 'info',
    preset: false, // 不使用默认cdn优化
  });
}
