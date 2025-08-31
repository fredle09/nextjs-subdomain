import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { signIn } from "@/lib/auth/client";

interface IUseGoogleLoginMutationProps {
  callbackURL?: string;
}

export const useGoogleLoginMutation = (
  props?: IUseGoogleLoginMutationProps
) => {
  const { callbackURL = "/admin" } = props ?? {};
  return useMutation({
    mutationFn: () => signIn.social({ provider: "google", callbackURL }),
    onError: (error: unknown) => {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      console.error("Google login error:", axiosError);

      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        "Google login failed. Please try again.";

      toast.error(errorMessage);
    },
  });
};
