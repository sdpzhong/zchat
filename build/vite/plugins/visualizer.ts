/*
 * @Author: zq
 * @Date: 2023-01-11 15:16:16
 * @Last Modified by: zq
 * @Last Modified time: 2023-01-11 16:36:50
 */
import 'rollup';
import { visualizer } from 'rollup-plugin-visualizer';
// 显示打包的视图分析
export function visualizerPlugin() {
  return visualizer({
    gzipSize: true,
    brotliSize: true,
    emitFile: false,
    filename: './node_modules/.cache/visualizer/stats.html',
    open: true, //如果存在本地服务端口，将在打包后自动展示
  }) as any;
}
