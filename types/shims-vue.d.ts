declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}

declare module 'vue-vconsole-devtools' {
  import VConsole from 'vconsole';
  export type initPluginFunc = (vc: VConsole) => void;
  export const initPlugin: initPluginFunc;
}
