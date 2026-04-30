<template>
  <div class="login-page">
    <div class="top-bar">
      <div class="register-btn" @click="$router.push('/register')">注册</div>
    </div>
    <div class="login-container">
      <div class="login-header">
        <div class="login-logo-title">
          <!-- <div class="app-logo"></div> -->
          <div class="app-title">ZChat.</div>
        </div>
        <div class="app-desc">This is xxxx.</div>
      </div>
      <van-form @submit="onSubmit" class="login-form">
        <van-cell-group inset style="padding: 0.1067rem 0">
          <van-field
            v-model.trim="loginForm.username"
            name="username"
            label="账号"
            placeholder="请输入用户名或邮箱"
            left-icon="user-o"
            autocomplete="account"
            label-width="1.2rem"
            clearable
          />

          <van-field
            v-model.trim="loginForm.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            left-icon="shield-o"
            autocomplete="current-password"
            label-width="1.2rem"
            clearable
          />
          <div class="login-opt">
            <van-checkbox v-model="isSavePw">
              <span>记住密码</span>
            </van-checkbox>
            <a :style="{ color: PRIMARY_COLOR }">忘记密码？</a>
          </div>
        </van-cell-group>
        <div style="margin: var(--van-padding-sm) var(--van-padding-md)">
          <van-button round block type="primary" native-type="submit" :loading="loading">
            登录
          </van-button>
        </div>
        <div style="margin: var(--van-padding-sm) var(--van-padding-md)">
          <van-button round block icon="envelop-o" type="warning"> 邮箱验证登录 </van-button>
        </div>
      </van-form>
    </div>
    <copyright :isFixed="false" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, onMounted, nextTick } from 'vue';
  import { showNotify } from 'vant';
  import { useUserStore } from '@/stores/modules/user';
  import copyright from '@/layout/components/copyright/index.vue';
  import { PRIMARY_COLOR } from '@/constants/modules/theme';
  import { CACHE_KEYS } from '@/constants/enums/cacheKeysEnum';
  import { createLocalStorage } from '@/utils/cache';

  const userStore = useUserStore();

  let loginForm = ref<UserLoginForm>({
    username: '',
    password: '',
  });
  const loading = ref(false);

  const isSavePw = ref(false);
  const pwCache = createLocalStorage();

  const onSubmit = (values: UserLoginForm) => {
    if (!values.username) {
      showNotify({ type: 'warning', message: '请输入您的账号或邮箱' });
      return;
    } else if (!values.password) {
      showNotify({ type: 'warning', message: '请输入您的密码' });
    } else {
      submitLoginForm(values);
    }
  };

  async function submitLoginForm(formValues: UserLoginForm) {
    try {
      loading.value = true;
      const userinfo = await userStore.login(formValues);
      console.log(userinfo);
      // save pw
      checkSavePw();
      showNotify({
        type: 'success',
        message: `欢迎回来，${userinfo?.nickName || userinfo?.accountName}`,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        loading.value = false;
      }, 500);
    }
  }

  function checkSavePw() {
    if (unref(isSavePw)) {
      pwCache.set(CACHE_KEYS.SAVE_PW, loginForm.value);
    } else {
      pwCache.remove(CACHE_KEYS.SAVE_PW);
    }
  }

  onMounted(async () => {
    const cacheRecord = pwCache.get(CACHE_KEYS.SAVE_PW);
    if (!cacheRecord) {
      return;
    }
    loginForm.value = cacheRecord;
    await nextTick();
    isSavePw.value = !!loginForm.value.password;
  });
</script>

<style lang="less" scoped>
  .login-page {
    // height: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;

    background-color: var(--theme-bg-color);
    .top-bar {
      height: 1.2rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 16px;
      color: #fff;
      font-size: 16px;

      .register-btn {
        cursor: pointer;
      }
    }
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      .login-header {
        text-align: center;
        padding: 1rem 0 1rem;
        .login-logo-title {
          display: flex;
          align-items: center;
          justify-content: center;
          .app-title {
            font-size: 1.4rem;
            font-size: 700;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans',
              Arial, sans-serif;
            font-style: italic;
            // color: #fff;
            background-image: -webkit-linear-gradient(top, #fff, #fff, #98a8f8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
          }
          .app-logo {
            height: 1.4rem;
            width: 1.4rem;
            background-color: #fff;
            margin-right: 0.5rem;
            border-radius: 10px;

            font-size: 1rem;
            font-size: 700;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans',
              Arial, sans-serif;
            color: #98a8f8;
            text-align: center;
            line-height: 1.4rem;
          }
        }
        .app-desc {
          font-style: italic;
          font-size: 14px;
          color: #eee;
        }
      }

      .login-form {
        width: 100%;
        max-width: 400px;
      }

      .login-opt {
        margin: 0.2667rem var(--van-padding-md);
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        font-size: 14px;
      }
    }
  }

  // :deep(.van-cell-group--inset) {
  // border-radius: var(--van-border-radius-sm);
  // }
</style>
