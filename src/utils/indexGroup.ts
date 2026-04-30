/*
 * @Author: sdpzhong
 * @Date: 2023-01-18 13:01:31
 * @Last Modified by: sdpzhong
 * @Last Modified time: 2023-01-18 15:01:07
 * @Desc: 将数据按首字母顺序排列分组
 */

import { pinyin } from 'pinyin-pro';

export interface LangGroupsRecord<T = any> {
  zh: T[];
  en: T[];
  other: T[];
}

export function langGroup<T, K extends keyof T>(origin: T[], groupBy?: K) {
  const groupData: LangGroupsRecord<T> = {
    zh: [],
    en: [],
    other: [],
  };
  origin.forEach((item) => {
    const firstChat = (groupBy ? item[groupBy][0] : item[0]) || '';
    if (/[\u4E00-\u9FA5]/g.test(firstChat)) {
      groupData.zh.push(item);
    } else if (/[A-Za-z]/.test(firstChat)) {
      groupData.en.push(item);
    } else {
      groupData.other.push(item);
    }
  });
  return groupData;
}

export interface indexGroupRecordItem<T = any> {
  letter: string;
  data: T[];
}

export function indexGroupFormat<T, K extends keyof T>(
  groupBy: K,
  zhRecord: T[] = [],
  enRecord: T[] = [],
  otherRecord: T[] = [],
) {
  if (!String.prototype.localeCompare) return null;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

  return letters.map((item) => {
    const cur: indexGroupRecordItem<T> = { letter: item, data: [] };
    if (item === '#') {
      cur.data = recordSortByCharCode(otherRecord, groupBy) as any;
      return cur;
    }
    const zhArr: T[] = [];
    const enArr: T[] = [];

    zhRecord.forEach((record) => {
      const groupByDataFirst = String(record[groupBy] || '')[0] as unknown as string;

      if (pinyin(groupByDataFirst, { pattern: 'first' }).toUpperCase() === item) {
        zhArr.push(record);
      }
    });

    enRecord.forEach((enChat) => {
      if (String(enChat[groupBy][0] || '')?.toUpperCase() === item) {
        enArr.push(enChat);
      }
    });

    cur.data = [...recordSortByCharCode(zhArr, groupBy), ...recordSortByCharCode(enArr, groupBy)];
    return cur;
  });
}

export function recordSortByCharCode<T, K extends keyof T>(
  origin: T[],
  sortBy: K,
  sortType: 'asc' | 'desc' = 'asc',
) {
  return origin.sort(
    (a, b) =>
      (String(a[sortBy] || '').charCodeAt(0) - String(b[sortBy] || '').charCodeAt(0)) *
      (sortType === 'asc' ? 1 : -1),
  );
}

/**
 * 根据某一属性进行分组排序
 * @param records 原始数组
 * @param groupBy 分组字段名称
 * @returns
 */
export function indexGroup<T, K extends keyof T>(records: T[], groupBy: K) {
  const { zh, en, other } = langGroup(records, groupBy);
  return indexGroupFormat(groupBy, zh, en, other);
}
