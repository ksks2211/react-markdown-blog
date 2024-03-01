export type LoginForm = {
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
  profileImageId: string;
}

export interface LoginSuccessResponse {
  message: string;
  token: string;
  username: string;
  displayName: string;
  profileImageId?: number;
}

export interface UserProfileUpdate {
  profileImageId: number;
}
