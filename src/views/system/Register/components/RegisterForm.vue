<template>
  <van-form @submit="onSubmit" ref="registerFormRef">
    <van-cell-group inset>
      <van-field
        v-model.trim="registerForm.accountName"
        name="username"
        label="用户名"
        autocomplete="off"
        placeholder="请输入用户名"
        :rules="[
          {
            required: true,
            message: '请输入用户名',
          },
          {
            pattern: /^[a-zA-Z0-9-_]{4,16}$/,
            message: '用户名格式为4到16位字母或数字组成',
          },
        ]"
        clearable
      />

      <van-field
        v-model.trim="registerForm.password"
        type="password"
        name="password"
        label="登录密码"
        autocomplete="off"
        :rules="[
          {
            required: true,
            message: '请输入登录密码',
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
            message: '密码最短八个字符，必须包含大小写字母、数字和特殊字符',
            trigger: 'onChange',
          },
        ]"
        placeholder="请输入登录密码"
        clearable
      />

      <van-field
        v-model.trim="registerForm.repassword"
        type="password"
        name="rePassword"
        autocomplete="off"
        label="确认密码"
        placeholder="请输入确认密码"
        :rules="[
          {
            validator: rePasswordValidator,
          },
        ]"
        clearable
      />

      <van-field
        v-model="registerForm.birthday"
        is-link
        readonly
        name="datePicker"
        label="出生年月"
        @click="showPicker = true"
      />

      <van-field name="gender" label="性别">
        <template #input>
          <van-radio-group v-model="registerForm.gender" direction="horizontal" size="small">
            <van-radio :name="1">先生</van-radio>
            <van-radio :name="2">女士</van-radio>
            <van-radio :name="-1">保密</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-model.trim="registerForm.email"
        name="email"
        label="邮箱"
        placeholder="请输入邮箱地址"
        :rules="[
          {
            required: true,
            message: '请输入邮箱地址',
          },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '请输入合法的邮箱地址',
          },
        ]"
        clearable
      />

      <van-field
        v-model="registerForm.emailCode"
        center
        clearable
        label="验证码"
        placeholder="请输入邮箱验证码"
      >
        <template #button>
          <van-button
            style="width: 50px"
            size="small"
            type="primary"
            autocomplete="off"
            round
            :disabled="isSendPending"
            @click="handleSendEmailCode"
          >
            <van-icon size="18" name="envelop-o" v-if="!isSendPending" />
            <van-count-down
              ref="countDown"
              :time="60 * 1000"
              format="ss"
              style="color: white"
              @finish="onCountDoenFinished"
              v-else
            >
              <template #default="{ seconds }">{{ seconds }}</template>
            </van-count-down>
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: var(--van-padding-md)">
      <van-button round block type="primary" native-type="submit" :loading="loading">
        提交
      </van-button>
    </div>
  </van-form>

  <van-popup v-model:show="showPicker" position="bottom" round>
    <van-date-picker
      title="出生年月"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="showPicker = false"
    />
  </van-popup>
</template>

<script lang="ts" setup>
  import { sendEmailCode } from '@/api/modules/email';
  import { userRegister } from '@/api/modules/user';
  import { useUserStore } from '@/stores/modules/user';
  import dayjs from 'dayjs';
  import type { FormInstance } from 'vant';
  import { showConfirmDialog, type CountDownInstance } from 'vant';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const router = useRouter();

  const loading = ref(false);
  const registerForm = reactive<UserRegisterForm>({
    accountName: '',
    password: '',
    repassword: '',
    email: '',
    gender: -1,
    birthday: '',
    emailCode: '',
  });
  const showPicker = ref(false);
  const minDate = new Date(1990, 0, 1);
  const maxDate = new Date();

  const isSendPending = ref(false);
  const countDown = ref<CountDownInstance | null>(null);
  const registerFormRef = ref<FormInstance>();

  const rePasswordValidator = (value) => {
    if (value !== registerForm.password) {
      return '确认密码和登录密码不一致!';
    } else {
      return true;
    }
  };

  const onConfirm = ({ selectedValues }) => {
    console.log(selectedValues);
    registerForm.birthday = dayjs(selectedValues).format('YYYY-MM-DD');
    showPicker.value = false;
  };

  const onSubmit = async (value) => {
    try {
      loading.value = true;
      await userRegister(registerForm);
      showConfirmDialog({
        title: '注册成功！',
        message: '新账户注册成功，是否立即登录？',
        beforeClose: (action) =>
          new Promise((resolve) => {
            if (action === 'confirm') {
              setTimeout(() => {
                userStore.login({
                  username: value.username,
                  password: value.password,
                });
                resolve(true);
              }, 1000);
            } else {
              router.push('/login');
              // 拦截取消操作
              resolve(true);
            }
          }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  const handleSendEmailCode = async () => {
    await registerFormRef.value?.validate('email');
    if (!isSendPending.value) {
      isSendPending.value = true;
      countDown.value?.start();
      try {
        await sendEmailCode({
          email: registerForm.email,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onCountDoenFinished = () => {
    isSendPending.value = false;
  };
</script>

<style lang="less" scoped>
  // :deep(.van-cell-group--inset) {
  //   border-radius: var(--van-border-radius-sm);
  // }
</style>
