import { useMutation } from "@tanstack/react-query";
import { UserService } from "../services/user.service";
import { SignupValues, ApiResponse, User, LoginValues } from "../types/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/**
 * Custom hook to handle user registration using React Query.
 */
export const useRegisterUser = () => {
  const router = useRouter();
  return useMutation<ApiResponse<User>, Error, SignupValues>({
    mutationFn: (values: SignupValues) => UserService.register(values),
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/auth/login");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

/**
 * Custom hook to handle user login using React Query.
 */

export const useLoginUser = () => {
  const router = useRouter();
  return useMutation<ApiResponse<User>, Error, LoginValues>({
    mutationFn: (values: LoginValues) => UserService.login(values),
    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data);
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
