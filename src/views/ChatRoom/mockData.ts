/*
 * @Author: zq
 * @Date: 2022-11-02 15:46:28
 * @Last Modified by: zq
 * @Last Modified time: 2023-01-31 15:38:30
 */
import { getCalendarDate } from '@/utils/calendarDate';
import { toFormatUrls } from '@/utils/url';
import dayjs from 'dayjs';

export interface ChatRecordItem {
  nickname: string;
  avatar: string;
  created_date: string;
  isEndTime: boolean;
  isSelf: boolean;
  content: string;
  uid?: string;
  [x: string]: any;
}

const chatContent = [
  '你吃饭了吗 ?',
  '你睡觉了吗 ?',
  '你几点中下班 ?',
  '会议文档发我一下',
  '在? 晚上几点钟开黑',
  '哈哈, 阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴',
  '项目git仓库地址: https://gitee.com/kula0410/api_server, 别忘了哈!',
  '我今天吃的猪脚饭',
  '我吃的沙县',
  '还早, 再玩一把就睡了',
  '你一定行的，除非不行',
  '听君一席话如听一席话',
  '过了秋天冬天就要来了',
  '你除了缺点还是有优点的',
  '吃面不吃蒜，等于没吃蒜',
  '回想起昨天，仿佛在昨天',
  '我不菜的话还是挺厉害的',
  '能力越大，那能力就越大',
  '过完了十月就到十一月了',
  '这个西红柿长的有点像番茄',
  '这是我爸爸，我是他儿子',
  '每呼吸一分钟就过去了60秒',
  '没过去60秒就失去了一分钟',
  '当我发现时，我已经发现了',
  '我上次看到你手机还是上一次',
  '我前脚刚走，后脚就跟上了',
  '我就是有点胖，不然挺瘦的',
  '我长话短说，但是说来话长',
  '据我所知，我对这一无所知',
  '在单身这件事上从末有过男朋友',
  '如果不成功的话应该是失败了',
  '如果你不点它，你就点不了了',
  '手机没电的时候是不能打电话的',
  '小伙子挺帅，一个鼻子两个眼睛的',
  '晨跑十千米，就等于跑了十公里',
  '上次看到这句话的时候还是在上次',
  '你会发现废话文学里说的全是废话',
  '如果你这句话没错的话应该是对的',
  '每年过生日我的年龄都增加了一岁',
  '你要是说的不错的话，那应该是对的',
  '如果不出意外的话，应该是出意外了',
  '震惊，十四岁少女十年前居然才四岁',
  '如果我没猜错的话，那我一定是猜对了',
  '当你听完这件事儿，你就听完这件事了',
  '当你看完这句话的时候，这句话就结束了',
  '明天的天气看明天的天气预报就知道了',
  '一个冷知识24小时过去之后一天就过去了',
  '你但凡有点本事，也不至于一点本事都没有',
  '你如果要是长得白点儿的话，那就不黑了',
  '你要每次都起那么晚，那你起的是挺晚的',
  '当你点完赞之后你就会发现我的赞多了一个',
  '石头是非常硬的，到底多硬呢？坚如磐石',
  '每次我不知道说什么的时候我就不知道说什么',
  '你长得真好看，特别是眼睛，一共两个不多不少',
  '我之前还没发现，当我发现的时候我已经发现了',
  '为什么要讨厌我们这些懒人我们明明什么都没有做',
  '众所周知，蝉的翅膀非常薄，到底有多薄呢薄如蝉翼',
  '我家丢了两头牛，一头是白色的，另一头呢，也是白色的',
  '今天教大家一个非常实用的生活技巧:先迈左脚再迈右脚，就可以走路了',
];

export function getChatMockData(): ChatRecordItem[] {
  return Array(40)
    .fill(1)
    .map((_v, i) => ({
      nickname: 'username',
      avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/doge.png',
      created_date: getCalendarDate(dayjs(+new Date() + i * 20000).format('YYYY-MM-DD HH:mm:ss')),
      isEndTime: i % 5 === 0,
      isSelf: i % 4 === 0,
      content: toFormatUrls(
        chatContent[Math.floor(Math.random() * chatContent.length)],
        undefined,
        'word-break: break-all;',
      ),
    }));
}

// nickname: '一隅北';
// avatar: 'https://portrait.gitee.com/uploads/avatars/user/2794/8383972_kula0410_1644496006.png!avatar200';
// created_date: '2022='
