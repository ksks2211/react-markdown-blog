export type LogInForm = {
  username: string;
  password: string;
};
export type RegisterUserForm = {
  username: string;
  password: string;
  email: string;
};

export interface JWT {
  sub: string;
  exp: number;
  iss: string;
  auths: string[];
  id: number;
}

// Server Response
export interface AuthErrorInfo {
  statusCode: number;
  message: string;
}

export interface JWTInfo {
  statusCode: number;
  message: string;
  token: string;
  username: string;
}
