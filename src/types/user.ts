export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatar?: string;
  coverImage?: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface SignupValues {
  fullName: string;
  username: string;
  email: string;
  password: string;
  avatar: File | null;
  coverImage?: File | null;
}
export interface LoginValues {
  email: string;
  password: string;
}
