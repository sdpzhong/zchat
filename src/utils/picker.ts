/*
 * @Author: zq
 * @Date: 2023-02-13 17:08:07
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-14 09:31:13
 */

export function pickPropsFormObject<T, K extends keyof T>(origin: T, props: K[]) {
  return props.reduce((prev, curr) => {
    prev[curr] = origin[curr];
    return prev;
  }, {} as { [P in K]: T[P] });
}
