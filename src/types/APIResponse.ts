export interface APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: T;

}
