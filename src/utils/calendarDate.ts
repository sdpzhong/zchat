/*
 * @Author: zq
 * @Date: 2022-10-31 15:36:51
 * @Last Modified by: zq
 * @Last Modified time: 2023-02-06 17:25:00
 * @desc: 生成动态的日历时间格式
 */

import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);
dayjs.locale('zh-cn');

export function getCalendarDate(dateValue?: string): string {
  return dayjs(dateValue).calendar(null, {
    sameDay: 'A h:mm', // The same day ( 下午 3：22 )
    nextDay: '[明天] h:mm', // The next day ( 明天 2：12 )
    nextWeek: 'dddd', // The next week ( 星期三 )
    lastDay: '[昨天] h:mm', // The day before ( 昨天 2：22 )
    lastWeek: '[上周] dddd', // Last week ( 上周 星期一 )
    sameElse: 'YYYY/MM/DD', // Everything else ( 2022/11/02 )
  });
}

export function getChatCalendarDate(dateValue?: string): string {
  return dayjs(dateValue).calendar(null, {
    sameDay: 'A h:mm',
    nextDay: '[明天] H:mm',
    nextWeek: 'dddd H:mm',
    lastDay: '[昨天] H:mm',
    lastWeek: 'YY/MM/DD H:mm',
    sameElse: 'YY/MM/DD H:mm',
  });
}
