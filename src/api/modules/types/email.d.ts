declare interface SendCodeForm {
  email: string;
  subject?: string;
  sign?: string;
}

declare interface VerifyCodeForm {
  email: string;
  emailCode: string;
}
