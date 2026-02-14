export interface User {
  id: string;
  username: string;
  email: string;
  agentCount: number;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface OAuthInitiateResponse {
  authUrl: string;
}

export interface AppError {
  code: string;
  message: string;
  status: number;
}
