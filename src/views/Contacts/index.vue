<template>
  <div class="contacts-page" id="__sroll-box" ref="contactsPageRef">
    <contacts-page-header />
    <van-search
      input-align="center"
      placeholder="搜索"
      readonly
      shape="round"
      @click-input="$router.push('/user-search')"
    />
    <van-pull-refresh v-model="loading" @refresh="onRefresh" style="flex: 1">
      <van-tabs v-model:active="active" :color="PRIMARY_COLOR">
        <van-tab title="好友" name="contact-list">
          <contact-list ref="contactListRef" />
        </van-tab>
        <van-tab title="分组" name="groupings">
          <contact-group ref="contactGroupRef" />
        </van-tab>
        <van-tab title="群聊" name="group-chat">
          <chat-group ref="chatGroupRef" />
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
    <v-back-top target="#__sroll-box" />
  </div>
</template>

<script lang="ts" setup name="ContactsPage">
  import { onActivated, ref } from 'vue';
  import { PRIMARY_COLOR } from '@/constants/modules/theme';
  import { useEventListener } from '@vant/use';
  import ContactsPageHeader from './components/ContactsPageHeader.vue';
  import ContactList from './components/ContactList.vue';
  import ContactGroup from './components/ContactGroup.vue';
  import ChatGroup from './components/ChatGroup.vue';
  import { showToast } from 'vant';

  const contactListRef = ref<InstanceType<typeof ContactList>>();
  const contactGroupRef = ref<InstanceType<typeof ContactGroup>>();
  const chatGroupRef = ref<InstanceType<typeof ChatGroup>>();

  const active = ref('contact-list');
  const contactsPageRef = ref<HTMLDivElement | null>(null);
  const scrollTopRef = ref<number>(0);

  const loading = ref(false);

  const onRefresh = async () => {
    try {
      await refreshTabRecord();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        showToast('刷新成功');
        loading.value = false;
      }, 500);
    }
  };

  async function refreshTabRecord() {
    switch (active.value) {
      case 'contact-list':
        await contactListRef.value?.refreshRecord();
        break;

      case 'groupings':
        await contactGroupRef.value?.refreshRecord();
        break;

      case 'group-chat':
        break;

      default:
        break;
    }
  }

  // 容器滚动事件监听, 返回后回到原位
  useEventListener(
    'scroll',
    (e: any) => {
      scrollTopRef.value = e.target?.scrollTop;
    },
    {
      target: contactsPageRef as any,
    },
  );

  onActivated(() => {
    contactsPageRef.value!.scrollTop = scrollTopRef.value;
    refreshTabRecord();
  });
</script>

<style lang="less" scoped>
  .contacts-page {
    position: absolute;
    top: 0;
    bottom: 1.3333rem;
    left: 0;
    right: 0;
    overflow: auto;
    background-color: #f8f8f8;

    display: flex;
    flex-direction: column;
  }
</style>
