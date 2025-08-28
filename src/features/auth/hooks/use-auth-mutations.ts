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
      window.location.href = "/admin";
    },
    onError: (error: any) => {
      console.error("Login error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";

      toast.error(errorMessage);
    },
  });
};

export const useGoogleLoginMutation = () => {
  return useMutation({
    mutationFn: () => authService.googleLogin(),
    onSuccess: (data: ILoginResponse) => {
      // Store token in localStorage or cookie
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", data.token);
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }
      }

      toast.success("Google login successful!");

      // Redirect to admin dashboard
      window.location.href = "/admin/dashboard";
    },
    onError: (error: any) => {
      console.error("Google login error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Google login failed. Please try again.";

      toast.error(errorMessage);
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear stored tokens
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
      }

      toast.success("Logged out successfully!");

      // Redirect to login
      window.location.href = "/admin/login";
    },
    onError: (error: any) => {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    },
  });
};
