export type UserRole = 'STUDENT' | 'MENTOR' | 'ADMIN' | 'CONTENT_AUTHOR';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId?: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: 'bearer';
  expiresIn: number;
}

export interface Session {
  user: User;
  tokens: AuthTokens;
}
