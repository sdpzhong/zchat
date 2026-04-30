import type { ErrorMessageMode } from '#/axios';
import { useUserStore } from '@/stores/modules/user';
import { showNotify, showDialog, showToast } from 'vant';

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'notify',
) {
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      showDialog({
        title: '登录过期',
        message: `抱歉，您的登录验证已过期，请重新登录。`,
        theme: 'round-button',
      }).then(() => {
        const usrStore = useUserStore();
        usrStore.logout();
      });
      break;
    case 403:
      errMessage = '403';
      break;
    // 404请求不存在
    case 404:
      errMessage = '404';
      break;
    case 405:
      errMessage = '405';
      break;
    case 408:
      errMessage = '408';
      break;
    case 500:
      errMessage = '500';
      break;
    case 501:
      errMessage = '501';
      break;
    case 502:
      errMessage = '502';
      break;
    case 503:
      errMessage = '503';
      break;
    case 504:
      errMessage = '504';
      break;
    case 505:
      errMessage = '505';
      break;
    default:
      errMessage = status + '';
  }

  if (errMessage) {
    if (errorMessageMode === 'dialog') {
      showDialog({ title: '错误提示', message: errMessage });
    } else if (errorMessageMode === 'notify') {
      showNotify({ type: 'danger', message: errorMessageMode });
    } else if (errorMessageMode === 'toast') {
      showToast({ message: errorMessageMode });
    }
  }
}
