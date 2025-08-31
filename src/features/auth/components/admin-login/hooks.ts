import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLoginMutation } from "../../hooks/use-login";
import { loginSchema, TLoginFormData } from "../../schemas";
import { useGoogleLoginMutation } from "../../hooks/use-google-login";

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

  const onSubmit = useCallback(
    async (data: TLoginFormData) => {
      clearErrors();
      return loginMutation.mutateAsync(data);
    },
    [loginMutation, clearErrors]
  );

  const handleGoogleLogin = useCallback(async () => {
    clearErrors();
    return googleLoginMutation.mutateAsync();
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
