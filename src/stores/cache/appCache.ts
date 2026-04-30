/*
 * @Author: zq
 * @Date: 2022-10-25 15:41:47
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-09 11:39:22
 */
import { CACHE_KEYS } from '@/constants/enums/cacheKeysEnum';
import { createLocalStorage } from '@/utils/cache';
import type { AppState } from '@/stores/modules/app';

const appCacheStorage = createLocalStorage({});

export const getAppSettingCache = (): Nullable<AppState> =>
  appCacheStorage.get(CACHE_KEYS.APP_SETTING) || null;

export const setAppSettingCache = (appSetting: AppState) =>
  appCacheStorage.set(CACHE_KEYS.APP_SETTING, appSetting);

export const removeAppSettingCache = () => appCacheStorage.remove(CACHE_KEYS.APP_SETTING);
