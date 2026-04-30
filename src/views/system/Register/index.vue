<template>
  <div class="register-page">
    <div class="top-bar">
      <div class="login-btn" @click="$router.push('/login')">登录</div>
    </div>
    <div class="register-container">
      <div class="container-header">
        <div class="register-header">
          <div class="register-logo-title">
            <!-- <div class="app-logo"></div> -->
            <div class="app-title">ZChat Register.</div>
          </div>
          <!-- <div class="app-desc">This is xxxx.</div> -->
        </div>
      </div>
      <register-form />
    </div>
    <copyright :isFixed="false" />
  </div>
</template>

<script lang="ts" setup>
  import copyright from '@/layout/components/copyright/index.vue';
  import RegisterForm from './components/RegisterForm.vue';
</script>

<style lang="less" scoped>
  .register-page {
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
      .login-btn {
        cursor: pointer;
      }
    }
    .register-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      .register-header {
        text-align: center;
        padding: 1.2rem 0 1.2rem;
        .register-logo-title {
          display: flex;
          align-items: center;
          justify-content: center;
          .app-title {
            font-size: 1rem;
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
    }
  }
</style>
