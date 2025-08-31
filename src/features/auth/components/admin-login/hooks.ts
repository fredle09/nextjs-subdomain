import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, TLoginFormData } from "../../schemas";
import {
  useLoginMutation,
  useGoogleLoginMutation,
} from "../../hooks/use-auth-mutations";

export const useAdminLoginHook = () => {
  const loginMutation = useLoginMutation();
  const googleLoginMutation = useGoogleLoginMutation();

  const form = useForm<TLoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const { control, formState, handleSubmit, setError, clearErrors } = form;
  const { errors, isSubmitting } = formState;

  const isLoading =
    isSubmitting || loginMutation.isPending || googleLoginMutation.isPending;

  const onSubmit = useCallback(async (data: TLoginFormData) => {
    try {
      clearErrors();
      await loginMutation.mutateAsync(data);
    } catch (error: unknown) {
      const axiosError = error as {
        response?: {
          data?: {
            errors?: Record<string, string>;
            message?: string;
          };
        };
      };
      // Handle specific validation errors from server
      if (axiosError?.response?.data?.errors) {
        const serverErrors = axiosError.response.data.errors;
        Object.keys(serverErrors).forEach((field) => {
          setError(field as keyof TLoginFormData, {
            message: serverErrors[field],
          });
        });
      } else {
        setError("root", {
          message:
            axiosError?.response?.data?.message ||
            "Login failed. Please try again.",
        });
      }
    }
  }, [loginMutation, clearErrors, setError]);

  const handleGoogleLogin = useCallback(async () => {
    try {
      clearErrors();
      await googleLoginMutation.mutateAsync();
    } catch (error) {
      console.error("Google login error:", error);
    }
  }, [googleLoginMutation, clearErrors]);

  return {
    form,
    errors,
    control,
    isLoading,
    googleLoginMutation,

    onSubmit,
    handleSubmit,
    handleGoogleLogin,
  };
};
