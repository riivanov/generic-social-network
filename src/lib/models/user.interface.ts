
export interface IUser {
  id?: string;
  email: string;
  password: string;
  username?: string;
}

export interface AuthenticatedUser extends IUser {
  access_token: string
}