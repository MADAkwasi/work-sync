export interface AuthResponse {
  token: string;
  apiKey: string;
}

export interface AuthRequest {
  username: string;
  password: string;
}
