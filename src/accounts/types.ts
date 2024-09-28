export type Account = {
  id: number;
  email: string;
  provider: "GOOGLE" | "CREDENTIALS";
  refreshToken: string;
  expiredAt: Date;
  password?: string;
  data: any;
}