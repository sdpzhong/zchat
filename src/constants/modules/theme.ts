/*
 * @Author: zq
 * @Date: 2022-10-24 11:36:27
 * @Last Modified by: zq
 * @Last Modified time: 2023-01-15 14:34:25
 * vant 全局样式配置文件 (后续新增主题设置,将维护到 pinia中)
 */
import type { ConfigProviderThemeVars } from 'vant';

export const PRIMARY_COLOR = '#7978FF';

export const THEME_VARS: ConfigProviderThemeVars = {
  rateIconFullColor: PRIMARY_COLOR,
  sliderBarHeight: '4px',
  sliderButtonWidth: '20px',
  sliderButtonHeight: '20px',
  sliderActiveBackground: PRIMARY_COLOR,
  buttonPrimaryBorderColor: PRIMARY_COLOR,
  buttonPrimaryBackground: PRIMARY_COLOR,
  navBarBackground: PRIMARY_COLOR,
  navBarTitleTextColor: '#fff',
  tabbarItemActiveColor: PRIMARY_COLOR,
  checkboxCheckedIconColor: PRIMARY_COLOR,
  radioCheckedIconColor: PRIMARY_COLOR,
};
