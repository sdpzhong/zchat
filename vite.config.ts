/*
 * @Author: zq
 * @Date: 2022-10-29 17:00:54
 * @Last Modified by: zq
 * @Last Modified time: 2023-01-15 17:38:46
 * @desc: vite 项目配置文件
 */

import { fileURLToPath, URL } from 'node:url';
import { loadEnv, type ConfigEnv, type UserConfig } from 'vite';

import { createVitePlugins } from './build/vite/plugins';
import { wrapperEnv } from './build/utils';
import dayjs from 'dayjs';
import pkg from './package.json';

// import { resolve } from "path";
// function pathResolve(dir: string) {
//   return resolve(process.cwd(), ".", dir);
// }

// 获取项目信息
const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const isBuild = command === 'build';

  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    root,
    server: {
      https: false,
      host: true,
      port: VITE_PORT,
      // proxy: [],
    },
    plugins: [
      // 挂载项目打包插件
      ...createVitePlugins(viteEnv, isBuild),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url)),
      },
    },
    define: {
      'process.env': env,
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
      __APP_ENV__: env.APP_ENV,
    },
    build: {
      minify: 'esbuild',
    },
    esbuild: {
      // 打包时移除日志和调试断点
      drop: isBuild ? ['console', 'debugger'] : [],
    },
  };
};
