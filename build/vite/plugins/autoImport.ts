/*
 * @Author: zq
 * @Date: 2022-10-29 17:27:25
 * @Last Modified by: zq
 * @Last Modified time: 2023-01-10 17:15:50
 * @desc: 图标,vant组件等自动导入插件
 */
import IconsResolver from 'unplugin-icons/resolver';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';

import Components from 'unplugin-vue-components/vite';
export function autoImportPlugins() {
  return [
    Icons({ autoInstall: true }),
    Components({
      resolvers: [VantResolver(), IconsResolver()],
    }),
  ];
}
