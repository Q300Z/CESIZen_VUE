import { en } from "vuetify/locale"

export enum Role {
  ANONYMOUS = 'anonymous',
  ADMIN = 'admin',
  USER = 'user',
}

export interface User {
  id: number
  name: string
  email: string
  role: Role
  created_at: string
  updated_at: string
  token?: string
}

export interface UserResponse {
  data: Partial<User>[];
}
