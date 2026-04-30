declare interface UserInfo {
  userId: number;
  uid: string;
  accountName: string;
  nickName: string;
  realName: string;
  email: string;
  mobile: string;
  role: number;
  status: number;
  bio: string;
  gender: number;
  birthday: string;
  city: string;
  province: string;
  address: string;
  sign: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

declare type UserStatusInfo = {
  nickname: string;
  status: number;
  avatar?: string;
  [x: string]: any;
};
