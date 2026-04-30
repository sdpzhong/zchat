<template>
  <div class="app-layout">
    <!-- layout hearder => top nav bar & search & other actions -->
    <layout-header :title="headerTitle" v-if="$route.meta?.showNavBar">
      <template #left>
        <van-icon
          v-if="!$route.meta.hiddenBackBtn"
          name="arrow-left"
          class="nav-bar-icon"
          @click="$router.back()"
        />
      </template>
    </layout-header>

    <!-- context body & router view -->
    <router-view />

    <!-- layout footer => bottom nav bar & copyright -->
    <layout-footer v-if="!$route.meta.hiddenTabbar" />

    <!-- setting page -->
    <user-setting ref="settingCompRef" />
  </div>
</template>

<script lang="ts" setup>
  import LayoutHeader from './components/header/index.vue';
  import LayoutFooter from './components/footer/index.vue';
  import RouterView from './page/index.vue';
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import UserSetting from '@/views/system/User/index.vue';

  const settingCompRef = ref<InstanceType<typeof UserSetting> | null>(null);

  const router = useRouter();
  const headerTitle = ref('');

  watch(
    () => router.currentRoute,
    (currentRoute) => {
      if (currentRoute.value.meta?.hiddenTitle) {
        headerTitle.value = '';
      } else {
        headerTitle.value = currentRoute.value.meta?.title;
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );
</script>

<style lang="less" scoped>
  .app-layout {
    height: 100%;
    // width: 100%;
    .nav-bar-icon {
      color: #fff;
      font-size: 0.5rem;
    }
  }
</style>
