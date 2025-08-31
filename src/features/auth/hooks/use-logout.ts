import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { authService } from "../services";

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
      window.location.href = "/login";
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
      console.error("Logout error:", axiosError);
      toast.error("Logout failed. Please try again.");
    },
  });
};
