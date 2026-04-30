/*
 * @Author: sdpzhong
 * @Date: 2026-04-30 15:37:17
 * @Last Modified by: sdpzhong
 * @Last Modified time: 2026-04-30 15:39:49
 * @Desc: 该类型声明文件是为了解决构建过程中（或使用type-check类型检查命令） vue-i18n $t 函数类型检查报错。
 */

import Vue from 'vue';
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $t(key: string, values?: Record<string, any> | string[]): string;
  }
}
