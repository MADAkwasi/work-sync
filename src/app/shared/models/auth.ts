export interface AuthResponse {
  token: string;
  apiKey: string;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export enum Roles {
  USER = 'User',
  ADMIN = 'Admin',
}

export interface UserRequest {
  username: string;
  role: Roles;
  password: string;
}
