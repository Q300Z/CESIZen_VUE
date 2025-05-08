import type {User} from "@/types/User.ts";

export interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: User;
}
