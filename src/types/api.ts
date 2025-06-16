// Types for error handling
export interface ApiResult<T> {
  error?: string | string[];
  message: string;
  statusCode: string | number;
  data?: T;
}
