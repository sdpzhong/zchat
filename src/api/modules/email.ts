/*
 * @Author: zq
 * @Date: 2023-01-12 16:15:33
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-06 09:24:32
 */

import type { ErrorMessageMode } from '#/axios';
import { http } from '../config';

enum Api {
  SEND_CODE = '/email/sendCode',
  VERIFY_CODE = '/email/verifyCode',
}

/**
 * @description: send email code
 */
export function sendEmailCode(data: SendCodeForm, mode: ErrorMessageMode = 'notify') {
  return http.post<any>(
    {
      url: Api.SEND_CODE,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description:  verify email code
 */
export function verifyEmailCode(data: VerifyCodeForm, mode: ErrorMessageMode = 'notify') {
  return http.post<any>(
    {
      url: Api.SEND_CODE,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}
