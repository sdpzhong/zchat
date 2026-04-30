/*
 * @Author: zq
 * @Date: 2022-11-03 10:01:26
 * @Last Modified by: zq
 * @Last Modified time: 2022-11-03 10:30:45
 * @desc: 处理和url相关的函数
 */
/**
 * 获取字符串链接数组
 * @param urlStr 需要格式化的字符串
 * @returns {String[]}
 */
export function getUrls(urlStr: string): string[] {
  const reg = /((http|https|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/g;
  const strValue = urlStr.match(reg);
  if (strValue && strValue.length > 0) {
    return strValue;
  }
  return [];
}

/**
 * 将字符串中的链接转换为可点击的a标签
 * @param originStr
 * @param className a 标签类名
 * @param style 自定义样式
 * @returns {String}
 */
export function toFormatUrls(originStr: string = '', className = '', style = ''): string {
  const regexp = /((http|https|ftp|file):\/\/)((\w|=|\?|\.|\/|\&|-)+)/g;
  return originStr.replace(
    regexp,
    ($url) =>
      `<a href="${$url}" target="_blank" class="${className}" style="${style}" >${$url}</a>`,
  );
}

/**
 * @param originStr
 * @param className
 * @param style
 * @returns {String}
 */
export function translateUrlHtml(originStr: string = '', className = '', style = ''): string {
  const reg = /((http|https|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/g;
  return originStr.replace(
    reg,
    `<a href='$1' target='_blank' class=${className} style='${style}'>$1</a>`,
  );
}
