/*
 * @Author: zq
 * @Date: 2022-12-01 17:23:24
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-13 18:21:09
 * 长按事件指令
 */

import type { App, Directive, DirectiveBinding } from 'vue';
import { isFunction } from '@/utils/is';

export interface LongPressDirectiveBinding extends DirectiveBinding {
  value: {
    longPressCb: Function;
    timeout?: number;
  };
}

const LongPressDirective: Directive = {
  mounted(el: Element, binding: LongPressDirectiveBinding) {
    // console.log(el, binding.value);
    const value = binding.value;
    if (!isFunction(value.longPressCb)) {
      return;
    }

    let timer;

    async function onTouchstart(longPress: Function) {
      document.addEventListener('contextmenu', onContextmenu);
      timer = setTimeout(() => {
        timer = 0;
        longPress();

        setTimeout(() => {
          // 触发完毕,移除右键菜单禁用事件
          document.removeEventListener('contextmenu', onContextmenu);
        }, 500);
      }, value?.timeout || 1000);
      return false;
    }

    function onTouchend() {
      clearTimeout(timer); //清除定时器
      return false;
    }

    function onTouchmove() {
      clearTimeout(timer); //清除定时器
      timer = 0;
    }

    function onContextmenu(e: Event) {
      e.preventDefault();
    }

    el.addEventListener('touchstart', () => onTouchstart(value.longPressCb));
    el.addEventListener('touchend', onTouchend);
    el.addEventListener('touchmove', onTouchmove);
  },
};

export default LongPressDirective;

export function setupLongPressDirective(app: App) {
  app.directive('long-press', LongPressDirective);
}
