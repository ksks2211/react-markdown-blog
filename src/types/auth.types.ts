export type LogInForm = {
  username: string;
  password: string;
};
export type RegisterUserForm = {
  username: string;
  password: string;
  email: string;
};
export interface AuthErrorResponse {
  statusCode: number;
  message: string;
}
export interface JWT {
  sub: string;
  exp: number;
  iss: string;
  auths: string[];
  id: number;
}
