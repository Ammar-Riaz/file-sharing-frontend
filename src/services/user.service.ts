import api from "../utils/api";
import { ApiResponse, LoginValues, SignupValues, User } from "../types/user";

/**
 * Service to handle user-related API calls.
 */
export const UserService = {
  /**
   * Registers a new user.
   * Since we are uploading files (avatar/cover image), we use FormData.
   */
  register: async (values: SignupValues): Promise<ApiResponse<User>> => {
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);

    if (values.avatar) {
      formData.append("avatar", values.avatar);
    }

    if (values.coverImage) {
      formData.append("coverImage", values.coverImage);
    }

    return api.post("/users/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  login: async (values: LoginValues): Promise<ApiResponse<User>> => {
    return api.post("/users/login", values);
  },
};
