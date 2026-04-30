/*
 * @Author: zq
 * @Date: 2022-10-26 10:53:43
 * @Last Modified by: sdpzhong
 * @Last Modified time: 2026-04-29 16:54:06
 * @ vite 插件主体配置文件
 */

import type { PluginOption } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

import { configHtmlPlugin } from './html';
import { autoImportPlugins } from './autoImport';
import { cdnImportPlugin } from './cdnImport';
import { visualizerPlugin } from './visualizer';

import { isReportMode } from '../../utils';

export function createVitePlugins(viteEnv: ImportMetaEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    Vue(),
    // 新增 JSX 语法支持
    VueJsx(),
    // 支持在scipt标签中使用name属性设置组件名
    VueSetupExtend(),
    // 自动导入插件
    ...autoImportPlugins(),
  ];

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  if (isReportMode()) {
    // 打包分析视图插件
    vitePlugins.push(visualizerPlugin());
  }

  // cdn 自动导入 (置于最后)
  vitePlugins.push(cdnImportPlugin(isBuild));

  return vitePlugins;
}
