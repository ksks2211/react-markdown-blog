export type LogInForm = {
  username: string;
  password: string;
};
export type RegisterUserForm = {
  username: string;
  password: string;
  email?: string;
};

export interface JWT {
  sub: string;
  exp: number;
  iss: string;
  iat: number;
  auths: string[];
  id: number;
  displayName: string;
}

export interface JWTInfo {
  statusCode: number;
  message: string;
  token: string;
  username: string;
  displayName: string;
}
