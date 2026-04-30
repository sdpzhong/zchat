declare interface UserLoginForm {
  username: string;
  password: string;
}

declare interface UserLoginResponse {
  token: string;
}

declare interface UserRegisterForm {
  accountName: string;
  password: string;
  repassword: string;
  email: string;
  gender: number;
  birthday: string;
  emailCode: string;
}

declare interface UserInfoResponse {
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

//  declare interface GetUserInfoForm {
//   username?: string;
//   uid?: string;
//   usreId?: number;
// }

declare interface UserSimpleInfo {
  avatar: string;
  uid: string;
  nickName: string;
  gender: number;
  accountName: string;
}
