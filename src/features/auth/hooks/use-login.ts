import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { authService } from "../services";

import type { ILoginCredentials, ILoginResponse } from "../services";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (credentials: ILoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data: ILoginResponse) => {
      // Store token in localStorage or cookie
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", data.token);
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }
      }

      toast.success("Login successful!");

      // Redirect to admin dashboard
      window.location.href = "/";
    },
    onError: (error: unknown) => {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      console.error("Login error:", axiosError);

      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        "Login failed. Please try again.";

      toast.error(errorMessage);
    },
  });
};
