import type { App } from 'vue';

// Toast
import 'vant/es/toast/style';

// Dialog
import 'vant/es/dialog/style';

// Notify
import 'vant/es/notify/style';

// ImagePreview
import 'vant/es/image-preview/style';

// self grobal components
import BackTop from '@/components/BackTop/VBackTop.vue';
import Icon from '@/components/Icon/VIcon.vue';

// Lazyload
import { Lazyload } from 'vant';

const components = [];

export function registerGlobComp(app: App) {
  components.forEach((v) => app.use(v));

  app.component('VBackTop', BackTop);
  app.component('VIcon', Icon);

  app.use(Lazyload);
}
